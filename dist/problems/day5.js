"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../utils/helper");
const rules = new Map();
const updates = [];
let rulesDone = false;
async function processLine(line) {
    if (line.trim() === '') {
        rulesDone = true;
        return;
    }
    if (rulesDone) {
        updates.push(line.split(','));
    }
    else {
        const rule = line.split('|');
        if (rules.has(rule[0])) {
            rules.get(rule[0])?.push(rule[1]);
        }
        else {
            rules.set(rule[0], [rule[1]]);
        }
    }
}
function checkUpdate(update) {
    const seen = new Set();
    for (let i = 0; i < update.length; i++) {
        const others = rules.get(update[i]);
        if (others) {
            for (const other of others) {
                if (seen.has(other)) {
                    return false;
                }
            }
        }
        seen.add(update[i]);
    }
    return true;
}
function getMiddle(update) {
    const midIx = Math.floor(update.length / 2);
    return parseInt(update[midIx]);
}
function fixUpdate(update) {
    let fixed = [...update];
    let adjusted = true;
    while (adjusted) {
        adjusted = false;
        const seen = new Map();
        for (let i = 0; i < fixed.length; i++) {
            const others = rules.get(fixed[i]);
            if (others) {
                for (const other of others) {
                    if (seen.has(other)) {
                        const otherIx = seen.get(other);
                        const temp = fixed[otherIx];
                        fixed[otherIx] = fixed[i];
                        fixed[i] = temp;
                        adjusted = true;
                        break;
                    }
                }
            }
            seen.set(fixed[i], i);
        }
    }
    return fixed;
}
let result = 0;
const bad = [];
async function doIt() {
    await (0, helper_1.processFile)('./input/day5.txt', processLine);
    for (const update of updates) {
        if (!checkUpdate(update)) {
            bad.push(update);
        }
    }
    for (const update of bad) {
        const fixed = fixUpdate(update);
        result += getMiddle(fixed);
        console.log(`${update} -> ${fixed}`);
    }
    console.log(result);
}
doIt();
