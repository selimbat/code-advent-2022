import fs from 'fs';

const allFileContents = fs.readFileSync('./4/input.txt', 'utf-8');

let total = 0;

const rangeFullyIncludesAnother = (start1: number, end1: number, start2: number, end2: number): boolean => {
    return start1 >= start2 && end1 <= end2;
}

allFileContents.split(/\r?\n/).forEach((line) => {
    if (!line) {
        return;
    }
    if (line.indexOf(',') === -1) {
        console.error('Invalid input');
        return;
    }
    const [range1, range2] = line.split(',');
    const [start1, end1] = range1.split('-').map(str => parseInt(str, 10));
    const [start2, end2] = range2.split('-').map(str => parseInt(str, 10));

    if (end1 < start1 || end2 < start2) console.log('invalid input')

    if (
        rangeFullyIncludesAnother(start1, end1, start2, end2) ||
        rangeFullyIncludesAnother(start2, end2, start1, end1)
    ) {
        total++;
    }

});

console.log(total);
