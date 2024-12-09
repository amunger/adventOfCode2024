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
const validLines = [];
function smallIncrease(curr, prev) {
    return curr - prev > 0 && curr - prev < 4;
}
function smallDecrease(curr, prev) {
    return prev - curr > 0 && prev - curr < 4;
}
function invalidIndex(line, check) {
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
function processLine(line) {
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
function doIt() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, helper_1.processFile)('./input/day2.txt', processLine);
        console.log(validLines.length);
    });
}
doIt();
//# sourceMappingURL=day2.js.map