'use strict';

import * as sqlops from 'sqlops';
import * as vscode from 'vscode';

export class placeScript {
      // places scriptText into fileName editor with current connection
      public async placescript(fileName, scriptText) {
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
