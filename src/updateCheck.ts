'use strict';

import * as sqlops from 'sqlops';
import * as vscode from 'vscode';
import * as request from 'request-promise-native';
import * as apiConfig from  './apiconfig';
import { STATUS_CODES } from 'http';
let apiconfig: apiConfig.apiconfig = require('../apiconfig.json');

export class updatecheck {
    public async checkForUpdates(context: sqlops.ObjectExplorerContext): Promise<string> {
        let baseUrl = "https://api.github.com/repos/BrentOzarULTD/SQL-Server-First-Responder-Kit/releases/latest";
        // /repos/:owner/:repo/releases/latest
        let apitoken = 'token ' + apiconfig.token;
        let queryProvider = sqlops.dataprotocol.getProvider<sqlops.QueryProvider>(context.connectionProfile.providerName, sqlops.DataProviderType.QueryProvider);
        vscode.window.showInformationMessage("Checking First Responder Kit for Updates");
        try {
            let connection = await sqlops.connection.getCurrentConnection();
            let query = `declare @versionno datetime
            exec sp_blitz @help = 1, @versiondate = @versionno output
            select convert(varchar(10),@versionno,112) as versionno`;
            let connectionUri = await sqlops.connection.getUriForConnection(connection.connectionId);
            if (connection) {
                let results = await queryProvider.runQueryAndReturn(connectionUri, query);
                //vscode.window.showInformationMessage(results.rowCount.toString());
                let cell = results.rows[0][0];
                let currentVersion = cell.displayValue;

                //get live most recent version
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
                //vscode.window.showInformationMessage("newest version: " + scriptText.tag_name);

                let recentVersion = scriptText.tag_name;
                //compare against db version
                if (recentVersion >  currentVersion) {
                    // var whatClicked =
                    var buttonName = await vscode.window.showInformationMessage("New Version of First Responder Kit available.", {modal:false}, "Get It", "Tell Me More");

                    // whatClicked.then(function(buttonName) {
                        vscode.window.showInformationMessage(buttonName);
                        if (buttonName){
                            if (buttonName == "Get It") {
                                return 'update';
                            } else if (buttonName == "Tell Me More") {
                                return recentVersion;
                            }
                        } else {
                            return '';
                        }
                    // });

                } else {
                    vscode.window.showInformationMessage("You're up to date!", {modal:false}, "Close");
                    return '';
                }
                
                //confirm if user wants to update scripts
            } else {
                vscode.window.showErrorMessage("Please connect to SQL server to check First Responder Kit version.");
                return '';
            }
        } catch (e) {
            vscode.window.showErrorMessage(e);
        }
    }
}