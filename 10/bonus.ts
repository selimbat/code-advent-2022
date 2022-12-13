import fs, { cpSync } from 'fs';

const allFileContents = fs.readFileSync('./10/input.txt', 'utf-8');
const lines = allFileContents.split(/\r?\n/);

let X = 1;
let nbPassedCycles = 0;

const positiveModulo40 = (n: number) => ((n % 40) + 40) % 40;

let currentLineOutput = '';
const increment = () => {
    const currentPixel = positiveModulo40(nbPassedCycles - 1);
    currentLineOutput += Math.abs(currentPixel - X) <= 1 ? '# ' : '. ';
    if (nbPassedCycles % 40 === 0) {
        console.log(currentLineOutput);
        currentLineOutput = '';
    }

}

lines.forEach(line => {
    if (!line) return;
    if (line.includes('noop')) {
        nbPassedCycles++;
        increment();
    } else {
        const [command, inc] = line.split(' ');
        if (command !== 'addx') throw new Error('unknown command');
        nbPassedCycles++;
        increment();
        nbPassedCycles++;
        increment();
        X += parseInt(inc, 10);
    }
})
