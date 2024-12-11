import { processFile } from "../utils/helper";

const solutions = new Map<number, number[]>();

function blink(num: number, times: number) {
    if (times === 0) {
        return 1;
    } else {
        const solArray = solutions.get(num);
        if (solArray && solArray[times] !== undefined) {
            //console.log(`Found ${num},${times} = ${solArray[times]} in cache`);
            return solArray[times];
        }
    }

    let next: number[] = [];
    const numStr = num.toString();
    if (num === 0) {
        next.push(1);
    } else if (numStr.length % 2 === 0) {
        next.push(parseInt(numStr.slice(0, numStr.length / 2)));
        next.push(parseInt(numStr.slice(numStr.length / 2)));
    } else {
        next.push(num * 2024);
    }

    let result = 0;
    for (let i = 0; i < next.length; i++) {
        result += blink(next[i], times - 1);
    }

    const solArray = solutions.get(num) ?? [];
    solArray[times] = result;
    solutions.set(num, solArray);
    return result;
}

function processLine(line: string) {
    const input = line.split(' ').map(x => parseInt(x));

    let result = 0;
    for (let num of input) {
        result += blink(num, 75);
    }

    console.log(result);
}

async function doIt() {
    
    const start = Date.now();
    await processFile('./input/day11.txt', processLine);
    const end = Date.now();
    console.log(`Execution time: ${end - start} ms`);

}

doIt();