import fs, { cpSync } from 'fs';

const allFileContents = fs.readFileSync('./10/input.txt', 'utf-8');
const lines = allFileContents.split(/\r?\n/);

let X = 1;
let nbPassedCycles = 0;
let totalSignalStrength = 0;

const increment = (command: string) => {
    if ([20, 60, 100, 140, 180, 220].includes(nbPassedCycles)) {
        totalSignalStrength += nbPassedCycles * X;
        console.log(`adding ${nbPassedCycles * X} at cycle ${nbPassedCycles} with command ${command}`)
    }

}

lines.forEach(line => {
    if (!line) return;
    if (line.includes('noop')) {
        nbPassedCycles++;
        increment('noop');
    } else {
        const [command, inc] = line.split(' ');
        if (command !== 'addx') throw new Error('unknown command');
        nbPassedCycles++;
        increment('addx 1st');
        nbPassedCycles++;
        increment('addx 2nd');
        X += parseInt(inc, 10);
    }
})

console.log(totalSignalStrength)
