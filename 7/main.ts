import fs from 'fs';

const allFileContents = fs.readFileSync('./7/input.txt', 'utf-8');

const lines = allFileContents.split(/\r?\n/);

type FileT = {
    name: string;
    size: number;
}

type Directory = {
    name: string;
    parent: Directory | null;
    directories: Directory[]
    files: FileT[]
}

const rootDir: Directory = {
    name: '/',
    parent: null,
    directories: [],
    files: [],
}

let currentDir: Directory;

const changeDir = (targetDirName: string) => {
    if (targetDirName === '/') {
        currentDir = rootDir;
        return;
    }
    if (targetDirName === '..') {
        if (!currentDir.parent) {
            throw new Error(`No parent dir for directory ${currentDir.name}`);
        }
        currentDir = currentDir.parent;
        return;
    }
    const targetDir = currentDir.directories.find(d => d.name === targetDirName);
    if (!targetDir) {
        throw new Error(`No directory named ${targetDirName} in ${currentDir.name}.`)
    }
    currentDir = targetDir
}

let listingDirContent = false;
lines.forEach(line => {
    if (line[0] === '$') {
        const [, command, targetDirName] = line.split(' ');
        listingDirContent = command === 'ls';
        if (command === 'cd') {
            changeDir(targetDirName);
        }
        return;
    }
    if (!listingDirContent) {
        throw new Error('Not a command and not listing a directory content. Idk what this is.')
    }
    const [dirOrSize, name] = line.split(' ');
    if (dirOrSize === 'dir') {
        currentDir.directories.push({
            name,
            parent: currentDir,
            directories: [],
            files: [],
        })
    } else {
        currentDir.files.push({
            name,
            size: parseInt(dirOrSize, 10),
        })
    }
})


const getSmallDirectoriesTotalSise = () => {
    let result = 0;
    const getDirSize = (dir: Directory): number => {
        const dirSize = dir.files.reduce((acc, curr) => acc + curr.size, 0) +
            dir.directories.reduce((acc, curr) => acc + getDirSize(curr), 0);
        if (dirSize <= 100000) {
            result += dirSize;
        }
        return dirSize;
    }
    getDirSize(rootDir);
    return result;
}

console.log(getSmallDirectoriesTotalSise());
