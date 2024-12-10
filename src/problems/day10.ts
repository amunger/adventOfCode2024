import { processFile } from "../utils/helper";

const map: number[][] = [];
const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
]

function processLine(line: string) {
    const row = [];
    for (let i = 0; i < line.length; i++) {
        row.push(parseInt(line.charAt(i)));
    }

    map.push(row);
}

function nextPoint(loc: number[], direction: number[]) {
    return [loc[0] + direction[0], loc[1] + direction[1]]
}

function pointAsString(point: number[]) {
    return `${point[0]},${point[1]}`;
}

const trailHeads = new Map<String, string[]>();

function exploreTrail(x: number, y: number, elev: number, start: number[]) {
    if (elev === 9) {
        const key = pointAsString(start);
        const peak = pointAsString([x, y]);
        const peaks = trailHeads.get(key) ?? [];
        peaks.push(peak);

        trailHeads.set(key, peaks);

        return;
    }

    for (let dir of directions) {
        const [nx, ny] = nextPoint([x, y], dir);
        if (map[nx] && map[nx][ny] === elev + 1) {
            exploreTrail(nx, ny, elev + 1, start);
        }
    }
}

async function doIt() {
    await processFile('./input/day10.txt', processLine);

    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map.length; y++) {
            if (map[x][y] === 0) {
                exploreTrail(x, y, 0, [x, y]);
            }
        }
    }

    let result = 0;
    for (let head of trailHeads.keys()) {
        result += trailHeads.get(head)!.length;
        console.log(trailHeads.get(head));
    }
    console.log(result);
}

doIt();