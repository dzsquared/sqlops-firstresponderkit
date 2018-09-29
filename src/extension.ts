'use strict';
import * as vscode from 'vscode';
import * as request from 'request-promise-native';
import * as sqlops from 'sqlops';
import { error } from 'util';


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
        await placescript(fileName, scriptText);
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
        await placescript(fileName, scriptText);
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
        await placescript(fileName, scriptText);        
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
        await placescript(fileName, scriptText);
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
        await placescript(fileName, scriptText);
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
        await placescript(fileName, scriptText);
    };
    var disposable_spblitzindex = vscode.commands.registerCommand('extension.sp_blitzindex', getblitzindex);
    context.subscriptions.push(disposable_spblitzindex);
    
    //creating the quickrun script
    var runspblitzindex = async () => {
        console.log('Preparing sample run script.');
        let fileName = "exec_sp_blitzindex.sql";
        const scriptText = `EXEC [dbo].[sp_BlitzIndex]
        @CheckUserDatabaseObjects = 1 ,
        @CheckProcedureCache = 0 ,
        @OutputType = 'TABLE' ,
        @OutputProcedureCache = 0 ,
        @CheckProcedureCacheFilter = NULL,
        @CheckServerInfo = 1
        -- uncomment the following line to write results to an output table
        --, @OutputDatabaseName = 'DBAtools', @OutputSchemaName = 'dbo', @OutputTableName = 'BlitzResults'`;
        await placescript(fileName, scriptText);
    };
    var disposable_runspblitzindex = vscode.commands.registerCommand('extension.run_sp_blitzindex', runspblitzindex);
    context.subscriptions.push(disposable_runspblitzindex);

    //creating the quickrun script for blitzcache
    var runspblitzcache = async () => {
        let fileName = "exec_sp_blitzcache.sql";
        console.log('Preparing sample run script.');
        const scriptText = `EXEC [dbo].[sp_BlitzCache]
        @SortOrder = 'reads',
            -- CPU, executions, xpm, recent compilations, memory grant, writes, all
        @Top = 10
        `;
        await placescript(fileName, scriptText);
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
        await placescript(fileName, scriptText);
    };
    var disposable_runspblitzfirst = vscode.commands.registerCommand('extension.run_sp_blitzfirst',runspblitzfirst);
    context.subscriptions.push(disposable_runspblitzfirst);



    // places scriptText into fileName editor with current connection
    async function placescript(fileName, scriptText) {
        var setting: vscode.Uri = vscode.Uri.parse("untitled:" + fileName);
        try {
            let connection = await sqlops.connection.getCurrentConnection();
            let doc = await vscode.workspace.openTextDocument(setting);
            let editor = await vscode.window.showTextDocument(doc, 1, false);
            editor.edit(edit => {
                edit.insert(new vscode.Position(0, 0), scriptText);
            });
            if (connection) {
                await sqlops.queryeditor.connect(doc.uri.toString(), connection.connectionId);
            }
        } catch (err) {
            vscode.window.showErrorMessage(err);
        }
    }

}

// this method is called when your extension is deactivated
export function deactivate() {
}

