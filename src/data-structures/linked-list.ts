import { defaultEquals, EqualsFunction } from "./utils";

export class Node<T> {
  constructor(public element: T, public next?: Node<T>) {}
}

export class LinkedList<T> {
  protected _count = 0;
  protected _head: Node<T> | undefined;

  constructor(protected equalsFn: EqualsFunction<T> = defaultEquals) {}

  push(element: T) {
    const node = new Node(element);
    let current;

    if (!this._head) {
      // Empty linked list
      this._head = node;
    } else {
      // getting the last element in order to append the new element
      current = this._head;

      while (current.next != null) {
        current = current.next;
      }

      current.next = node;
    }
    this._count++;
  }

  getElementAt(index: number): Node<T> | undefined {
    if (index >= 0 && index <= this._count) {
      let node = this._head;
      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    return undefined;
  }

  insert(element: T, index: number): boolean {
    if (index >= 0 && index <= this._count) {
      const node = new Node(element);

      if (index === 0) {
        node.next = this._head;
        this._head = node;
      } else {
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this._count++;
      return true;
    }
    return false;
  }

  removeAt(index: number): T | undefined {
    if (index >= 0 && index < this._count) {
      let current = this._head;

      if (index === 0) {
        this._head = current.next;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this._count--;
      return current.element;
    }
    return undefined;
  }

  remove(element: T): T | undefined {
    return this.removeAt(this.indexOf(element));
  }

  indexOf(element: T): number {
    let current = this._head;

    for (let i = 0; i < this.size() && current != null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i;
      }
      current = current.next;
    }

    return -1;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  size(): number {
    return this._count;
  }

  get head(): Node<T> | undefined {
    return this._head;
  }

  clear() {
    this._head = undefined;
    this._count = 0;
  }

  toString(): string {
    const headStr = "head\n  ↓";

    if (this._head == null) {
      return headStr + "\n NULL";
    }

    const headElementStr = String(this._head.element);
    let objString = `${headStr}\n${headElementStr.padStart(
      4 - headElementStr.length,
      " "
    )}`;

    let current = this._head.next;

    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString} → ${current.element}`;
      current = current.next;
    }
    return objString + " → NULL";
  }
}

export function linkedListTest() {
  const l = new LinkedList<number>();
  console.log("Linked list:\n", l.toString());
  console.log("Linked list is empty?", l.isEmpty());

  console.log("Pushing value 1");
  l.push(1);

  console.log("Linked list:\n", l.toString());

  console.log("Pushing value 2");
  l.push(2);

  console.log("Pushing value 3");
  l.push(3);

  console.log("Linked list:\n", l.toString());

  console.log("inserting 4 at position 2, between 2 and 3");

  l.insert(4, 2);

  console.log("Linked list:\n", l.toString());

  console.log("removing 3");

  l.remove(3);

  console.log("Linked list:\n", l.toString());
}
