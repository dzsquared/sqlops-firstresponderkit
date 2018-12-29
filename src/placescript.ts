'use strict';

import * as sqlops from 'sqlops';
import * as vscode from 'vscode';

export class placeScript {
      // places scriptText into fileName editor with current connection
      public async placescript(fileName, scriptText, context?: sqlops.ObjectExplorerContext) {
        var setting: vscode.Uri = vscode.Uri.parse("untitled:" + fileName);
        try {
            var connectId;
            if (context) {
                let connection = context.connectionProfile;
                connectId = connection.id;
            } else {
                let connection = await sqlops.connection.getCurrentConnection();
                connectId = connection.connectionId;
            }
            let doc = await vscode.workspace.openTextDocument(setting);
            let editor = await vscode.window.showTextDocument(doc, 1, false);
            editor.edit(edit => {
                edit.insert(new vscode.Position(0, 0), scriptText);
            });
            if (connectId) {
                await sqlops.queryeditor.connect(doc.uri.toString(), connectId);
            }
        } catch (err) {
            vscode.window.showErrorMessage(err);
        }
    }
}
