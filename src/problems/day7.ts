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
        result.push(itr % 3);
        itr = Math.floor(itr / 3);
    }

    return result;
}

function calculate(operands: number[], operSpec: number[]) {
    let result = operands[0];
    let log: string[] = [result.toString()];

    for (let i = 1; i < operands.length; i++) {
        if (operSpec[i - 1] === 0) {
            result = result + operands[i];
            log.push('+');
            log.push(operands[i].toString());
        } else if (operSpec[i - 1] === 1) {
            result = result * operands[i];
            log.push('*');
            log.push(operands[i].toString());
        } else {
            result = concatNumbers(result, operands[i]);
            log.push('concat');
            log.push(operands[i].toString());
        }
    }

    //console.log(log.join(' '));
    return result;
}

function concatNumbers(num1: number, num2: number) {
    const mul = Math.floor(Math.log10(num2) + 1);
    return num1 * Math.pow(10, mul) + num2;
}

async function doIt() {
    await processFile('./input/day7.txt', processLine);
    let result = 0;

    for (let line of lines) {
        const operCount = Math.pow(3, line.operands.length - 1);
        for (let i = 0; i < operCount; i++) {
            const operSpec = getComboItr(i, line.operands.length - 1);
            if (calculate(line.operands, operSpec) === line.target) {
                //console.log(line);
                result += line.target;
                break;
            }
        }
    }
    console.log(result);

    // for (let i = 0; i < 27; i++) {
    //     console.log(getComboItr(i, 3));
    // }
}

doIt();