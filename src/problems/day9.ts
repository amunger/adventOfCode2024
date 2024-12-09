import { processFile } from "../utils/helper";

let raw: string = '';

function processLine(line: string) {
    if (line.trim().length > 0) {
        raw = line.trim();
        if (line.length % 2 === 0) {
            throw new Error('not an odd number length');
        }
    }
}

type slot = {
    id: number,
    index: number,
    size: number
}

const emptySlots: slot[] = [];
const dataSlots: slot[] = []
const data: string[] = [];

// 01234
// 0.1.2
function layoutData() {
    for (let i = 0; i < raw.length; i += 2) {
        let size = parseInt(raw[i]);
        const id = Math.floor(i / 2);
        dataSlots.push({ id, index: data.length, size })
        for (let j = 0; j < size; j++) {
            data.push('.');
        }

        size = parseInt(raw[i + 1]);
        emptySlots.push({ id, index: data.length, size });
        for (let emptySize = parseInt(raw[i + 1]); emptySize > 0; emptySize--) {
            data.push('.');
        }
    }
}



function compactData() {
    for (let ds of dataSlots.reverse()) {
        for (let es of emptySlots) {
            if (es.id >= ds.id) {
                break;
            }

            if (ds.size <= es.size) {
                ds.index = es.index;
                es.index = es.index + ds.size;
                es.size = es.size - ds.size;
                break;
            }
        }
    }
}

function checksumData(data: string[]) {
    let result = 0;
    for (let ds of dataSlots) {
        //console.log(`fileId: ${ds.id}, index: ${ds.index}, size: ${ds.size}`);
        for (let i = 0; i < ds.size; i++) {
            const index = ds.index + i;
            const amount = ds.id * index;
            data[index] = ds.id.toString();
            //console.log(`id * index+i: ${ds.id} * ${index} = ${amount}`);
            result += amount;
        }
    }
    return result;
}

async function doIt() {
    await processFile('./input/day9.txt', processLine);

    layoutData();

    compactData();

    console.log(checksumData(data));

    console.log(data.join(''));
}

doIt();

// 6421724664967 too high
// 6421724645083