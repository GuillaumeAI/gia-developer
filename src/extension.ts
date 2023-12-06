/**
 * @author Manas Sahu
 * https://github.com/GuillaumeAI/giadeveloper
 *
 * @license
 * Copyright (c) 2023 - Present, Manas Sahu
 *
 * All rights reserved. Code licensed under the MIT license
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 */
import * as vscode from 'vscode';

import { ext } from './extensionVariables';

import { ChatProvider } from './views/ChatProvider';

import { changeAPIKey } from './commands/changeAPIKey';
import { startConversation } from './commands/startConversation';
import { explainCode } from './commands/explainCode';
import { summarizeText } from './commands/summarizeText';
import { findProblem } from './commands/findProblem';
import { generateImage } from './commands/generateImage';

export function activate(context: vscode.ExtensionContext) {

	ext.context = context;

	const outputChannel = vscode.window.createOutputChannel("GIA Developer");
	ext.outputChannel = outputChannel;
	context.subscriptions.push(outputChannel);

	const provider = new ChatProvider();
	vscode.window.registerWebviewViewProvider("giadeveloper-chatview", provider, {
		webviewOptions: { retainContextWhenHidden: true }
	});

	let disposableChangeAPIKey = vscode.commands.registerCommand('giadeveloper.changeAPIKey', async () => {
		await changeAPIKey(true);
	});

	let disposableStartConversation = vscode.commands.registerCommand('giadeveloper.startConversation', async () => {
		await startConversation();
	});

	let disposableExplainCode = vscode.commands.registerCommand('giadeveloper.explainCode', async () => {
		await explainCode();
	});

	
	let disposableSummarizeText = vscode.commands.registerCommand('giadeveloper.summarizeText', async () => {
		await summarizeText();
});

	let disposableFindProblem = vscode.commands.registerCommand('giadeveloper.findProblem', async () => {
		await findProblem();
	});

	let disposableGenerateImage = vscode.commands.registerCommand('giadeveloper.generateImage', async () => {
		await generateImage();
	});

	context.subscriptions.push(disposableChangeAPIKey, disposableStartConversation, disposableExplainCode,disposableSummarizeText, disposableFindProblem, disposableGenerateImage);
}

export function deactivate() {}
