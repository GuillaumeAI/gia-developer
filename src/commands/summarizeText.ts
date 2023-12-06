/**
 * @author Manas Sahu
 * https://github.com/jgwill/jgwilldevia
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

import { sendQuery } from './sendQuery';

export async function summarizeText(): Promise<void> {

    let config = vscode.workspace.getConfiguration();
    const model = config.get("giadeveloper.model") as string | null;

    const selectedCode = vscode.window.activeTextEditor?.document.getText(
        vscode.window.activeTextEditor?.selection,
    );

    if (selectedCode) { 
        await sendQuery((model === "gpt-turbo") ? "Summarize this:\n" + selectedCode : selectedCode + "\n");
    } else {
        vscode.window.showErrorMessage('Please select the text to summaryze to get response from OpenAI');
        return;
    }
}
