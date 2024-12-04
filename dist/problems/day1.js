"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const minHeap_1 = require("../utils/minHeap");
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
async function processFile(filePath, lineCallback) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        lineCallback(line);
    }
}
const left = new minHeap_1.MinHeap();
const right = new minHeap_1.MinHeap();
const processLine = (line) => {
    const regex = /(\d+)[^\d]+(\d+)/;
    const match = line.match(regex);
    if (match?.length !== 3) {
        return;
    }
    const first = parseInt(match[1]);
    left.insert(first);
    const second = parseInt(match[2]);
    right.insert(second);
};
async function work() {
    await processFile('./input/day1.txt', processLine);
    let similarity = 0;
    while (left.size() > 0) {
        const l = left.extractMin();
        let count = 0;
        while (right.size() > 0 && right.peek() < l) {
            right.extractMin();
        }
        while (right.size() > 0 && right.peek() === l) {
            right.extractMin();
            count++;
        }
        similarity += count * l;
        while (left.size() > 0 && left.peek() === l) {
            left.extractMin();
            similarity += count * l;
        }
    }
    console.log('answer: ', similarity);
}
work();
