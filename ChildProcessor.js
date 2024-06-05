/**
 * 概要:
 * ファイルを読み込んで子プロセスで実行するクラス
 * 
 * 使用例:
 * let childProcessor = new ChildProcessor();
 * await childProcessor.run(filePath);
 * 
 * @author R. Ichiro Tanaka
 * @description ファイルを読み込み、子プロセスで実行し結果をJSON形式で返す
 */

import { spawn } from 'child_process';
import path from 'path';

class ChildProcessor {

    result = '';

    constructor() { }

    async run(filePath) {
        try {
            this.result = await this.spawnProcess(filePath);
            let resultInfo = {
                status: 'success',
                result: this.result
            };
            return resultInfo;
        } catch (err) {
            let errorInfo = {
                status: 'error',
                message: err.message,
                stack: err.stack
            };
            return errorInfo;
        }
    }

    /**
     * ファイルを読み込んで子プロセスで実行する
     * @param {string} filePath 実行するファイルパス
     * @returns {object} 子プロセスの実行結果
     */
    async spawnProcess(filePath) {
        try {
            // Input validation: only allow valid file paths and extensions
            const allowedExtensions = ['.js', '.ts'];
            if (!allowedExtensions.includes(path.extname(filePath))) {
                throw new Error(`Invalid file extension: ${path.extname(filePath)}`);
            }

            const childProcess = spawn('node', [filePath]);

            let output = '';
            return new Promise((resolve, reject) => {
                childProcess.on('error', (error) => {
                    reject(error); // 子プロセスで発生したエラーを拒否します
                });

                childProcess.stdout.on('data', (data) => {
                    output = data.toString();
                });

                childProcess.on('close', (code) => {
                    if (code !== 0) {
                        reject(new Error(`child process exited with code ${code}`));
                    } else {
                        resolve(output);
                    }
                });
            });
        } catch (err) {
            throw err;
        }
    }
}
export {
    ChildProcessor
};
