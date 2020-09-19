'use strict';
import * as vscode from 'vscode';
import * as request from 'request-promise-native';
import * as sqlops from 'azdata';
import {placeScript} from './placescript';
import {disposable_spblitzversion} from './updateCheck';
import {openDocumentation} from './documentationLinking';
import * as getScripts from './getScripts';
import * as runScripts from './runScripts';

export function activate(context: vscode.ExtensionContext) {
    const baseUrl = "https://raw.githubusercontent.com/BrentOzarULTD/SQL-Server-First-Responder-Kit/main/";

    // documentation help link
    let currentBlitz: string = 'sp_Blitz';
    let timeout: NodeJS.Timer | null = null;
    var docsspblitz = () => {
        openDocumentation(baseUrl, currentBlitz);
    };
    var disposable_docsspblitz = vscode.commands.registerCommand('extension.docs_sp_blitz', docsspblitz);
    context.subscriptions.push(disposable_docsspblitz);
    let docsStatusBar: vscode.StatusBarItem;
    docsStatusBar = vscode.window.createStatusBarItem();
    docsStatusBar.command = 'extension.docs_sp_blitz';
    context.subscriptions.push(docsStatusBar);
    
    function checkSpBlitzType() : void {
        let blitzes: string[] = ['sp_Blitz', 'sp_BlitzIndex', 'sp_BlitzCache', 'sp_BlitzWho', 'sp_BlitzFirst', 'sp_BlitzLock', 'sp_Blitz\'']; 
        let blitzLabel: string = "";
        if (vscode.window.activeTextEditor) {
            let editorText: string = vscode.window.activeTextEditor.document.getText();
            blitzes.forEach( blitz => {
                if (editorText.toLowerCase().includes(blitz.toLowerCase())) {
                    blitzLabel = blitz.replace('\'','');
                }
            });
        }
        if (blitzLabel != "") {
            docsStatusBar.text = '$(question) ' + blitzLabel + ' Documentation';
            docsStatusBar.show();
        } else {
            docsStatusBar.hide();
        }
        currentBlitz = blitzLabel;
    }

    function triggerUpdateDocLink() {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(checkSpBlitzType, 1000); // wait a second to avoid hammering
    }

    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(triggerUpdateDocLink));
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(triggerUpdateDocLink));
    context.subscriptions.push(vscode.window.onDidChangeVisibleTextEditors(triggerUpdateDocLink));

    context.subscriptions.push(disposable_spblitzversion);

    context.subscriptions.push(getScripts.disposable_spblitzall);
    context.subscriptions.push(getScripts.disposable_spblitz);
    context.subscriptions.push(getScripts.disposable_spblitzcache);
    context.subscriptions.push(getScripts.disposable_spblitzfirst);
    context.subscriptions.push(getScripts.disposable_spblitzwho);
    context.subscriptions.push(getScripts.disposable_spblitzindex);

    context.subscriptions.push(runScripts.disposable_runspblitz);
    context.subscriptions.push(runScripts.disposable_runspblitzindex);
    context.subscriptions.push(runScripts.disposable_runspblitzcache);
    context.subscriptions.push(runScripts.disposable_runspblitzfirst);
    context.subscriptions.push(runScripts.disposable_runspblitzlock);
    context.subscriptions.push(runScripts.disposable_runspwhoisactive);
}

export function deactivate() {
    
}

