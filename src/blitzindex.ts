'use strict';

import * as vscode from 'vscode';
import * as sqlops from 'sqlops';
import {placeScript} from './placescript';

export class BlitzIndex {
    public async spBlitzIndexTable(p: any, ...args: any[]) {
        let tableName = p.tableName;
        let dbName = '';
        
        let fileName = "exec_sp_blitzindex.sql";

        const scriptText = `EXEC [dbo].[sp_BlitzIndex]
        @DatabaseName = `+dbName+`',
        @TableName = '`+tableName+`'`;
        
        new placeScript().placescript(fileName,scriptText);
    }
}
