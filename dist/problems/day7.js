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
    const parts = line.split(':');
    const target = parseInt(parts[0]);
    const operands = parts[1].trim().split(' ').map(x => parseInt(x));
    lines.push({ target, operands });
}
function getComboItr(itr, ops) {
    const result = [];
    for (let i = 0; i < ops; i++) {
        result.push(itr % 3);
        itr = Math.floor(itr / 3);
    }
    return result;
}
function calculate(operands, operSpec) {
    let result = operands[0];
    let log = [result.toString()];
    for (let i = 1; i < operands.length; i++) {
        if (operSpec[i - 1] === 0) {
            result = result + operands[i];
            log.push('+');
            log.push(operands[i].toString());
        }
        else if (operSpec[i - 1] === 1) {
            result = result * operands[i];
            log.push('*');
            log.push(operands[i].toString());
        }
        else {
            result = concatNumbers(result, operands[i]);
            log.push('concat');
            log.push(operands[i].toString());
        }
    }
    //console.log(log.join(' '));
    return result;
}
function concatNumbers(num1, num2) {
    const mul = Math.floor(Math.log10(num2) + 1);
    return num1 * Math.pow(10, mul) + num2;
}
function doIt() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, helper_1.processFile)('./input/day7.txt', processLine);
        let result = 0;
        for (let line of lines) {
            const operCount = Math.pow(3, line.operands.length - 1);
            for (let i = 0; i < operCount; i++) {
                const operSpec = getComboItr(i, line.operands.length - 1);
                if (calculate(line.operands, operSpec) === line.target) {
                    //console.log(line);
                    result += line.target;
                    break;
                }
            }
        }
        console.log(result);
        // for (let i = 0; i < 27; i++) {
        //     console.log(getComboItr(i, 3));
        // }
    });
}
doIt();
//# sourceMappingURL=day7.js.map