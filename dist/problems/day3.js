"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../utils/helper");
const pairs = [];
let enabled = true;
function processLine(line) {
    const regex = /((?<enable>do\(\))|(?<disable>don't\(\))|mul\((?<a>\d+),(?<b>\d+)\))/g;
    let match;
    while (match = regex.exec(line)) {
        if (match.groups?.['enable']) {
            console.log('enable');
            enabled = true;
        }
        else if (match.groups?.['disable']) {
            console.log('disable');
            enabled = false;
        }
        else if (enabled && match.groups?.['a'] && match.groups?.['b']) {
            console.log('mul');
            pairs.push({ a: parseInt(match.groups?.['a']), b: parseInt(match.groups?.['b']) });
        }
    }
}
async function doIt() {
    await (0, helper_1.processFile)('./input/day3.txt', processLine);
    console.log(pairs);
    let result = 0;
    for (const pair of pairs) {
        result += pair.a * pair.b;
    }
    console.log(result);
}
doIt();
