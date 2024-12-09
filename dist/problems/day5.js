"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../utils/helper");
const rules = new Map();
const updates = [];
let rulesDone = false;
function processLine(line) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
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
                (_a = rules.get(rule[0])) === null || _a === void 0 ? void 0 : _a.push(rule[1]);
            }
            else {
                rules.set(rule[0], [rule[1]]);
            }
        }
    });
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
function doIt() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, helper_1.processFile)('./input/day5.txt', processLine);
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
    });
}
doIt();
//# sourceMappingURL=day5.js.map