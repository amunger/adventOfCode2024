import { processFile } from "../utils/helper";


type line = {
    target: number;
    operands: number[];
}

const lines: line[] = [];

function processLine(line: string) {
    const parts = line.split(':');
    const target = parseInt(parts[0]);
    const operands = parts[1].trim().split(' ').map(x => parseInt(x));
    lines.push({ target, operands });
}

function getComboItr(itr: number, ops: number) {
    const result: number[] = [];

    for (let i = 0; i < ops; i++) {
        result.push(itr % 2);
        itr = Math.floor(itr / 2);
    }

    return result;
}

function calculate(operands: number[], operSpec: number[]) {
    let result = operands[0];

    for (let i = 1; i < operands.length; i++) {
        if (operSpec[i - 1] === 0) {
            result = result + operands[i];
        } else {
            result = result * operands[i];
        }
    }

    return result;
}

async function doIt() {
    console.log(lines);
    let result = 0;

    for (let line of lines) {
        const operCount = Math.pow(2, line.operands.length - 1);
        for (let i = 0; i < operCount; i++) {
            const operSpec = getComboItr(i, line.operands.length - 1);
            if (calculate(line.operands, operSpec) === line.target) {
                console.log(line);
                result += line.target;
                break;
            }
        }
    }
    console.log(result);

    // for (let i = 0; i < 8; i++){
    //     console.log(getComboItr(i, 3));
    // }
}

doIt();