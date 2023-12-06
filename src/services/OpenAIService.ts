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
import axios from 'axios';

export class OpenAIService {

    url: string = 'https://api.openai.com';

    constructor() {
    }

    buildHeader(key: string): any {
        if (key) {
            return {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${key}`
                },
            };
        }
        return null;
    }  
    
    async executeGPTTurbo(key: string, maxTokens: number, temperature: number, q: string): Promise<any> {
        const { headers } = this.buildHeader(key);

        var body = JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{
                "role": "user",
                "content": q
            }],
            "temperature": temperature,
            "max_tokens": maxTokens,
        });

        try {
            const response = await axios.post(`${this.url}/v1/chat/completions`, body, { headers });
            return { code: "OK", status: response.status, data: response.data };
        } catch (error: any) {
            // https://platform.openai.com/docs/guides/error-codes/api-errors
            if (error.response.status === 401) {
                return { code: "Error", status: error.response.status, data: error.response.data.error.message };
            } else if (error.response.status === 429) {
                return { code: "Error", status: error.response.status, data: error.response.data.error.message };
            } else if (error.response.status === 500) {
                return { code: "Error", status: error.response.status, data: error.response.data.error.message };
            } else {
                return { code: "Error", status: error.response.status, data: error.message };
            }
        }
    }

    async executeCodex(key: string, maxTokens: number, temperature: number, q: string): Promise<any> {
        const { headers } = this.buildHeader(key);

        var body = JSON.stringify({
            "model": "code-davinci-002",
            "prompt": q,
            "temperature": temperature,
            "max_tokens": maxTokens,
            "frequency_penalty": 0.38
        });

        try {
            const response = await axios.post(`${this.url}/v1/completions`, body, { headers });
            return { code: "OK", status: response.status, data: response.data };
        } catch (error: any) {
            if (error.response.status === 401) {
                return { code: "Error", status: error.response.status, data: error.response.data.error.message };
            } else if (error.response.status === 429) {
                return { code: "Error", status: error.response.status, data: error.response.data.error.message };
            } else if (error.response.status === 500) {
                return { code: "Error", status: error.response.status, data: error.response.data.error.message };
            } else {
                return { code: "Error", status: error.response.status, data: error.message };
            }
        }
    }

    async executeImage(key: string, total: number, size: string, q: string): Promise<any> {
        const { headers } = this.buildHeader(key);

        var body = JSON.stringify({
            "prompt": q,
            "n": total,
            "size": size,
        });

        try {
            const response = await axios.post(`${this.url}/v1/images/generations`, body, { headers });
            return { code: "OK", status: response.status, data: response.data.data };
        } catch (error: any) {
            if (error.response.status === 401) {
                return { code: "Error", status: error.response.status, data: error.response.data.error.message };
            } else if (error.response.status === 429) {
                return { code: "Error", status: error.response.status, data: error.response.data.error.message };
            } else if (error.response.status === 500) {
                return { code: "Error", status: error.response.status, data: error.response.data.error.message };
            } else {
                return { code: "Error", status: error.response.status, data: error.message };
            }
        }
    }
}