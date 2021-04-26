class Stack<T = any> {
    private _items: Array<T> = [];
    private _pointer: number = 0;

    constructor(private _length: number = 5) {
    }

    /**
     * It pushes a new element and updates the pointer to the last position
     */
    push(element: T) {
        this._items = [...this._items, element].slice(-this._length);
        this._pointer = this._items.length - 1;
    }

    pop(): T {
        const item = this._items.pop();
        this._pointer = Math.min(this._pointer, this._items.length - 1);
        return item;
    }

    current(): T {
        return this._pointer < 0 
        ? undefined 
        : this._items[this._pointer];
    }

    undo(): T {
        this._pointer = Math.max(this._pointer - 1, -1);
        return this.current();
    }

    redo(): T {
        this._pointer = Math.min(this._pointer - 1, this._items.length - 1);
        return this.current();
    }

    isEmpty(): boolean {
        return this._items.length === 0;
    }

    clear() {
        this._items = [];
        this._pointer = -1;
    }

    items(): Array<T> {
        return [...this._items];
    }
}
