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
const lines = [];
function processLine(line) {
    lines.push(line);
}
const directions = [[1, 1], [1, -1], [-1, -1], [-1, 1]];
function checkDirection(row, column, direction, word) {
    if (word === '') {
        return true;
    }
    const line = lines[row];
    if (line && line.charAt(column) === word[0]) {
        return checkDirection(row + direction[0], column + direction[1], direction, word.slice(1));
    }
    return false;
}
let foundCount = 0;
function findWord(row, column) {
    if (lines[row].charAt(column) === 'A') {
        for (const direction of directions) {
            const sRow = row + direction[0] * -1;
            const sColumn = column + direction[1] * -1;
            if (checkDirection(sRow, sColumn, direction, 'MAS')) {
                let cross = [direction[0] * -1, direction[1]];
                let cRow = row + cross[0] * -1;
                let cColumn = column + cross[1] * -1;
                if (checkDirection(cRow, cColumn, cross, 'MAS')) {
                    foundCount++;
                    break;
                }
                cross = [direction[0], direction[1] * -1];
                cRow = row + cross[0] * -1;
                cColumn = column + cross[1] * -1;
                if (checkDirection(cRow, cColumn, cross, 'MAS')) {
                    foundCount++;
                    break;
                }
            }
        }
    }
}
function doIt() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, helper_1.processFile)('./input/day4.txt', processLine);
        for (let row = 0; row < lines.length; row++) {
            let line = lines[row];
            for (let column = 0; column < line.length; column++) {
                findWord(row, column);
            }
        }
        console.log(foundCount);
    });
}
doIt();
//# sourceMappingURL=day4.js.map