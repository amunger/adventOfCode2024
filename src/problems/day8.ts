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

function findAntiNodes(row: number, col: number) {
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