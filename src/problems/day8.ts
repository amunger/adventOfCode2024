import { get } from "http";
import { processFile } from "../utils/helper";

type node = {
    ant: string | false;
    antiNode: boolean;
}

function processLine(line: string) {
    const ants: node[] = [];
    for (let i = 0; i < line.length; i++) {
        const label = line[i];
        ants.push({ ant: label === '.' ? false : label, antiNode: false });
    }
    nodeMap.push(ants);
}


const antLocations: Map<string, number[][]> = new Map();
const nodeMap: node[][] = [];
let antiNodeCount = 0;

function getVector(loc1: number[], loc2: number[]) {
    return [loc2[0] - loc1[0], loc2[1] - loc1[1]];
}

function addVector(loc1: number[], loc2: number[]) {
    return [loc2[0] + loc1[0], loc2[1] + loc1[1]];
}

function invertVector(vector: number[]) {
    return [-vector[0], -vector[1]];
}

function addAntLocation(ant: string, location: number[]) {
    if (antLocations.has(ant)) {
        antLocations.get(ant)?.push(location);
    } else {
        antLocations.set(ant, [location]);
    }
}

function getNode(location: number[]) {
    if (location[0] < 0 || location[0] >= nodeMap.length) {
        return undefined;
    }
    return nodeMap[location[0]][location[1]];
}

function findInLine(start: number[], vector: number[]) {
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

function findAntiNodes(row: number, col: number) {
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

async function doIt() {
    await processFile('./input/day8.txt', processLine);

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

// 363 too low