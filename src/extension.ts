'use strict';
import * as vscode from 'vscode';
import * as request from 'request-promise-native';
import * as sqlops from 'sqlops';
import { error } from 'util';
import {placeScript} from './placescript';
import {updatecheck} from './updateCheck';

export function activate(context: vscode.ExtensionContext) {
    const baseUrl = "https://raw.githubusercontent.com/BrentOzarULTD/SQL-Server-First-Responder-Kit/master/";

    // checking spblitz versioning
    var oediag = async (context: sqlops.ObjectExplorerContext) => {
        vscode.window.showInformationMessage(context.isConnectionNode.toString());
        vscode.window.showInformationMessage(context.nodeInfo.nodeSubType);
        vscode.window.showInformationMessage(context.nodeInfo.iconType.toString());
    };
    var disposable_oediag = vscode.commands.registerCommand('extension.OEdiagnostics', oediag);
    context.subscriptions.push(disposable_oediag);
    
    // checking spblitz versioning
    var getblitzversion = async (context?: sqlops.ObjectExplorerContext) => {
        var amIUPD = new updatecheck();
        let updateReturn = await amIUPD.checkForUpdates(context);
        if (updateReturn) {
            if (updateReturn == 'update') {
                getblitzall();
            } else if (updateReturn != '') {
                let versionURL = 'https://github.com/BrentOzarULTD/SQL-Server-First-Responder-Kit/releases/tag/' + updateReturn;
                vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(versionURL));
            }

        } else {
            // do nothing
        }
    };
    var disposable_spblitzversion = vscode.commands.registerCommand('extension.sp_blitzversion', getblitzversion);
    context.subscriptions.push(disposable_spblitzversion);

    
    //importing all first responder kit scripts
    var getblitzall = async () => {
        let fileName = "Install-All-Scripts.sql";
        var options = {
            uri: baseUrl + fileName,
        };
        console.log('Bringing in the first responder kit from the mothership.');
        const scriptText = await request.get(options);
        new placeScript().placescript(fileName,scriptText);
    };
    var disposable_spblitzall = vscode.commands.registerCommand('extension.sp_blitzall', getblitzall);
    context.subscriptions.push(disposable_spblitzall);

    //importing spblitz script
    var getblitz = async () => {
        let fileName = "sp_Blitz.sql";
        var options = {
            uri: baseUrl + fileName,
        };
        console.log('Bringing in the first responder kit from the mothership.');
        const scriptText = await request.get(options);
        new placeScript().placescript(fileName,scriptText);
    };
    var disposable_spblitz = vscode.commands.registerCommand('extension.sp_blitz', getblitz);
    context.subscriptions.push(disposable_spblitz);

    //importing spblitzcache script
    var getblitzcache = async () => {
        let fileName = "sp_BlitzCache.sql";
        var options = {
            uri: baseUrl + fileName,
        };
        console.log('Bringing in the first responder kit from the mothership.');
        const scriptText = await request.get(options);
        new placeScript().placescript(fileName,scriptText);
    };
    var disposable_spblitzcache = vscode.commands.registerCommand('extension.sp_blitzcache', getblitzcache);
    context.subscriptions.push(disposable_spblitzcache);

    //importing spblitzfirst script
    var getblitzfirst = async () => {
        let fileName = "sp_BlitzFirst.sql";
        var options = {
            uri: baseUrl + fileName,
        };
        console.log('Bringing in the first responder kit from the mothership.');
        const scriptText = await request.get(options);
        new placeScript().placescript(fileName,scriptText);   
    };
    var disposable_spblitzfirst = vscode.commands.registerCommand('extension.sp_blitzfirst', getblitzfirst);
    context.subscriptions.push(disposable_spblitzfirst);

    //importing spblitzwho script
    var getblitzwho = async () => {
        let fileName = "sp_BlitzWho.sql";
        var options = {
            uri: baseUrl + fileName,
        };
        console.log('Bringing in the first responder kit from the mothership.');
        const scriptText = await request.get(options);
        new placeScript().placescript(fileName,scriptText);
    };
    var disposable_spblitzwho = vscode.commands.registerCommand('extension.sp_blitzwho', getblitzwho);
    context.subscriptions.push(disposable_spblitzwho);

    //creating the quickrun script
    var runspblitz = async (context?: sqlops.ObjectExplorerContext) => {
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
        --, @OutputDatabaseName = 'DBAtools', @OutputSchemaName = 'dbo', @OutputTableName = 'BlitzResults'
        
        -- for more info: https://www.brentozar.com/blitz/
        `;
        var setting: vscode.Uri = vscode.Uri.parse("untitled:" + fileName);
        new placeScript().placescript(fileName,scriptText,context);
    };
    var disposable_runspblitz = vscode.commands.registerCommand('extension.run_sp_blitz', runspblitz);
    context.subscriptions.push(disposable_runspblitz);
    
    //importing spblitzindex script
    var getblitzindex = async () => {
        let fileName = "sp_BlitzIndex.sql";
        var options = {
            uri: baseUrl + fileName,
        };
        console.log('Bringing in the first responder kit from the mothership.');
        const scriptText = await request.get(options);
        new placeScript().placescript(fileName,scriptText);
    };
    var disposable_spblitzindex = vscode.commands.registerCommand('extension.sp_blitzindex', getblitzindex);
    context.subscriptions.push(disposable_spblitzindex);
    
    //creating the quickrun script for blitzindex
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
        scriptText += `
        -- for more info: https://www.brentozar.com/blitzindex/
        `;
        new placeScript().placescript(fileName,scriptText,context);
        
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

        -- for more info: https://www.brentozar.com/blitzcache/
        `;
        new placeScript().placescript(fileName,scriptText);
    };
    var disposable_runspblitzcache = vscode.commands.registerCommand('extension.run_sp_blitzcache',runspblitzcache)
    context.subscriptions.push(disposable_runspblitzcache);

    //creating the quickrun script for blitzfirst
    var runspblitzfirst = async (context?: sqlops.ObjectExplorerContext) => {
        let fileName = "exec_sp_blitzfirst.sql";
        console.log('Preparing sample run script.');
        const scriptText = `EXEC [dbo].[sp_BlitzFirst]
        @Seconds = 5,
        @ShowSleepingSPIDs = 0,
        @ExpertMode = 0 --1 will also run sp_BlitzWho

        -- for more info: https://www.brentozar.com/askbrent/
        `;
        new placeScript().placescript(fileName,scriptText,context);
    };
    var disposable_runspblitzfirst = vscode.commands.registerCommand('extension.run_sp_blitzfirst',runspblitzfirst);
    context.subscriptions.push(disposable_runspblitzfirst);

    //creating the quickrun script for blitzlock
    var runspblitzlock = async (context?: sqlops.ObjectExplorerContext) => {
        let fileName = "exec_sp_blitzlock.sql";
        let scriptText = '';
        if (context && context.nodeInfo) {
            let scriptType = context.nodeInfo.nodeType;
            fileName = context.nodeInfo.label + '-' + fileName;
            var nodeBreakdown = context.nodeInfo.nodePath.split("/");
            let dbName = nodeBreakdown[2];
            switch (scriptType) {
                case "Database": {
                    scriptText = `EXEC [dbo].[sp_BlitzLock]
                        @DatabaseName = '${dbName}',
                        @Top = 10`;
                    break;
                }
                default: {
                    scriptText = `EXEC [dbo].[sp_BlitzLock]
                        @Top = 10`;
                    break;
                }
            }
        } else {
            scriptText = `EXEC [dbo].[sp_BlitzLock]
                @Top = 10
                --@DatabaseName = '',`;
        }
        scriptText += `
        -- for more info: https://www.brentozar.com/archive/2017/12/introducing-sp_blitzlock-troubleshooting-sql-server-deadlocks/
        `;
        new placeScript().placescript(fileName,scriptText,context);
    };
    var disposable_runspblitzlock = vscode.commands.registerCommand('extension.run_sp_blitzlock',runspblitzlock);
    context.subscriptions.push(disposable_runspblitzlock);
    
    //creating the quickrun script for whoisactive
    var runspwhoisactive = async (context?: sqlops.ObjectExplorerContext) => {
        let fileName = "exec_sp_whoisactive.sql";
        console.log('Preparing sample run script.');
        const scriptText = `EXEC sp_WhoIsActive 
        @find_block_leaders = 1, 
        @sort_order = '[blocked_session_count] DESC'
        -- @filter  = '',
        -- @filter_type  = 'session', 
        -- @not_filter  = '', 
        -- @not_filter_type  = 'session', 
        -- @show_own_spid  = 0, 
        -- @show_system_spids  = 0, 
        -- @show_sleeping_spids  = 1, 
        -- @get_full_inner_text  = 0,
        -- @get_plans  = 0, 
        -- @get_outer_command  = 0, 
        -- @get_transaction_info  = 0, 
        -- @get_task_info  = 1, 
        -- @get_locks  = 0, 
        -- @get_avg_time  = 0, 
        -- @get_additional_info  = 0,  
        -- @delta_interval  = 0, 
        -- @output_column_list  = '[dd%][session_id][sql_text][sql_command][login_name][wait_info][tasks][tran_log%][cpu%][temp%][block%][reads%][writes%][context%][physical%][query_plan][locks][%]', 
        -- @format_output  = 1, 
        -- @destination_table  = '', 
        -- @return_schema  = 0, 
        -- @help  = 0

        -- for more info: http://whoisactive.com/docs/
        `;
        new placeScript().placescript(fileName,scriptText,context);
    };
    var disposable_runspwhoisactive = vscode.commands.registerCommand('extension.run_sp_whoisactive',runspwhoisactive);
    context.subscriptions.push(disposable_runspwhoisactive);

}

export function deactivate() {
}

