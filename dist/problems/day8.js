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
function processLine(line) {
    const ants = [];
    for (let i = 0; i < line.length; i++) {
        const label = line[i];
        ants.push({ ant: label === '.' ? false : label, antiNode: false });
    }
    nodeMap.push(ants);
}
const antLocations = new Map();
const nodeMap = [];
let antiNodeCount = 0;
function getVector(loc1, loc2) {
    return [loc2[0] - loc1[0], loc2[1] - loc1[1]];
}
function addVector(loc1, loc2) {
    return [loc2[0] + loc1[0], loc2[1] + loc1[1]];
}
function invertVector(vector) {
    return [-vector[0], -vector[1]];
}
function addAntLocation(ant, location) {
    var _a;
    if (antLocations.has(ant)) {
        (_a = antLocations.get(ant)) === null || _a === void 0 ? void 0 : _a.push(location);
    }
    else {
        antLocations.set(ant, [location]);
    }
}
function getNode(location) {
    if (location[0] < 0 || location[0] >= nodeMap.length) {
        return undefined;
    }
    return nodeMap[location[0]][location[1]];
}
function findInLine(start, vector) {
    let location = start;
    while (getNode(location)) {
        const node = getNode(location);
        if (node && !node.antiNode) {
            node.antiNode = true;
            antiNodeCount++;
        }
        location = addVector(location, vector);
    }
    const reverse = invertVector(vector);
    location = addVector(start, reverse);
    while (getNode(location)) {
        const node = getNode(location);
        if (node && !node.antiNode) {
            node.antiNode = true;
            antiNodeCount++;
        }
        location = addVector(location, reverse);
    }
}
function findAntiNodes(row, col) {
    const node = getNode([row, col]);
    if (node && node.ant) {
        const others = antLocations.get(node.ant);
        if (others) {
            for (const other of others) {
                const vector = getVector([row, col], other);
                findInLine([row, col], vector);
            }
        }
        addAntLocation(node.ant, [row, col]);
    }
}
function processNodes() {
    for (let i = 0; i < nodeMap.length; i++) {
        for (let j = 0; j < nodeMap[i].length; j++) {
            findAntiNodes(i, j);
        }
    }
}
function doIt() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, helper_1.processFile)('./input/day8.txt', processLine);
        processNodes();
        for (let i = 0; i < nodeMap.length; i++) {
            let row = '';
            for (let j = 0; j < nodeMap[i].length; j++) {
                const node = nodeMap[i][j];
                row += node.ant ? node.ant : node.antiNode ? '#' : '.';
            }
            console.log(row);
        }
        console.log(antiNodeCount);
    });
}
doIt();
// 363 too low
//# sourceMappingURL=day8.js.map