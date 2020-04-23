'use strict';
import * as vscode from 'vscode';
import * as sqlops from 'azdata';
import {placeScript} from './placescript';

let runspblitz = async (context?: sqlops.ObjectExplorerContext) => {
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
export let disposable_runspblitz = vscode.commands.registerCommand('extension.run_sp_blitz', runspblitz);

let runspblitzindex = async (context?: sqlops.ObjectExplorerContext) => {
    console.log('Preparing sample run script.');
    let fileName = "exec_sp_blitzindex.sql";
    let scriptText = '';
    if (context) {
        let scriptType = context.nodeInfo.nodeType;
        fileName = context.nodeInfo.label + '-' + fileName;
        let dbName = context.connectionProfile.databaseName;
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
                let schName: string = context.nodeInfo.metadata.schema;
                let tblName: string = context.nodeInfo.metadata.name;
                scriptText = `EXEC [dbo].[sp_BlitzIndex]
                    @DatabaseName = '${dbName}',
                    @SchemaName = '${schName}',
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
export let disposable_runspblitzindex = vscode.commands.registerCommand('extension.run_sp_blitzindex', runspblitzindex);

//creating the quickrun script for blitzcache
let runspblitzcache = async () => {
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
export let disposable_runspblitzcache = vscode.commands.registerCommand('extension.run_sp_blitzcache',runspblitzcache);

//creating the quickrun script for blitzfirst
let runspblitzfirst = async (context?: sqlops.ObjectExplorerContext) => {
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
export let disposable_runspblitzfirst = vscode.commands.registerCommand('extension.run_sp_blitzfirst',runspblitzfirst);

 //creating the quickrun script for blitzlock
 let runspblitzlock = async (context?: sqlops.ObjectExplorerContext) => {
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
export let disposable_runspblitzlock = vscode.commands.registerCommand('extension.run_sp_blitzlock',runspblitzlock);


//creating the quickrun script for whoisactive
let runspwhoisactive = async (context?: sqlops.ObjectExplorerContext) => {
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
export let disposable_runspwhoisactive = vscode.commands.registerCommand('extension.run_sp_whoisactive',runspwhoisactive);
