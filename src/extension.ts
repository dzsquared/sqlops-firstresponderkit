'use strict';
import * as vscode from 'vscode';
import * as request from 'request-promise-native';
import * as sqlops from 'sqlops';
import { error } from 'util';
import {placeScript} from './placescript';
import {BlitzIndex} from './blitzindex';

export function activate(context: vscode.ExtensionContext) {
    const baseUrl = "https://raw.githubusercontent.com/BrentOzarULTD/SQL-Server-First-Responder-Kit/master/";

    //importing the full spblitz script
    var getblitz = async () => {
        let fileName = "sp_Blitz.sql";
        var options = {
            uri: baseUrl + fileName,
        };
        console.log('Bringing in the first responder kit from the mothership.');
        const scriptText = await request.get(options);
        //await placeScript.placescript(fileName, scriptText);
        new placeScript().placescript(fileName,scriptText);
    };
    var disposable_spblitz = vscode.commands.registerCommand('extension.sp_blitz', getblitz);
    context.subscriptions.push(disposable_spblitz);

    //importing the full spblitzcache script
    var getblitzcache = async () => {
        let fileName = "sp_BlitzCache.sql";
        var options = {
            uri: baseUrl + fileName,
        };
        console.log('Bringing in the first responder kit from the mothership.');
        const scriptText = await request.get(options);
        //await placeScript.placescript(fileName, scriptText);
        new placeScript().placescript(fileName,scriptText);
    };
    var disposable_spblitzcache = vscode.commands.registerCommand('extension.sp_blitzcache', getblitzcache);
    context.subscriptions.push(disposable_spblitzcache);

    //importing the full spblitzfirst script
    var getblitzfirst = async () => {
        let fileName = "sp_BlitzFirst.sql";
        var options = {
            uri: baseUrl + fileName,
        };
        console.log('Bringing in the first responder kit from the mothership.');
        const scriptText = await request.get(options);
        //await placeScript.placescript(fileName, scriptText);
        new placeScript().placescript(fileName,scriptText);   
    };
    var disposable_spblitzfirst = vscode.commands.registerCommand('extension.sp_blitzfirst', getblitzfirst);
    context.subscriptions.push(disposable_spblitzfirst);

    //importing the spblitzwho script
    var getblitzwho = async () => {
        let fileName = "sp_BlitzWho.sql";
        var options = {
            uri: baseUrl + fileName,
        };
        console.log('Bringing in the first responder kit from the mothership.');
        const scriptText = await request.get(options);
        //await placeScript.placescript(fileName, scriptText);
        new placeScript().placescript(fileName,scriptText);
    };
    var disposable_spblitzwho = vscode.commands.registerCommand('extension.sp_blitzwho', getblitzwho);
    context.subscriptions.push(disposable_spblitzwho);

    //creating the quickrun script
    var runspblitz = async () => {
        console.log('Preparing sample run script.');
        let fileName = "exec_sp_blitz.sql";
        const scriptText = `EXEC [dbo].[sp_Blitz]
        @CheckUserDatabaseObjects = 1 ,
        @CheckProcedureCache = 0 ,
        @OutputType = 'TABLE' ,
        @OutputProcedureCache = 0 ,
        @CheckProcedureCacheFilter = NULL,
        @CheckServerInfo = 1
        -- uncomment the following line to write results to an output table
        --, @OutputDatabaseName = 'DBAtools', @OutputSchemaName = 'dbo', @OutputTableName = 'BlitzResults'`;
        var setting: vscode.Uri = vscode.Uri.parse("untitled:" + fileName);
        //await placeScript.placescript(fileName, scriptText);
        new placeScript().placescript(fileName,scriptText);
    };
    var disposable_runspblitz = vscode.commands.registerCommand('extension.run_sp_blitz', runspblitz);
    context.subscriptions.push(disposable_runspblitz);
    
    //importing the full spblitz script
    var getblitzindex = async () => {
        let fileName = "sp_BlitzIndex.sql";
        var options = {
            uri: baseUrl + fileName,
        };
        console.log('Bringing in the first responder kit from the mothership.');
        const scriptText = await request.get(options);
        //await placeScript.placescript(fileName, scriptText);
        new placeScript().placescript(fileName,scriptText);
    };
    var disposable_spblitzindex = vscode.commands.registerCommand('extension.sp_blitzindex', getblitzindex);
    context.subscriptions.push(disposable_spblitzindex);
    
    //creating the quickrun script
    var runspblitzindex = async (context?: sqlops.ObjectExplorerContext) => {
        console.log('Preparing sample run script.');
        let fileName = "exec_sp_blitzindex.sql";
        let scriptText = '';
        if (context) {
            let scriptType = context.nodeInfo.nodeType;
            fileName = context.nodeInfo.label + '-' + fileName;
            var nodeBreakdown = context.nodeInfo.nodePath.split("/");
            let dbName = nodeBreakdown[2];
            switch (scriptType) {
                case "Database": {
                    scriptText = `EXEC [dbo].[sp_BlitzIndex]
                        @DatabaseName = '${dbName}',
                        --@TableName = '',
                        @Mode = 4
                        --0=Diagnose, 1=Summarize, 2=Index Usage Detail, 3=Missing Index Detail, 4=Diagnose Details`;
                    break;
                }
                case "Table": {
                    var tblParts = context.nodeInfo.label.split(".");
                    let tblName = tblParts[1];
                    scriptText = `EXEC [dbo].[sp_BlitzIndex]
                        @DatabaseName = '${dbName}',
                        @TableName = '${tblName}'
                        `;
                    break;
                }
                default: {
                    scriptText = `EXEC [dbo].[sp_BlitzIndex]
                        @DatabaseName = '',
                        --@TableName = '',
                        @Mode = 4
                        --0=Diagnose, 1=Summarize, 2=Index Usage Detail, 3=Missing Index Detail, 4=Diagnose Details`;
                    break;
                }
            }
        } else {
            scriptText = `EXEC [dbo].[sp_BlitzIndex]
                @DatabaseName = '',
                --@TableName = '',
                @Mode = 4
                --0=Diagnose, 1=Summarize, 2=Index Usage Detail, 3=Missing Index Detail, 4=Diagnose Details`;
        }
        new placeScript().placescript(fileName,scriptText);
        
    };
    var disposable_runspblitzindex = vscode.commands.registerCommand('extension.run_sp_blitzindex', runspblitzindex);
    context.subscriptions.push(disposable_runspblitzindex);

    //sqlops.tasks.registerTask('extension.run_sp_blitzindex', (profile: sqlops.IConnectionProfile, context?: sqlops.ObjectExplorerContext) => new BlitzIndex().spBlitzIndexTable(profile, context));

    //creating the quickrun script for blitzcache
    var runspblitzcache = async () => {
        let fileName = "exec_sp_blitzcache.sql";
        console.log('Preparing sample run script.');
        const scriptText = `EXEC [dbo].[sp_BlitzCache]
        @SortOrder = 'reads',
            -- CPU, executions, xpm, recent compilations, memory grant, writes, all
        @Top = 10
        `;
        //await placeScript.placescript(fileName, scriptText);
        new placeScript().placescript(fileName,scriptText);
    };
    var disposable_runspblitzcache = vscode.commands.registerCommand('extension.run_sp_blitzcache',runspblitzcache)
    context.subscriptions.push(disposable_runspblitzcache);

    //creating the quickrun script
    var runspblitzfirst = async () => {
        let fileName = "exec_sp_blitzfirst.sql";
        console.log('Preparing sample run script.');
        const scriptText = `EXEC [dbo].[sp_BlitzFirst]
        @Seconds = 5,
        @ShowSleepingSPIDs = 0,
        @ExpertMode = 0 --1 will also run sp_BlitzWho
        `;
        //await placeScript.placescript(fileName, scriptText);
        new placeScript().placescript(fileName,scriptText);
    };
    var disposable_runspblitzfirst = vscode.commands.registerCommand('extension.run_sp_blitzfirst',runspblitzfirst);
    context.subscriptions.push(disposable_runspblitzfirst);


    let disposable = vscode.commands.registerCommand('extension.testmenus', async (context?: sqlops.ObjectExplorerContext) => {
        await getDB(context);
        // let connection = await getConnection(context);

        // // Format the message
        // let message = `Hello Connected World! Please connect in Object Explorer or a Query window`;
        // if (connection) {
        //     message = `Hello Connected World! Your server name is ${connection.options['server']}`;
        // }
        // // Display a message box to the user
        // vscode.window.showInformationMessage(message);
    });

    context.subscriptions.push(disposable);

}

async function getDB(context?: sqlops.ObjectExplorerContext) {
    if (context) {
        vscode.window.showInformationMessage(context.nodeInfo.nodeType);
    }
}

async function getConnection(context?: sqlops.ObjectExplorerContext): Promise<sqlops.ConnectionInfo> {
    // If we are called from a context menu use the predefined connection.
    // This even has correct database if the node clicked on is under a specific DB
    if (context) {
        return context.connectionProfile;
    }
    // Otherwise use APIs to find the global current connection / active connection
    let connection = await sqlops.connection.getCurrentConnection();
    if (!connection) {
        let allConnections = await sqlops.connection.getActiveConnections();
        if (allConnections && allConnections.length > 0) {
            connection = allConnections[0];
        }
    }
    return connection;
}

// this method is called when your extension is deactivated
export function deactivate() {
}

