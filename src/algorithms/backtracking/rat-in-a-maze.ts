/*
 Rat in a maze 

    conditions: 
        1- Board is always squared
        2- Giving N as columns and rows length, solution is always placed 
           at Maze[N -1][N - 1]


Time Complexity: O(2^(n^2)). 
The recursion can run upper-bound 2^(n^2) times.
*/

export type Maze = Array<Array<number>>;
export type NotFound = 'NotFound';


export function ratInAMaze(maze: Array<Array<number>>): Maze | NotFound {
    const solution: Array<Array<number>> = [];

    for (let i = 0; i < maze.length; i++) {
        solution[i] = [];

        for (let j = 0; j < maze[i].length; j++)
            solution[i][j] = 0;
    }

    return findPath(maze, 0, 0, solution)
        ? solution
        : "NotFound";
}

function findPath(
    maze: Array<Array<number>>,
    x: number,
    y: number,
    solution: Array<Array<number>>
) {
    const n = maze.length;

    if (x === n - 1 && y === n - 1) {
        solution[x][y] = 1;
        return true;
    }

    if (isSafe(maze, x, y)) {
        solution[x][y] = 1;

        if (findPath(maze, x + 1, y, solution))
            return true;

        if (findPath(maze, x, y + 1, solution))
            return true;

        solution[x][y] = 0;

        return false;
    }

    return false;
}

function isSafe(maze: Array<Array<number>>, x: number, y: number) {
    const n = maze.length;
    return x < n && y < n && maze[x][y] !== 0;
}

function printMazeResult(maze: Maze | NotFound) {
    if (maze !== 'NotFound') {
 

        for (let i = 0; i < maze.length; i++) {
            let row = '';
            for (let j = 0; j < maze[i].length; j++) {
                row += maze[i][j] === 1 ? '•' : '■';
            }
            console.log(`%c${row}`, 'font-size: 40px; padding-top: 0; margin-top: 0; line-height: 18px');
        }
    } else
        console.log('Solution not found!!');
}

export function ratInAMazeTest() {
    const maze = [
        [1, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 1, 0],
        [0, 1, 1, 1]
    ];
    printMazeResult(ratInAMaze(maze));
}