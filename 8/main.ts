import fs from 'fs';

const allFileContents = fs.readFileSync('./8/input.txt', 'utf-8');
const lines = allFileContents.split(/\r?\n/);

type TreeLine = number[];
type TreeGrid = TreeLine[];

const grid: TreeGrid = lines.map(
    line => Array.from(line).map(n => parseInt(n, 10))
).filter(line => line.length > 0);

const isTreeVisible = (i: number, j: number): boolean => {
    if (i <= 0 || i >= grid.length - 1) return true;
    if (j <= 0 || j >= grid[i].length - 1) return true;
    const treeHeight = grid[i][j];
    const visibleFromLeft = grid[i].slice(0, j).every(h => h < treeHeight);
    const visibleFromRight = grid[i].slice(j + 1).every(h => h < treeHeight);
    const column = grid.map(line => line[j])
    const visibleFromTop = column.slice(0, i).every(h => h < treeHeight);
    const visibleFromBottom = column.slice(i + 1).every(h => h < treeHeight);
    return (
        visibleFromLeft ||
        visibleFromRight ||
        visibleFromTop ||
        visibleFromBottom
    )
}

let nbTreesVisible = 0;

for (let i = 0; i < grid.length; i++) {
    let output = ''
    for (let j = 0; j < grid[i].length; j++) {
        if (isTreeVisible(i, j)) {
            output += 'X';
            nbTreesVisible++;
        } else {
            output += '.'
        }
    }
    console.log(output)
}

console.log(nbTreesVisible);
