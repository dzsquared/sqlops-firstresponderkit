'use strict';

import * as sqlops from 'azdata';
import * as vscode from 'vscode';

export class placeScript {
    // places scriptText into fileName editor with current connection
    public async placescript(fileName, scriptText, context?: sqlops.ObjectExplorerContext) {
        var setting: vscode.Uri = vscode.Uri.parse("untitled:" + fileName);
        try {
            let doc = await vscode.workspace.openTextDocument(setting);
            let editor = await vscode.window.showTextDocument(doc, 1, false);
            editor.edit(edit => {
                edit.insert(new vscode.Position(0, 0), scriptText);
            });
        } catch (err) {
            vscode.window.showErrorMessage(err);
        }
    }
}
