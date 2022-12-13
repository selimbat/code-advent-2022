import fs, { cpSync } from 'fs';

const allFileContents = fs.readFileSync('./9/input.txt', 'utf-8');
const lines = allFileContents.split(/\r?\n/);

type Pos = {
    x: number,
    y: number,
}
type Move = 'U' | 'R' | 'D' | 'L';

const posToStr = ({ x, y }: Pos) => `${x}:${y}`;

type Knot = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const rope: Record<Knot, Pos> = {
    0: { x: 0, y: 0 },
    1: { x: 0, y: 0 },
    2: { x: 0, y: 0 },
    3: { x: 0, y: 0 },
    4: { x: 0, y: 0 },
    5: { x: 0, y: 0 },
    6: { x: 0, y: 0 },
    7: { x: 0, y: 0 },
    8: { x: 0, y: 0 },
    9: { x: 0, y: 0 },
}

const updateHead = (move: Move) => {
    switch (move) {
        case 'U':
            rope[0].y += 1;
            break;
        case 'R':
            rope[0].x += 1;
            break;
        case 'D':
            rope[0].y -= 1;
            break;
        case 'L':
            rope[0].x -= 1;
            break;
    }
}

const updateKnot = (knot: Exclude<Knot, 0>) => {
    const posDiff: Pos = {
        x: rope[knot - 1 as Knot].x - rope[knot].x,
        y: rope[knot - 1 as Knot].y - rope[knot].y,
    };

    if (
        posDiff.x !== 0 &&
        posDiff.y !== 0 &&
        (Math.abs(posDiff.x) > 1 || Math.abs(posDiff.y) > 1)
    ) {
        // diagnal
        rope[knot].x += Math.sign(posDiff.x) * Math.min(Math.abs(posDiff.x), 1);
        rope[knot].y += Math.sign(posDiff.y) * Math.min(Math.abs(posDiff.y), 1);
        return;
    }
    if (posDiff.x === 0 && Math.abs(posDiff.y) > 1) {
        // vertical
        rope[knot].y += Math.sign(posDiff.y);
        return;
    }
    if (posDiff.y === 0 && Math.abs(posDiff.x) > 1) {
        // horizontal
        rope[knot].x += Math.sign(posDiff.x);
    }
}

const visitedTiles: Set<string> = new Set();
const registerTile = () => {
    visitedTiles.add(posToStr(rope[9]));
}

const frameUpdate = (move: Move) => {
    updateHead(move);
    for (let knot = 1; knot < 10; knot++) {
        updateKnot(knot as Exclude<Knot, 0>);
    }
    registerTile();
}

lines.forEach(line => {
    if (!line) return;

    const [dir, nbMoves] = line.split(' ');
    let remainingMoves = parseInt(nbMoves, 10);
    if (!['U', 'R', 'D', 'L'].includes(dir)) {
        throw new Error('Unknown move')
    }
    while (remainingMoves > 0) {
        frameUpdate(dir as Move);
        remainingMoves--;
    }
})

console.log(visitedTiles.size);
