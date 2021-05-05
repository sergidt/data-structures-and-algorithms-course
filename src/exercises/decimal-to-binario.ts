import { Queue } from '../data-structures/queue';

export function decimalToBinary(decNumber: number, base: number) {
    const queue = new Queue();
    let rem: number;

    while (decNumber > 0) {
        rem = Math.floor(decNumber % base);
        queue.enqueue(rem);
        decNumber = Math.floor(decNumber / base);
    }

    return queue.items().join('');
}

export function queueExercises() {
    const decimalNumber = 1024;

    console.log(`Number ${ decimalNumber } to binary: ${ decimalToBinary(decimalNumber, 2) }`);
}
