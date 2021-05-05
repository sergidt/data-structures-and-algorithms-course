export class DeQueue<T = any> {
    private _items: Array<T> = [];

    constructor(items: Array<T> = []) {
        this._items = items;
    }

    addFront(element: T) {
        this._items = [element, ...this._items];
    }

    addBack(element: T) {
        this._items.push(element);
    }

    removeFront(): T {
        return this._items.shift();
    }

    removeBack(): T {
        return this._items.pop();
    }

    peekFront(): T {
        return this.isEmpty()
            ? undefined
            : this._items[0];
    }

    peekBack(): T {
        return this.isEmpty()
            ? undefined
            : this._items[this._items.length - 1];
    }

    isEmpty(): boolean {
        return this._items.length === 0;
    }

    size(): number {
        return this._items.length;
    }

    clear() {
        this._items = [];
    }

    items(): Array<T> {
        return this._items;
    }
}

export function dequeueTest() {
    const q = new DeQueue<number>();
    console.log('DEQUEUE\n---------------------------');

    console.log('Add 1 to back');
    q.addBack(1);

    console.log('Add 2 to front');
    q.addFront(2);

    console.log('Add 3 to back');
    q.addBack(3);

    console.log('Add 4 to front');
    q.addFront(4);

    console.log('items:');
    console.log(q.items());

    console.log('Peek back', q.peekBack());

    console.log('Remove front', q.removeFront());

    console.log('items:');
    console.log(q.items());
}
