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
let raw = '';
function processLine(line) {
    if (line.trim().length > 0) {
        raw = line.trim();
        if (line.length % 2 === 0) {
            throw new Error('not an odd number length');
        }
    }
}
const emptySlots = [];
const dataSlots = [];
const data = [];
// 01234
// 0.1.2
function layoutData() {
    for (let i = 0; i < raw.length; i += 2) {
        let size = parseInt(raw[i]);
        const id = Math.floor(i / 2);
        dataSlots.push({ id, index: data.length, size });
        for (let j = 0; j < size; j++) {
            data.push('.');
        }
        size = parseInt(raw[i + 1]);
        emptySlots.push({ id, index: data.length, size });
        for (let emptySize = parseInt(raw[i + 1]); emptySize > 0; emptySize--) {
            data.push('.');
        }
    }
}
function compactData() {
    for (let ds of dataSlots.reverse()) {
        for (let es of emptySlots) {
            if (es.id >= ds.id) {
                break;
            }
            if (ds.size <= es.size) {
                ds.index = es.index;
                es.index = es.index + ds.size;
                es.size = es.size - ds.size;
                break;
            }
        }
    }
}
function checksumData(data) {
    let result = 0;
    for (let ds of dataSlots) {
        //console.log(`fileId: ${ds.id}, index: ${ds.index}, size: ${ds.size}`);
        for (let i = 0; i < ds.size; i++) {
            const index = ds.index + i;
            const amount = ds.id * index;
            data[index] = ds.id.toString();
            //console.log(`id * index+i: ${ds.id} * ${index} = ${amount}`);
            result += amount;
        }
    }
    return result;
}
function doIt() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, helper_1.processFile)('./input/day9.txt', processLine);
        layoutData();
        compactData();
        console.log(checksumData(data));
        console.log(data.join(''));
    });
}
doIt();
// 6421724664967 too high
// 6421724645083
//# sourceMappingURL=day9.js.map