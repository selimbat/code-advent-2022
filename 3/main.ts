import fs from 'fs';

const allFileContents = fs.readFileSync('./3/input.txt', 'utf-8');

let overallPriority = 0;

allFileContents.split(/\r?\n/).forEach((line) => {
    if (!line) {
        return;
    }
    if (line.length % 2 === 1) {
        console.error('Invalid rucksack');
        return;
    }
    const comp1 = new Set(line.substring(0, line.length / 2));
    const comp2 = new Set(line.substring(line.length / 2));
    const commonItems = new Set([...comp1, ...comp2].filter(item => comp1.has(item) && comp2.has(item)));
    if (commonItems.size !== 1) {
        console.error('Invalid items in rucksack ' + commonItems.size)
        return;
    }
    const commonItem = [...commonItems][0];

    let priority;
    if (commonItem === commonItem.toLowerCase()) {
        priority = commonItem.charCodeAt(0) - 96;
    } else {
        priority = commonItem.charCodeAt(0) - 38;
    }
    overallPriority += priority;
});

console.log(overallPriority);
