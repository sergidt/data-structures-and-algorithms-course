class DeQueue<T = any>{
    private _items: Array<T> = [];


    addFront(element: T) {
            this._items = [element, ...this._items];
    }

    addBack(element: T) {
        this._items.push(element);
}

    removeFront(): T {
        return  this._items.shift();
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

    q.addBack(1);
    q.addFront(2);
    q.addBack(3);
    q.addFront(4);
    console.log(q.items());

   console.log(q.peekBack());

   console.log(q.removeFront());
   console.log(q.items());
}