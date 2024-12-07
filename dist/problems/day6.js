"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../utils/helper");
const nodes = [];
let position = [0, 0];
let start = [0, 0];
function processLine(line) {
    const rows = [];
    for (let i = 0; i < line.length; i++) {
        rows.push({ block: line[i] === '#', visited: undefined, added: false });
        if (line[i] === '^') {
            start = position = [nodes.length, i];
        }
    }
    nodes.push(rows);
}
const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
];
let direction = directions[0];
function turnRight(direction) {
    return directions[(directions.indexOf(direction) + 1) % 4];
}
function nextPosition(position, direction) {
    return [position[0] + direction[0], position[1] + direction[1]];
}
function getNode(position) {
    if (!nodes[position[0]] || !nodes[position[0]][position[1]]) {
        return undefined;
    }
    return nodes[position[0]][position[1]];
}
function hashPosition(position, direction) {
    return `${position[0]},${position[1]}_${direction[0]},${direction[1]}`;
}
function redirectWillLoop() {
    let pos = start;
    let dir = directions[0];
    const visited = new Set();
    while (true) {
        const next = nextPosition(pos, dir);
        const nextNode = getNode(next);
        if (!nextNode) {
            break;
        }
        else if (visited.has(hashPosition(pos, dir))) {
            return true;
        }
        visited.add(hashPosition(pos, dir));
        if (nextNode.block) {
            dir = turnRight(dir);
        }
        else {
            pos = next;
        }
    }
    return false;
}
async function doIt() {
    await (0, helper_1.processFile)('./input/day6.txt', processLine);
    let count = 0;
    while (true) {
        const next = nextPosition(position, direction);
        const nextNode = getNode(next);
        if (!nextNode) {
            break;
        }
        if (!nextNode.block && !nextNode.added
            && !(next[0] === start[0] && next[1] === start[1])) {
            nextNode.block = true;
            if (redirectWillLoop()) {
                count++;
                nextNode.added = true;
            }
            else {
                nextNode.tried = true;
            }
            nextNode.block = false;
        }
        getNode(position).visited = direction;
        if (nextNode.block) {
            direction = turnRight(direction);
        }
        else {
            position = next;
        }
    }
    nodes.forEach(row => {
        console.log(row.map(node => node.added ? 'O'
            : node.block ? '#'
                : node.tried ? 'x'
                    : node.visited ? 'X'
                        : '.').join(''));
    });
    console.log(count);
}
doIt();
//1599 too high
// 1516
