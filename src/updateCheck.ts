'use strict';

import * as sqlops from 'azdata';
import * as vscode from 'vscode';
import * as request from 'request-promise-native';
import * as apiConfig from  './apiconfig';
let apiconfig: apiConfig.apiconfig = require('../apiconfig.json');

export class updatecheck {
    public async checkForUpdates(context?: sqlops.ObjectExplorerContext): Promise<string> {
        let baseUrl = "https://api.github.com/repos/BrentOzarULTD/SQL-Server-First-Responder-Kit/releases/latest";

        let apitoken = 'token ' + apiconfig.token;
        vscode.window.showInformationMessage("Checking First Responder Kit for Updates");
        
        try {
            var connectId;
            if (context) {
                let connection = context.connectionProfile;
                connectId = connection.id;
            } else {
                let connection = await sqlops.connection.getCurrentConnection();
                connectId = connection.connectionId;
            }

            let query = `declare @versionno datetime
                IF OBJECT_ID('dbo.sp_Blitz') IS NULL
                set @versionno = '1/1/1900'
                ELSE
                exec sp_blitz @help = 1, @versiondate = @versionno output
                select convert(varchar(10),@versionno,112) as versionno`;

            if (connectId) {
                let connectionUri = await sqlops.connection.getUriForConnection(connectId);
                let queryProvider = sqlops.dataprotocol.getProvider<sqlops.QueryProvider>(context.connectionProfile.providerName, sqlops.DataProviderType.QueryProvider);
                let results = await queryProvider.runQueryAndReturn(connectionUri, query);
                let cell = results.rows[0][0];
                let currentVersion = cell.displayValue;

                //get live most recent version from github
                var options = {
                    uri: baseUrl,
                    headers: {
                        'Authorization': apitoken,
                        'User-Agent': 'Request-Promise'
                    },
                    json: true,
                    simple: false
                };
                var scriptText = await request.get(options);
                let recentVersion = scriptText.tag_name;

                //compare against db version
                if (currentVersion == '19000101') {
                    let updateMsg = 'First Responder Kit not detected on this server. Current version of First Responder Kit is ' + recentVersion + '.'
                    var buttonName = await vscode.window.showInformationMessage(updateMsg, {modal:false}, "Get It Now", "Tell Me More");
                    if (buttonName){
                        if (buttonName == "Get It Now") {
                            return 'update';
                        } else if (buttonName == "Tell Me More") {
                            return recentVersion;
                        }
                    } else {
                        return '';
                    }
                }
                else if (recentVersion >  currentVersion) {
                    let updateMsg = 'New Version of First Responder Kit available (' + recentVersion + ').  You have version ' + currentVersion +'.'
                    var buttonName = await vscode.window.showInformationMessage(updateMsg, {modal:false}, "Get It Now", "Tell Me More");
                    if (buttonName){
                        if (buttonName == "Get It Now") {
                            return 'update';
                        } else if (buttonName == "Tell Me More") {
                            return recentVersion;
                        }
                    } else {
                        return '';
                    }
                } else {
                    vscode.window.showInformationMessage("You're up to date!", {modal:false}, "Close");
                    return '';
                }
                
            } else {
                vscode.window.showErrorMessage("Please connect to SQL server to check First Responder Kit version.");
                return '';
            }
        } catch (e) {
            vscode.window.showErrorMessage(e);
        }
    }
}