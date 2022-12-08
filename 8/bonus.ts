import fs from 'fs';

const allFileContents = fs.readFileSync('./8/input.txt', 'utf-8');
const lines = allFileContents.split(/\r?\n/);

type TreeLine = number[];
type TreeGrid = TreeLine[];

const grid: TreeGrid = lines.map(
    line => Array.from(line).map(n => parseInt(n, 10))
).filter(line => line.length > 0);

const getScenicScore = (i: number, j: number): number => {
    if (i <= 0 || i >= grid.length - 1) return 0;
    if (j <= 0 || j >= grid[i].length - 1) return 0;
    const treeHeight = grid[i][j];

    let blockingTreeRight = grid[i].slice(j + 1).findIndex(h => h >= treeHeight)
    const viewDistanceRight = blockingTreeRight === -1 ? grid[i].length - (j + 1) : blockingTreeRight + 1;

    let blockingTreeLeft = grid[i].slice(0, j).reverse().findIndex(h => h >= treeHeight)
    const viewDistanceLeft = blockingTreeLeft === -1 ? j : blockingTreeLeft + 1;

    const column = grid.map(line => line[j])

    let blockingTreeTop = column.slice(0, i).reverse().findIndex(h => h >= treeHeight)
    const viewDistanceTop = blockingTreeTop === -1 ? i : blockingTreeTop + 1;

    let blockingTreeBottom = column.slice(i + 1).findIndex(h => h >= treeHeight)
    const viewDistanceBottom = blockingTreeBottom === -1 ? column.length - (i + 1) : blockingTreeBottom + 1;

    return (
        viewDistanceLeft *
        viewDistanceRight *
        viewDistanceTop *
        viewDistanceBottom
    )

}


let maxScore = 0;
for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        const score = getScenicScore(i, j);
        if (score >= maxScore) {
            maxScore = score;
        }
    }
}

console.log(maxScore);
