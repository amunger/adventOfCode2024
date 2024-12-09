"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../utils/helper");
let data = '';
function processLine(line) {
    if (line.trim().length > 0) {
        data = line.trim();
        if (line.length % 2 === 0) {
            throw new Error('not an odd number length');
        }
    }
}
// 01234
// 0.1.2
function compact() {
    let result = [];
    let end = data.length - 1;
    let endId = Math.floor(end / 2);
    let endFileSize = parseInt(data.charAt(end));
    console.log(`end: ${end}, endId: ${endId}, endFileSize: ${endFileSize}`);
    for (let i = 0; i < end; i += 2) {
        const fileSize = parseInt(data[i]);
        const fileId = Math.floor(i / 2);
        for (let j = 0; j < fileSize; j++) {
            result.push(fileId);
        }
        for (let emptySize = parseInt(data[i + 1]); emptySize > 0; emptySize--) {
            result.push(endId);
            if (--endFileSize === 0) {
                end = end - 2;
                if (end <= i) {
                    break;
                }
                endId = Math.floor(end / 2);
                endFileSize = parseInt(data.charAt(end));
            }
        }
    }
    //console.log(`end: ${end}, endId: ${endId}, endFileSize: ${endFileSize}`);
    for (let i = 0; i < endFileSize; i++) {
        result.push(endId);
    }
    //console.log(result.join(''));
    return result;
}
function checksum(data) {
    let result = 0;
    for (let i = 0; i < data.length; i++) {
        result += i * data[i];
    }
    return result;
}
async function doIt() {
    await (0, helper_1.processFile)('./input/day9.txt', processLine);
    const compacted = compact();
    console.log(checksum(compacted));
}
doIt();
