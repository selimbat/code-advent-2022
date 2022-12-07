import fs from 'fs';

const allFileContents = fs.readFileSync('./5/input.txt', 'utf-8');

const lines = allFileContents.split(/\r?\n/);

const initialStacksStr = lines.slice(0, 8);
const moveOrdersStr = lines.slice(10);

type StackIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const stacks: Record<StackIndex, string[]> = {
    1: [] as string[],
    2: [] as string[],
    3: [] as string[],
    4: [] as string[],
    5: [] as string[],
    6: [] as string[],
    7: [] as string[],
    8: [] as string[],
    9: [] as string[],
};

initialStacksStr.forEach(stackLine => {
    Object.keys(stacks).forEach(stackIndexStr => {
        const stackIndex = parseInt(stackIndexStr, 10) as StackIndex;
        const crate = stackLine.substring(4 * stackIndex - 3, 4 * stackIndex - 2);
        if (crate !== ' ') {
            stacks[stackIndex].unshift(crate);
        }
    })
})

type MoveOrder = {
    from: StackIndex,
    to: StackIndex,
    number: number,
};
const moveOrders: MoveOrder[] = [];
moveOrdersStr.forEach(orderStr => {
    const [nb, from, to] = orderStr.replace('move ', '').replace(' from ', ';').replace(' to ', ';').split(';')
    moveOrders.push({
        from: parseInt(from, 10) as StackIndex,
        to: parseInt(to, 10) as StackIndex,
        number: parseInt(nb, 10),
    });
})

moveOrders.forEach(order => {
    let nbCratesToMove = order.number;
    while (nbCratesToMove > 0 && stacks[order.from].length > 0) {
        stacks[order.to].push(stacks[order.from].pop()!);
        nbCratesToMove--;
    }
})

console.log(stacks)
console.log(Object.values(stacks).map(stack => stack.at(-1)).join(''))
