export class Queue<T = any> {
    private _items: Array<T> = [];

    enqueue(element: T) {
        this._items = [element, ...this._items];
    }

    dequeue(): T {
        return this._items.shift();
    }

    peek(): T {
        return this.isEmpty()
            ? undefined
            : this._items[0];
    }

    isEmpty(): boolean {
        return !this._items.length;
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

export function queueTest() {
    const q = new Queue<number>();

    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    q.enqueue(4);
    console.log(q.items());

    console.log(q.dequeue());
    console.log(q.items());

    console.log(q.dequeue());
    console.log(q.items());

    q.enqueue(5);
    console.log(q.items());
}
