'use strict';
import * as vscode from 'vscode';
import * as request from 'request-promise-native';
//import * as sqlops from 'sqlops';


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
        var setting: vscode.Uri = vscode.Uri.parse("untitled:" + fileName);
        vscode.workspace.openTextDocument(setting).then((a: vscode.TextDocument) => {
            vscode.window.showTextDocument(a, 1, false).then(e => {
                e.edit(edit => {
                    edit.insert(new vscode.Position(0, 0), scriptText);
                });
            });
        }, (error: any) => {
            console.error(error);
        });
        
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
        var setting: vscode.Uri = vscode.Uri.parse("untitled:" + fileName);
        vscode.workspace.openTextDocument(setting).then((a: vscode.TextDocument) => {
            vscode.window.showTextDocument(a, 1, false).then(e => {
                e.edit(edit => {
                    edit.insert(new vscode.Position(0, 0), scriptText);
                });
            });
        }, (error: any) => {
            console.error(error);
        });
        
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
        var setting: vscode.Uri = vscode.Uri.parse("untitled:" + fileName);
        vscode.workspace.openTextDocument(setting).then((a: vscode.TextDocument) => {
            vscode.window.showTextDocument(a, 1, false).then(e => {
                e.edit(edit => {
                    edit.insert(new vscode.Position(0, 0), scriptText);
                });
            });
        }, (error: any) => {
            console.error(error);
        });
        
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
        var setting: vscode.Uri = vscode.Uri.parse("untitled:" + fileName);
        vscode.workspace.openTextDocument(setting).then((a: vscode.TextDocument) => {
            vscode.window.showTextDocument(a, 1, false).then(e => {
                e.edit(edit => {
                    edit.insert(new vscode.Position(0, 0), scriptText);
                });
            });
        }, (error: any) => {
            console.error(error);
        });
        
    };
    var disposable_spblitzwho = vscode.commands.registerCommand('extension.sp_blitzwho', getblitzwho);
    context.subscriptions.push(disposable_spblitzwho);

    //creating the quickrun script
    var disposable_runspblitz = vscode.commands.registerCommand('extension.run_sp_blitz', () => {
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
        vscode.workspace.openTextDocument(setting).then((a: vscode.TextDocument) => {
            vscode.window.showTextDocument(a, 1, false).then(e => {
                e.edit(edit => {
                    edit.insert(new vscode.Position(0, 0), scriptText);
                });
            });
        }, (error: any) => {
            console.error(error);
        });
    });
    context.subscriptions.push(disposable_runspblitz);
    
    //importing the full spblitz script
    var getblitzindex = async () => {
        let fileName = "sp_BlitzIndex.sql";
        var options = {
            uri: baseUrl + fileName,
        };
        console.log('Bringing in the first responder kit from the mothership.');
        const scriptText = await request.get(options);
        var setting: vscode.Uri = vscode.Uri.parse("untitled:" + fileName);
        vscode.workspace.openTextDocument(setting).then((a: vscode.TextDocument) => {
            vscode.window.showTextDocument(a, 1, false).then(e => {
                e.edit(edit => {
                    edit.insert(new vscode.Position(0, 0), scriptText);
                });
            });
        }, (error: any) => {
            console.error(error);
        });
        
    };
    var disposable_spblitzindex = vscode.commands.registerCommand('extension.sp_blitzindex', getblitzindex);
    context.subscriptions.push(disposable_spblitzindex);
    
    //creating the quickrun script
    var disposable_runspblitzindex = vscode.commands.registerCommand('extension.run_sp_blitzindex', () => {
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
        var setting: vscode.Uri = vscode.Uri.parse("untitled:" + fileName);
        vscode.workspace.openTextDocument(setting).then((a: vscode.TextDocument) => {
            vscode.window.showTextDocument(a, 1, false).then(e => {
                e.edit(edit => {
                    edit.insert(new vscode.Position(0, 0), scriptText);
                });
            });
        }, (error: any) => {
            console.error(error);
        });
    });
    context.subscriptions.push(disposable_runspblitzindex);

    //creating the quickrun script for blitzcache
    var disposable_runspblitzcache = vscode.commands.registerCommand('extension.run_sp_blitzcache', () => {
        let fileName = "exec_sp_blitzcache.sql";
        console.log('Preparing sample run script.');
        const scriptText = `EXEC [dbo].[sp_BlitzCache]
        @SortOrder = 'reads',
            -- CPU, executions, xpm, recent compilations, memory grant, writes, all
        @Top = 10
        `;
        var setting: vscode.Uri = vscode.Uri.parse("untitled:" + fileName);
        vscode.workspace.openTextDocument(setting).then((a: vscode.TextDocument) => {
            vscode.window.showTextDocument(a, 1, false).then(e => {
                e.edit(edit => {
                    edit.insert(new vscode.Position(0, 0), scriptText);
                });
            });
        }, (error: any) => {
            console.error(error);
        });
    });
    context.subscriptions.push(disposable_runspblitzcache);

    //creating the quickrun script
    var disposable_runspblitzfirst = vscode.commands.registerCommand('extension.run_sp_blitzfirst', () => {
        let fileName = "exec_sp_blitzfirst.sql";
        console.log('Preparing sample run script.');
        const scriptText = `EXEC [dbo].[sp_BlitzFirst]
        @Seconds = 5,
        @ShowSleepingSPIDs = 0,
        @ExpertMode = 0 --1 will also run sp_BlitzWho
        `;
        var setting: vscode.Uri = vscode.Uri.parse("untitled:" + fileName);
        vscode.workspace.openTextDocument(setting).then((a: vscode.TextDocument) => {
            vscode.window.showTextDocument(a, 1, false).then(e => {
                e.edit(edit => {
                    edit.insert(new vscode.Position(0, 0), scriptText);
                });
            });
        }, (error: any) => {
            console.error(error);
        });
    });
    context.subscriptions.push(disposable_runspblitzfirst);


}

// this method is called when your extension is deactivated
export function deactivate() {
}

