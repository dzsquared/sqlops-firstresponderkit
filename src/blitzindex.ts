'use strict';

import * as vscode from 'vscode';
import * as sqlops from 'sqlops';
import {placeScript} from './placescript';

export class BlitzIndex {
    public async spBlitzIndexTable(p: any, c: any) {
        let profile = <sqlops.IConnectionProfile>p.connectionProfile;
        let tableName = '';
        let dbName = '';
        
        let scriptText = '';

        let scriptType = '';
        scriptType = c.nodeInfo.nodeType;

		if (profile) {
            switch(scriptType) {
                case "database": {
                    dbName = profile.databaseName;

                    scriptText = `EXEC [dbo].[sp_BlitzIndex]
                    @DatabaseName = `+dbName+`',
                    @Mode = 4`;
                    break;
                }
                case "table": {
                    tableName = c.nodeInfo.label;
                    dbName = profile.databaseName;
                    
                    scriptText = `EXEC [dbo].[sp_BlitzIndex]
                    @DatabaseName = `+dbName+`',
                    @TableName = '`+tableName+`'`;
                    break;
                }
                default: {
                    //no context but connected
                    scriptText = `EXEC [dbo].[sp_BlitzIndex]
                    @DatabaseName = '',
                    --@TableName = '',
                     @Mode = 4
                     --0=Diagnose, 1=Summarize, 2=Index Usage Detail, 3=Missing Index Detail, 4=Diagnose Details`;
                    break;
                }
            }
		} else {
            //not connected, generate default
            scriptText = `EXEC [dbo].[sp_BlitzIndex]
            @DatabaseName = '',
            --@TableName = '',
             @Mode = 4
             --0=Diagnose, 1=Summarize, 2=Index Usage Detail, 3=Missing Index Detail, 4=Diagnose Details`;
        }
        
        let fileName = "exec_sp_blitzindex.sql";
        
        new placeScript().placescript(fileName,scriptText);
    }
}
