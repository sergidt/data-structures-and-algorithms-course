import { DeQueue } from '../data-structures/dequeue';
import { Stack } from '../data-structures/stack';

export function expressionChecker(symbols: string) {
    const stack = new Stack<string>(100);
    const opens = '([{';
    const closers = ')]}';
    let expressionValid = true;

    for (let symbol of symbols) {
        if ([...opens, ...closers].includes(symbol))
            stack.push(symbol);
    }
    console.log(stack.items());

    const queue = new DeQueue<string>(stack.items());

    do {
        const front = queue.removeFront();
        const rear = queue.removeBack();

        expressionValid = opens.indexOf(front) === closers.indexOf(rear);
    } while (!queue.isEmpty() && expressionValid);

    return expressionValid && queue.isEmpty();
}

export function dequeueExercises() {
    const expression = `(3*2) - (1 + 3)`;

    console.log(`Is ${ expression } correct? ${ expressionChecker(expression) }`);
}
