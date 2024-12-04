import { processFile } from "../utils/helper";

const validLines: string[] = [];

function smallIncrease(curr: number, prev: number) {
    return curr - prev > 0 && curr - prev < 4;
}

function smallDecrease(curr: number, prev: number) {
    return prev - curr > 0 && prev - curr < 4;
}

function invalidIndex(line: string[], check: (curr: number, prev: number) => boolean) {
    let i = 1;
    while (i < line.length) {
        const prev = parseInt(line[i - 1]);
        const curr = parseInt(line[i]);
        if (isNaN(prev) || isNaN(curr) || !check(curr, prev)) {
            console.log(`invalid: prev: ${prev}, curr: ${curr}`);
            return i;
        }
        i++;
    }
    return -1;
}

function processLine(line: string) {
    const levels = line.split(' ');

    const direction = [smallIncrease, smallDecrease];

    console.log(`check ${line}`);
    for (let i = 0; i < direction.length; i++) {
        const invalid = invalidIndex(levels, direction[i]);
        if (invalid < 0) {
            validLines.push(line);
            return;
        }

        const retry1 = levels.slice(0, invalid - 1).concat(levels.slice(invalid));
        console.log(`retry1: ${retry1}`);
        if (invalidIndex(retry1, direction[i]) < 0) {
            validLines.push(line);
            return;
        }

        const retry2 = levels.slice(0, invalid).concat(levels.slice(invalid + 1));
        console.log(`retry2: ${retry2}`);
       if (invalidIndex(retry2, direction[i]) < 0) {
            validLines.push(line);
            return;
        }
    }

    console.log(`fail`);
}

async function doIt() {
    await processFile('./input/day2.txt', processLine);
    console.log(validLines.length);
}

doIt();