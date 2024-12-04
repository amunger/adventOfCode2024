import { MinHeap } from "../utils/minHeap";
import * as fs from 'fs';
import * as readline from 'readline';

async function processFile(filePath: string, lineCallback: (line: string) => void): Promise<void> {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        lineCallback(line);
    }
}

const left = new MinHeap();
const right = new MinHeap();

const processLine = (line: string): void => {
    const regex = /(\d+)[^\d]+(\d+)/;
    const match = line.match(regex)
    if (match?.length !== 3) {
        return;
    }
    const first = parseInt(match[1]);
    left.insert(first);
    const second = parseInt(match[2]);
    right.insert(second);
}

async function work() {

    await processFile('./input/day1.txt', processLine);

    let similarity = 0;

    while (left.size() > 0) {
        const l = left.extractMin();
        let count = 0;

        while (right.size() > 0 && right.peek()! < l!) {
            right.extractMin();
        }

        while (right.size() > 0 && right.peek()! === l!) {
            right.extractMin();
            count++;
        }

        similarity += count * l!;
        while (left.size() > 0 && left.peek() === l) {
            left.extractMin();
            similarity += count * l!;
        }
    }

    console.log('answer: ', similarity);
}

work();
