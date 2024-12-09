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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const minHeap_1 = require("../utils/minHeap");
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
function processFile(filePath, lineCallback) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        try {
            for (var _d = true, rl_1 = __asyncValues(rl), rl_1_1; rl_1_1 = yield rl_1.next(), _a = rl_1_1.done, !_a;) {
                _c = rl_1_1.value;
                _d = false;
                try {
                    const line = _c;
                    lineCallback(line);
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = rl_1.return)) yield _b.call(rl_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
const left = new minHeap_1.MinHeap();
const right = new minHeap_1.MinHeap();
const processLine = (line) => {
    const regex = /(\d+)[^\d]+(\d+)/;
    const match = line.match(regex);
    if ((match === null || match === void 0 ? void 0 : match.length) !== 3) {
        return;
    }
    const first = parseInt(match[1]);
    left.insert(first);
    const second = parseInt(match[2]);
    right.insert(second);
};
function work() {
    return __awaiter(this, void 0, void 0, function* () {
        yield processFile('./input/day1.txt', processLine);
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
    });
}
work();
//# sourceMappingURL=day1.js.map