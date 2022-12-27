import fs from 'fs';

const allFileContents = fs.readFileSync('./11/input.txt', 'utf-8');
const lines = allFileContents.split(/\r?\n/);

type Monkey = {
    id: number;
    items: number[];
    operation: (old: number) => number;
    divider: number;
    truthyMonkey: Monkey['id'];
    falsyMonkey: Monkey['id'];
}

const monkeys: Monkey[] = [];

let i = 0;
while (i < lines.length) {
    let line = lines[i];
    const currentMonkey: Partial<Monkey> = {}
    while (line) {
        if (line.startsWith('Monkey')) {
            currentMonkey.id = parseInt(line.match(/\d+/)?.at(0) ?? '', 10);
        } else if (line.startsWith('  Starting items')) {
            currentMonkey.items = line.match(/\d+/g)?.map(itemStr => parseInt(itemStr, 10)) ?? [];
        } else if (line.startsWith('  Operation')) {
            const [, exp] = line.split('= ');
            const [left, operator, right] = exp.split(' ');
            if (left !== 'old') throw new Error('unexpected left hand operand')
            switch (operator) {
                case '+':
                    currentMonkey.operation = (old) => old + (right === 'old' ? old : parseInt(right, 10));
                    break;
                case '-':
                    currentMonkey.operation = (old) => old - (right === 'old' ? old : parseInt(right, 10));
                    break;
                case '*':
                    currentMonkey.operation = (old) => old * (right === 'old' ? old : parseInt(right, 10));
                    break;
            }
        } else if (line.startsWith('  Test')) {
            const divider = parseInt(line.match(/\d+/)?.at(0) ?? '', 10);
            if (!divider) throw new Error('Unable to parse divider');
            currentMonkey.divider = divider;
        } else if (line.startsWith('    If true')) {
            const monkeyId = parseInt(line.match(/\d+/)?.at(0) ?? '', 10);
            if (monkeyId == null) throw new Error('Unable to parse truthy money id');
            currentMonkey.truthyMonkey = monkeyId;
        } else if (line.startsWith('    If false')) {
            const monkeyId = parseInt(line.match(/\d+/)?.at(0) ?? '', 10);
            if (monkeyId == null) throw new Error('Unable to parse falsy money id');
            currentMonkey.falsyMonkey = monkeyId;
        }
        i++;
        line = lines[i];
    }
    monkeys.push(currentMonkey as Monkey);
    i++;
    line = lines[i];
}

console.log(monkeys);
const allDividers = monkeys.reduce((agg, curr) => agg * curr.divider, 1)


const monkeyActivity: { [monkeyId: number]: number } = {};
monkeys.forEach(m => {
    monkeyActivity[m.id] = 0;
});

for (let round = 1; round <= 10000; round++) {
    console.log(`========== ROUND ${round} =========`)
    monkeys.forEach(m => {
        m.items.forEach(item => {
            const newItem = m.operation(item) % allDividers;
            if (newItem % m.divider === 0) {
                const truthyMonkey = monkeys.find(other => other.id === m.truthyMonkey);
                if (!truthyMonkey) throw new Error('Invalid truthy monkey id');
                truthyMonkey.items.push(newItem);
            } else {
                const falsyMonkey = monkeys.find(other => other.id === m.falsyMonkey);
                if (!falsyMonkey) throw new Error('Invalid falsy monkey id');
                falsyMonkey.items.push(newItem);
            }
        })
        monkeyActivity[m.id] += m.items.length;
        m.items = [];
    })
}
console.log(monkeys)
console.log(monkeyActivity);
console.log(`Monkey business is: ${Object.values(monkeyActivity).sort((a, b) => b - a).slice(0, 2).reduce((agg, curr) => agg * curr, 1)}`);


