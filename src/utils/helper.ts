import * as fs from 'fs';
import * as readline from 'readline';

export function factorial(num: number): number {
    if (num < 0) return -1; // Factorial for negative numbers doesn't exist
    if (num === 0) return 1; // Base case
    return num * factorial(num - 1);
}

export async function processFile(filePath: string, lineCallback: (line: string) => void): Promise<void> {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        lineCallback(line);
    }
}