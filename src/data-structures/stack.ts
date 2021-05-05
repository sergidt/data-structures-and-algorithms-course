console.clear();

////////////// UTILS ////////////////////

function time(f: (...params) => any, params: any) {
    let steps = 0;
    const init = new Date();
    f(params, steps);
    const end = new Date();

    console.log(`${ f.name } execution time: ${ end.getTime() - init.getTime() } ms`);
}

export class Stack<T = any> {
    private _items: Array<T> = [];

    constructor(private _length: number = 5) {
    }

    push(element: T) {
        this._items = [...this._items, element].slice(-this._length);
    }

    pop(): T {
        return this._items.pop();
    }

    peek(): T {
        return this._items[this._items.length - 1];
    }

    isEmpty(): boolean {
        return this._items.length === 0;
    }

    clear() {
        this._items = [];
    }

    items(): Array<T> {
        return [...this._items];
    }
}

export function stackTest() {
    const stack = new Stack<number>();

    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.push(4);
    stack.push(5);

    console.log(stack.items());

    console.log(stack.peek());

    console.log(stack.pop());

    console.log(stack.items());
}
