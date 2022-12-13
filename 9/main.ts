import fs, { cpSync } from 'fs';

const allFileContents = fs.readFileSync('./9/input.txt', 'utf-8');
const lines = allFileContents.split(/\r?\n/);

type Pos = {
  x: number,
  y: number,
}
type Move = 'U' | 'R' | 'D' | 'L';

const posToStr = ({ x, y }: Pos) => `${x}:${y}`;

const headPos: Pos = { x: 0, y: 0 };
const tailPos: Pos = { x: 0, y: 0 };

const updateHead = (move: Move) => {
  switch (move) {
    case 'U':
      headPos.y += 1;
      break;
    case 'R':
      headPos.x += 1;
      break;
    case 'D':
      headPos.y -= 1;
      break;
    case 'L':
      headPos.x -= 1;
      break;
  }
}

const updateTail = () => {
  const posDiff: Pos = {
    x: headPos.x - tailPos.x,
    y: headPos.y - tailPos.y,
  };

  if (
    posDiff.x !== 0 &&
    posDiff.y !== 0 &&
    (Math.abs(posDiff.x) > 1 || Math.abs(posDiff.y) > 1)
  ) {
    // diagnal
    tailPos.x += Math.sign(posDiff.x) * Math.min(Math.abs(posDiff.x), 1);
    tailPos.y += Math.sign(posDiff.y) * Math.min(Math.abs(posDiff.y), 1);
    return;
  }
  if (posDiff.x === 0 && Math.abs(posDiff.y) > 1) {
    // vertical
    tailPos.y += Math.sign(posDiff.y);
    return;
  }
  if (posDiff.y === 0 && Math.abs(posDiff.x) > 1) {
    // horizontal
    tailPos.x += Math.sign(posDiff.x);
  }
}

const visitedTiles: Set<string> = new Set();
const registerTile = () => {
  visitedTiles.add(posToStr(tailPos));
}

const logGrid = () => {
  console.log('----------')
  for (let j = 0; j < 5; j++) {
    let line = '';
    for (let i = 0; i < 6; i++) {
      let charToPrint = '.';
      if (0 === i && 0 === j) {
        charToPrint = 's';
      }
      if (tailPos.x === i && tailPos.y === j) {
        charToPrint = 'T';
      }
      if (headPos.x === i && headPos.y === j) {
        charToPrint = 'H';
      }
      line += charToPrint;
    }
    console.log(line);
  }
}

const frameUpdate = (move: Move) => {
  updateHead(move);
  updateTail();
  //logGrid()
  registerTile();
}

lines.forEach(line => {
  if (!line) return;

  const [dir, nbMoves] = line.split(' ');
  let remainingMoves = parseInt(nbMoves, 10);
  if (!['U', 'R', 'D', 'L'].includes(dir)) {
    throw new Error('Unknown move')
  }
  //console.log(`move ${line}`)
  while (remainingMoves > 0) {
    frameUpdate(dir as Move);
    remainingMoves--;
  }
})

console.log(visitedTiles.size);
