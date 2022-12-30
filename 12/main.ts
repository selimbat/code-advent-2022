import fs from 'fs';

const allFileContents = fs.readFileSync('./12/input.txt', 'utf-8');
const lines = allFileContents.split(/\r?\n/);

type HeightGrid = number[][]
type Move = [1, 0] | [-1, 0] | [0, 1] | [0, -1];
type Tile = {
    height: number,
    possibleMoves: Move[],
    distance: number,
}
type Grid = Tile[][]
const heightGrid: HeightGrid = []
let startingPos: [number, number] = [0, 0]
let destinationPos: [number, number] = [0, 0]


lines.forEach((line, i) => {
    if (!line) return;
    heightGrid.push([]);
    for (let j = 0; j < line.length; j++) {
        if (line[j] === 'S') {
            startingPos = [i, j];
            heightGrid[i][j] = 0;
            continue;
        }
        if (line[j] === 'E') {
            destinationPos = [i, j];
            heightGrid[i][j] = 25;
            continue;
        }
        heightGrid[i][j] = line.charCodeAt(j) - 97;
    }
});

const grid: Grid = heightGrid.map(row => row.map(tile => ({ height: tile, possibleMoves: [], distance: Number.MAX_SAFE_INTEGER })));
console.log(`grid size ixj: ${grid.length}x${grid[0].length}`)
grid.forEach((row, i) => {
    row.forEach((tile, j) => {
        if (j + 1 < row.length && row[j + 1].height <= tile.height + 1) {
            tile.possibleMoves.push([0, 1]);
        }
        if (j > 0 && row[j - 1].height <= tile.height + 1) {
            tile.possibleMoves.push([0, -1]);
        }
        if (i + 1 < grid.length && grid[i + 1][j].height <= tile.height + 1) {
            tile.possibleMoves.push([1, 0]);
        }
        if (i > 0 && grid[i - 1][j].height <= tile.height + 1) {
            tile.possibleMoves.push([-1, 0]);
        }
    });
});

grid[startingPos[0]][startingPos[1]].distance = 0;

const queue: [number, number][] = [startingPos]
const visited: Set<`${number}:${number}`> = new Set([startingPos.join(':') as `${number}:${number}`]);
while (queue.length > 0) {
    const currentTileCoords = queue.shift()!;
    const currentTile = grid[currentTileCoords[0]][currentTileCoords[1]];
    if (currentTileCoords[0] === destinationPos[0] && currentTileCoords[1] === destinationPos[1]) {
        console.log('Found destination');
        break;
    }
    currentTile.possibleMoves.forEach(move => {
        const possibleNextTileCoords = [currentTileCoords[0] + move[0], currentTileCoords[1] + move[1]] as [number, number];
        if (visited.has(possibleNextTileCoords.join(':') as `${number}:${number}`)) {
            return;
        }
        const possibleNextTile = grid[possibleNextTileCoords[0]][possibleNextTileCoords[1]];
        possibleNextTile.distance = currentTile.distance + 1;
        visited.add(possibleNextTileCoords.join(':') as `${number}:${number}`);
        queue.push(possibleNextTileCoords);
    })
}

console.log(heightGrid.map(row => row.join(' ')))
console.log("==================")
console.log(`Distance to destination is: ${grid[destinationPos[0]][destinationPos[1]].distance}`)
