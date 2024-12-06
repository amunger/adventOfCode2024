import { processFile } from "../utils/helper";

type node = {
    block: boolean;
    visited: boolean;
}

const nodes: node[][] = [];
let position = [0, 0]

function processLine(line: string) {
    const rows: node[] = [];
    for (let i = 0; i < line.length; i++) {
        rows.push({ block: line[i] === '#', visited: false });
        if (line[i] === '^') {
            position = [nodes.length, i]
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

function turnRight() {
    direction = directions[(directions.indexOf(direction) + 1) % 4];
}

function nextPosition() {
    return [position[0] + direction[0], position[1] + direction[1]];
}

function getNode(position: number[]){
    if (!nodes[position[0]] || !nodes[position[0]][position[1]]) {
        return undefined;
    }

    return nodes[position[0]][position[1]];
}

async function doIt() {
    await processFile('./input/day6.txt', processLine);

    let count = 1;
    while (true) {
        getNode(position)!.visited = true

        const next = nextPosition();
        const nextNode = getNode(next);
        if (!nextNode){
            break;
        }
    
        if (nextNode.block) {
            turnRight();
        } else {
            count += nextNode.visited ? 0 : 1;
            position = next;
        }
    }

    nodes.forEach(row => {
        console.log(row.map(node => node.block ? '#' : node.visited ? 'X' : '.').join(''));
    });
    console.log(count);

}

doIt();