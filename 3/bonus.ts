import fs from 'fs';

const allFileContents = fs.readFileSync('./3/input.txt', 'utf-8');

let overallPriority = 0;

const lines = allFileContents.split(/\r?\n/);
for (let i = 0; i < lines.length; i += 3) {
    if (!lines[i]) continue;
    const elf1 = new Set(lines[i]);
    const elf2 = new Set(lines[i + 1]);
    const elf3 = new Set(lines[i + 2]);

    const commonItems = new Set([...elf1, ...elf2, ...elf3].filter(
        item =>
            elf1.has(item) && elf2.has(item) && elf3.has(item)
    ));
    if (commonItems.size !== 1) {
        console.error('Invalid items in rucksack ' + commonItems.size)
        console.log(i)
        continue;
    }
    const commonItem = [...commonItems][0];

    let priority;
    if (commonItem === commonItem.toLowerCase()) {
        priority = commonItem.charCodeAt(0) - 96;
    } else {
        priority = commonItem.charCodeAt(0) - 38;
    }
    overallPriority += priority;

}

console.log(overallPriority);
