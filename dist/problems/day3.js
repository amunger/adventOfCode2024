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
const pairs = [];
let enabled = true;
function processLine(line) {
    var _a, _b, _c, _d, _e, _f;
    const regex = /((?<enable>do\(\))|(?<disable>don't\(\))|mul\((?<a>\d+),(?<b>\d+)\))/g;
    let match;
    while (match = regex.exec(line)) {
        if ((_a = match.groups) === null || _a === void 0 ? void 0 : _a['enable']) {
            console.log('enable');
            enabled = true;
        }
        else if ((_b = match.groups) === null || _b === void 0 ? void 0 : _b['disable']) {
            console.log('disable');
            enabled = false;
        }
        else if (enabled && ((_c = match.groups) === null || _c === void 0 ? void 0 : _c['a']) && ((_d = match.groups) === null || _d === void 0 ? void 0 : _d['b'])) {
            console.log('mul');
            pairs.push({ a: parseInt((_e = match.groups) === null || _e === void 0 ? void 0 : _e['a']), b: parseInt((_f = match.groups) === null || _f === void 0 ? void 0 : _f['b']) });
        }
    }
}
function doIt() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, helper_1.processFile)('./input/day3.txt', processLine);
        console.log(pairs);
        let result = 0;
        for (const pair of pairs) {
            result += pair.a * pair.b;
        }
        console.log(result);
    });
}
doIt();
//# sourceMappingURL=day3.js.map