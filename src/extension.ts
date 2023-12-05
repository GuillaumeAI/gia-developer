/**
 * @author Manas Sahu
 * https://github.com/GuillaumeAI/gia-developer
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
import { findProblem } from './commands/findProblem';
import { generateImage } from './commands/generateImage';

export function activate(context: vscode.ExtensionContext) {

	ext.context = context;

	const outputChannel = vscode.window.createOutputChannel("GIA Developer");
	ext.outputChannel = outputChannel;
	context.subscriptions.push(outputChannel);

	const provider = new ChatProvider();
	vscode.window.registerWebviewViewProvider("gia-developer-chatview", provider, {
		webviewOptions: { retainContextWhenHidden: true }
	});

	let disposableChangeAPIKey = vscode.commands.registerCommand('gia-developer.changeAPIKey', async () => {
		await changeAPIKey(true);
	});

	let disposableStartConversation = vscode.commands.registerCommand('gia-developer.startConversation', async () => {
		await startConversation();
	});

	let disposableExplainCode = vscode.commands.registerCommand('gia-developer.explainCode', async () => {
		await explainCode();
	});

	let disposableFindProblem = vscode.commands.registerCommand('gia-developer.findProblem', async () => {
		await findProblem();
	});

	let disposableGenerateImage = vscode.commands.registerCommand('gia-developer.generateImage', async () => {
		await generateImage();
	});

	context.subscriptions.push(disposableChangeAPIKey, disposableStartConversation, disposableExplainCode, disposableFindProblem, disposableGenerateImage);
}

export function deactivate() {}
