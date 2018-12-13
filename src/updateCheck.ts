'use strict';

import * as sqlops from 'sqlops';
import * as vscode from 'vscode';
import * as request from 'request-promise-native';
import * as apiConfig from  './apiconfig';
let apiconfig: apiConfig.apiconfig = require('../apiconfig.json');

export class updatecheck {
    public async checkForUpdates(context: sqlops.ObjectExplorerContext) {
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
                    vscode.window.showInformationMessage("New Version of First Responder Kit available.", {modal:false}, "Get It", "Tell Me More");
                
                    //tell me more : https://github.com/BrentOzarULTD/SQL-Server-First-Responder-Kit/releases/tag/<tag>
                
                    //get it : download all command
                    
                } else {
                    vscode.window.showInformationMessage("You're up to date!", {modal:false}, "Close")
                }
                
                //confirm if user wants to update scripts
            }
        } catch (e) {
            vscode.window.showErrorMessage(e);
        }
    }
}