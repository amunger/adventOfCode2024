import { processFile } from "../utils/helper";

const garden: plot[][] = [];
const regions: { [key: string]: plot[] } = {};

let Id = 0;

type plot = {
    label: string;
    location: number[];
    regionId?: string;
}

function processLine(line: string) {
    const row: plot[] = [];
    for (let i = 0; i < line.length; i++) {
        row.push({
            label: line.charAt(i),
            location: [garden.length, i]
        })
    }
    garden.push(row);
}

const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
function step(row: number, column: number, direction: number[]) {
    return [row + direction[0], column + direction[1]]
}

function labelAt(location: number[]) {
    if (location[0] < 0 || location[0] >= garden.length || location[1] < 0 || location[1] >= garden[location[0]].length) {
        return undefined;
    }
    return garden[location[0]][location[1]].label;
}

function assignRegion(row: number, column: number, regionId: string) {
    garden[row][column].regionId = regionId;
    regions[regionId].push(garden[row][column]);
    for (let dir of directions) {
        const next = step(row, column, dir);
        if (garden[next[0]] && garden[next[0]][next[1]] && garden[next[0]][next[1]].regionId === undefined) {
            if (labelAt(next) === labelAt([row, column])) {
                assignRegion(next[0], next[1], regionId);
            }
        }
    }
}

function getPermiter(regionId: string) {
    const plots = regions[regionId];
    let result = 0;
    for (let plot of plots) {
        const location = plot.location;
        for (let dir of directions) {
            if (labelAt(step(location[0], location[1], dir)) !== plot.label) {
                result++;
            }
        }
    }
    return result;
}

function getSides(regionId: string) {
    const plots = regions[regionId];
    let result = 0;
    for (let plot of plots) {
        const location = plot.location;
        
    }
    return result;
}

function getArea(regionId: string) {
    return regions[regionId].length;
}

async function doIt() {
    await processFile('input/day12.txt', processLine);

    for (let row = 0; row < garden.length; row++) {
        for (let column = 0; column < garden[row].length; column++) {
            if (garden[row][column].regionId === undefined) {
                const regionId = `${Id++}-${garden[row][column].label}`;
                regions[regionId] = [];
                assignRegion(row, column, regionId);
            }
        }
    }

    console.log(`Number of regions is ${Object.keys(regions).length}`);

    let price = 0;

    for (let regionId in regions) {
        const area = getArea(regionId);
        const permiter = getPermiter(regionId);
        price += area * permiter;
        //console.log(`Region ${regionId} has area ${area} and permiter ${permiter}`);
    }

    console.log(`Total price is ${price}`);
}

doIt();