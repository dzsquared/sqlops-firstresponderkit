'use strict';
import * as vscode from 'vscode';
import * as sqlops from 'azdata';
import * as request from 'request-promise-native';
import {placeScript} from './placescript';

const baseUrl = "https://raw.githubusercontent.com/BrentOzarULTD/SQL-Server-First-Responder-Kit/main/";

async function spblitzscript(baseUrl: string, fileName: string, context?: sqlops.ObjectExplorerContext) {
    let options = {
        uri: baseUrl + fileName,
    };
    console.log('Bringing in the first responder kit from the mothership.');
    const scriptText = await request.get(options);
    new placeScript().placescript(fileName, scriptText, context);
}

//importing all first responder kit scripts
export let getblitzall = async (context?: sqlops.ObjectExplorerContext) => {
    await spblitzscript(baseUrl, "Install-All-Scripts.sql", context);
};
export let disposable_spblitzall = vscode.commands.registerCommand('extension.sp_blitzall', getblitzall);

//importing spblitz script
let getblitz = async () => {
    await spblitzscript(baseUrl,"sp_Blitz.sql"); 
};
export let disposable_spblitz = vscode.commands.registerCommand('extension.sp_blitz', getblitz);


//importing spblitzcache script
let getblitzcache = async () => {
    await spblitzscript(baseUrl, "sp_BlitzCache.sql");
};
export let disposable_spblitzcache = vscode.commands.registerCommand('extension.sp_blitzcache', getblitzcache);

//importing spblitzfirst script
let getblitzfirst = async () => {
    await spblitzscript(baseUrl, "sp_BlitzFirst.sql");  
};
export let disposable_spblitzfirst = vscode.commands.registerCommand('extension.sp_blitzfirst', getblitzfirst);

//importing spblitzwho script
let getblitzwho = async () => {
    await spblitzscript(baseUrl, "sp_BlitzWho.sql");
};
export let disposable_spblitzwho = vscode.commands.registerCommand('extension.sp_blitzwho', getblitzwho);

//importing spblitzindex script
let getblitzindex = async () => {
    await spblitzscript(baseUrl, "sp_BlitzIndex.sql");
};
export let disposable_spblitzindex = vscode.commands.registerCommand('extension.sp_blitzindex', getblitzindex);