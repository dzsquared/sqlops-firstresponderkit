'use strict';

import * as sqlops from 'azdata';
import * as vscode from 'vscode';

export class placeScript {

    private connectionId: string = '';
    private dbName: string = '';
    // places scriptText into fileName editor with current connection
    public async placescript(fileName, scriptText, context?: sqlops.ObjectExplorerContext) {
        try {
            let connection;
            if (context) {
                let connection = context.connectionProfile;
                this.connectionId = connection.id;
                this.dbName = context.connectionProfile.databaseName;
                await vscode.commands.executeCommand('explorer.query', context.connectionProfile);
            } else {
                await vscode.commands.executeCommand('newQuery');
            }

            let editor = vscode.window.activeTextEditor;
            let doc = editor.document;
            editor.edit(edit => {
                edit.insert(new vscode.Position(0, 0), scriptText);
            });

            if (context && this.dbName) {
                let providerName = context.connectionProfile.providerName;
                let dProvider = await sqlops.dataprotocol.getProvider<sqlops.ConnectionProvider>(providerName, sqlops.DataProviderType.ConnectionProvider);            
                let connectionUri = await sqlops.connection.getUriForConnection(this.connectionId);
                await dProvider.changeDatabase(connectionUri,this.dbName);
                await sqlops.queryeditor.connect(doc.uri.toString(), this.connectionId);
            }
        } catch (err) {
            vscode.window.showErrorMessage(err);
        }
    }
}
