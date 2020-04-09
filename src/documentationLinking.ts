'use strict';
import * as vscode from 'vscode';
import * as request from 'request-promise-native';
import * as clipboardy from 'clipboardy';

export async function openDocumentation(baseUrl: string, scriptName: string) {
    let fileName = "README.md";
    var options = {
        uri: baseUrl + fileName,
    };
    const scriptText = await request.get(options);

    // find ## sp_blitz:
    let docIndex = scriptText.indexOf('## '+scriptName +':');
    let newLineIndex = scriptText.indexOf('\n', docIndex)

    // parse full line
    let bookmarkLine: string = scriptText.substring(docIndex+3, newLineIndex+1);

    // convert to link
    let docsUrlArray:string[] = Array.from(bookmarkLine);
    let docsUrl = "https://github.com/BrentOzarULTD/SQL-Server-First-Responder-Kit#";
    docsUrlArray.forEach(c => {
        if (c != ':' && c != ' ') {
            docsUrl += c;
        } else if ( c == ' ') {
            docsUrl += '-';
        }
    });

    // add to help menu as a FirstResponderKit section


    // present window with options to copy to clipboard or open in browser
    var buttonName = await vscode.window.showInformationMessage(
        docsUrl,
        {modal: false},
        "Copy",
        "Open in Browser"
    );
    if (buttonName) {
        if (buttonName == 'Open in Browser') {
            vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(docsUrl));
        } else if (buttonName == 'Copy') {
            await clipboardy.write(docsUrl);
        }
    }

}