import fs from 'fs';

const allFileContents = fs.readFileSync('./1/input.txt', 'utf-8');

let maxCalories = 0;
let elfWithMaxCal = -1;

let currentElf = 0;
let currentElfCalories = 0;

allFileContents.split(/\r?\n/).forEach((line, i) => {
    if (!line) {
        console.log(`elf ${currentElf} end at line ${i + 1}`);
        // end of elf inventory
        if (currentElfCalories >= maxCalories) {
            elfWithMaxCal = currentElf;
            maxCalories = currentElfCalories;
        }
        currentElf += 1;
        currentElfCalories = 0;
        return;
    }
    // listing elf inventory
    currentElfCalories += parseInt(line, 10);
});

console.log(`The elf with the max calories is ${elfWithMaxCal} with a total of ${maxCalories} calories.`);
