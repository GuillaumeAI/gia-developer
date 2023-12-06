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
export enum Models {
    ChatGPT = "gpt-3.5-turbo",
    ChatGPTturbo1106 = "gpt-3.5-turbo-1106",
    ChatGP4 = "gpt-4",
    ChatGP4k32 = "gpt-4-32k",
    ChatGP4p1106 = "gpt-4-1106-preview",
    Codex = "code-davinci-002"
}

export interface ModelAPIResponse {
    code: string,
    status?: number,
    data?: any
}
