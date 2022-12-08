import fs from 'fs';

const allFileContents = fs.readFileSync('./6/input.txt', 'utf-8');

const lastFourElements: string[] = []

let foundMarker = false;

Array.from(allFileContents).forEach((e, i) => {
    if (foundMarker) return;
    while (lastFourElements.length >= 14) {
        lastFourElements.shift();
    }
    lastFourElements.push(e);
    const lastFourElementsSet = new Set(lastFourElements);
    if (lastFourElementsSet.size === 14) {
        foundMarker = true;
        console.log(i + 1);
    }
})
