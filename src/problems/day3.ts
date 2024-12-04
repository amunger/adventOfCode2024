import { processFile } from "../utils/helper";

const pairs: { a: number, b: number }[] = [];
let enabled = true;

function processLine(line: string) {
    const regex = /((?<enable>do\(\))|(?<disable>don't\(\))|mul\((?<a>\d+),(?<b>\d+)\))/g;
    let match;

    while (match = regex.exec(line)) {
        if (match.groups?.['enable']) {
            console.log('enable');
            enabled = true;
        } else if (match.groups?.['disable']) {
            console.log('disable');
            enabled = false;
        } else if (enabled && match.groups?.['a'] && match.groups?.['b']) {
            console.log('mul');
            pairs.push({ a: parseInt(match.groups?.['a']), b: parseInt(match.groups?.['b']) });
        }
    }
}

async function doIt() {
    await processFile('./input/day3.txt', processLine);

    console.log(pairs);
    let result = 0;
    for (const pair of pairs) {
        result += pair.a * pair.b;
    }
    console.log(result);
}

doIt();