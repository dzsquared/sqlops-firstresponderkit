'use strict';
import * as vscode from 'vscode';
import * as request from 'request-promise-native';
//import * as sqlops from 'sqlops';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "sosblitz" is now active!');

    //putting together the script request
    const baseUrl = "https://raw.githubusercontent.com/BrentOzarULTD/SQL-Server-First-Responder-Kit/dev/";
    let fileName = "sp_Blitz.sql";
    let fullUrl =  baseUrl + fileName;
    var options = {
        uri: baseUrl + fileName,
    };
    
    var updateWindow = async () => {
        let editor = vscode.window.activeTextEditor;
        let doc = editor.document;
        console.log('Bringing in sp_blitz from the mothership.');
        let spblitz = new blitz();
        const scriptText = await request.get(options);
        //console.log(scriptText);
        spblitz.applyEdit(doc, scriptText);
    };

    var disposable = vscode.commands.registerCommand('extension.sp_blitz', updateWindow);
    context.subscriptions.push(disposable);


    //sample on server connection
    // context.subscriptions.push(vscode.commands.registerCommand('extension.showCurrentConnection', () => {
    //     // The code you place here will be executed every time your command is executed

    //     // Display a message box to the user
    //     sqlops.connection.getCurrentConnection().then(connection => {
    //         let connectionId = connection ? connection.connectionId : 'No connection found!';
    //         vscode.window.showInformationMessage(connectionId);
    //     }, error => {
    //          console.info(error);
    //     });
    // }));

}

// this method is called when your extension is deactivated
export function deactivate() {
}


class blitz {
    public applyEdit(doc, testText) {
        let playingfield = new editDocument();
        playingfield.editFactory(testText);
        
        var mychanges = playingfield.setEditFactory(doc.uri, testText);
        vscode.workspace.applyEdit(mychanges);
    
    }

}

class editDocument {
    public positionFactory(line, char) {
        return new vscode.Position(line, char);
    }
    public rangeFactory(start, end) {
        return new vscode.Range(start, end);
    }
    public textEditFactory(range, content) {
        return new vscode.TextEdit(range, content);
    }

    public editFactory(content) {
        var start = this.positionFactory(0, 0);
        var end = this.positionFactory(0, 0);
        var range = this.rangeFactory(start, end);
        
        return this.textEditFactory(range, content);
    }

    public editFactoryOld (coords, content){
        var start = this.positionFactory(coords.start.line, coords.start.char);
        var end = this.positionFactory(coords.end.line, coords.end.char);
        var range = this.rangeFactory(start, end);
        
        return this.textEditFactory(range, content);
    }

    public workspaceEditFactory() {
        return new vscode.WorkspaceEdit();
    }

    public setEditFactory(uri, content) { //coords,
        var workspaceEdit = this.workspaceEditFactory();
        var edit = this.editFactory(content);
        //var edit = this.editFactory(coords,content);

        workspaceEdit.set(uri, [edit]);
        return workspaceEdit;
    }

}
