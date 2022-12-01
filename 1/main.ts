import fs from 'fs';

const allFileContents = fs.readFileSync('./1/input.txt', 'utf-8');

let elvesWithMaxCal: { elf: number, calories: number }[] = [];

let currentElf = 0;
let currentElfCalories = 0;

allFileContents.split(/\r?\n/).forEach((line, i) => {
    if (!line) {
        // end of elf inventory
        if (elvesWithMaxCal.length === 0
            || currentElfCalories >= elvesWithMaxCal[0].calories) {
            elvesWithMaxCal.push({
                elf: currentElf,
                calories: currentElfCalories,
            });
            if (elvesWithMaxCal.length > 3) {
                elvesWithMaxCal.shift();
            }
            elvesWithMaxCal.sort((a, b) => a.calories - b.calories)
        }
        currentElf += 1;
        currentElfCalories = 0;
        return;
    }
    // listing elf inventory
    currentElfCalories += parseInt(line, 10);
});
console.log(`The elves with the max calories are ${elvesWithMaxCal.map(e => e.elf)} with each having ${elvesWithMaxCal.map(e => e.calories)} calories, for a total of ${elvesWithMaxCal.reduce((acc, v) => acc + v.calories, 0)}.`);
