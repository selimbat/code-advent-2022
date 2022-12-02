import fs from 'fs';

const allFileContents = fs.readFileSync('./2/input.txt', 'utf-8');

const positiveModulo3 = (n: number) => ((n % 3) + 3) % 3 as 0 | 1 | 2

const oppenentInputToNumbers = (move: string): 0 | 1 | 2 => {
    if (move === 'A') return 0;
    if (move === 'B') return 1;
    if (move === 'C') return 2;
    throw new Error('Invalid game moves.');
}
const expectedOutcomeToNumbers = (move: string): -1 | 0 | 1 => {
    if (move === 'X') return -1;
    if (move === 'Y') return 0;
    if (move === 'Z') return 1;
    throw new Error('Invalid expected outcome.');
}

const getGameOutcome = (oppMove: 0 | 1 | 2, myMove: 0 | 1 | 2): 0 | 1 | 2 => {
    return positiveModulo3(positiveModulo3(myMove - oppMove) + 1);
}
const getMyMove = (oppMove: 0 | 1 | 2, expectedOutcome: -1 | 0 | 1): 0 | 1 | 2 => {
    return positiveModulo3(oppMove + expectedOutcome);
}

const getGameScore = (oppMove: 0 | 1 | 2, expectedOutcome: -1 | 0 | 1) => {
    const myMove = getMyMove(oppMove, expectedOutcome);
    return (expectedOutcome + 1) * 3 + myMove + 1;
}

let score = 0;
allFileContents.split(/\r?\n/).forEach((line) => {
    if (line.length === 0) return;
    const [opponentMove, expectedOutcome] = line.split(' ');
    score +=
        getGameScore(
            oppenentInputToNumbers(opponentMove),
            expectedOutcomeToNumbers(expectedOutcome)
        )
});
console.log(`Total score is ${score}`)
