import { processFile } from "../utils/helper";

const rules = new Map<string, string[]>();

const updates: string[][] = [];

let rulesDone = false;

async function processLine(line: string) {
    if (line.trim() === '') {
        rulesDone = true;
        return;
    }
    if (rulesDone) {
        updates.push(line.split(','));
    } else {
        const rule = line.split('|');
        if (rules.has(rule[0])) {
            rules.get(rule[0])?.push(rule[1]);
        } else {
            rules.set(rule[0], [rule[1]]);
        }
    }
}

function checkUpdate(update: string[]) {
    const seen = new Set<string>();
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

function getMiddle(update: string[]) {
    const midIx = Math.floor(update.length / 2);
    return parseInt(update[midIx]);
}

let result = 0;

async function doIt() {
    await processFile('./input/day5.txt', processLine);

    for (const update of updates) {
        if (checkUpdate(update)) {
            result += getMiddle(update);
        }
    }

    console.log(result);
}

doIt();