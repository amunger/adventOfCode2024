"use strict";
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
    if (antLocations.has(ant)) {
        antLocations.get(ant)?.push(location);
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
function findAntiNodes(row, col) {
    const node = getNode([row, col]);
    if (node && node.ant) {
        const others = antLocations.get(node.ant);
        if (others) {
            for (const other of others) {
                const vector = getVector([row, col], other);
                const antiLocation = addVector([other[0], other[1]], vector);
                const antiNode = getNode(antiLocation);
                if (antiNode && !antiNode.ant) {
                    antiNode.antiNode = true;
                    antiNodeCount++;
                }
                const antiVector = invertVector(vector);
                const antiLocation2 = addVector([row, col], antiVector);
                const antiNode2 = getNode(antiLocation2);
                if (antiNode2 && !antiNode2.ant) {
                    antiNode2.antiNode = true;
                    antiNodeCount++;
                }
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
async function doIt() {
    await (0, helper_1.processFile)('./input/day8.txt', processLine);
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
}
doIt();