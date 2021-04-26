import { LinkedList } from "./linked-list";
import { defaultEquals, EqualsFunction } from "./utils";


export class DoublyNode<T> {
    constructor(
      public element: T,
      public next?: DoublyNode<T>,
      public prev?: DoublyNode<T>
    ) {
    }
  }

export class DoubleLinkedList<T> extends LinkedList<T> {
    protected _head: DoublyNode<T> | undefined;
    protected _tail: DoublyNode<T> | undefined;

  constructor(protected equalsFn: EqualsFunction<T> = defaultEquals) {
    super(equalsFn);
  }

  push(element: T) {
    const node = new DoublyNode(element);

    if (!this._head) {
      // Empty linked list
      this._head = node;
      this._tail = node; // NEW
    } else {
      // getting the last element in order to append the new element
      // attach to the tail node // NEW
      this._tail.next = node;
      node.prev = this._tail;
      this._tail = node;
    }
    this._count++;
  }

  getElementAt(index: number): DoublyNode<T> | undefined {
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
        const node = new DoublyNode(element);
        let current = this.head;
  
        if (index === 0) {
          if (this.head == null) {
            this._head = node;
            this._tail = node;
          } else {
            node.next = this.head;
            this.head.prev = node; 
            this._head = node;
          }
        } else if (index === this._count) {
          current = this._tail; 
          current.next = node;
          node.prev = current;
          this._tail = node;
        } else {
          const previous = this.getElementAt(index - 1);
          current = previous.next;
          node.next = current;
          previous.next = node;
          current.prev = node; 
          node.prev = previous; 
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
          this._head = this.head.next; 
          // if there is only one item, then we update tail as well //NEW
          if (this._count === 1) {
            // {2}
            this._tail = undefined;
          } else {
            this._head.prev = undefined; 
          }
        } else if (index === this._count - 1) {
          // last item //NEW
          current = this._tail; // {4}
          this._tail = current.prev;
          this._tail.next = undefined;
        } else {
          current = this.getElementAt(index);
          const previous = current.prev;
          // link previous with current's next - skip it to remove
          previous.next = current.next; 
          current.next.prev = previous; 
        }
        this._count--;
        return current.element;
      }
      return undefined;
  }


  indexOf(element: T): number {
    let current = this._head;
    let index = 0;

    while (current != null) {
      if (this.equalsFn(element, current.element)) {
        return index;
      }
      index++;
      current = current.next;
    }

    return -1;
  }

  
  getTail() {
    return this._tail;
  }

  get head(): DoublyNode<T> | undefined {
    return this._head;
  }

  clear() {
    super.clear();
    this._tail = undefined;
  }
}

export function doubleLinkedListTest() {
  const l = new DoubleLinkedList<number>();

  console.log("Double Linked list is empty?", l.isEmpty());

  console.log("Pushing value 1");
  l.push(1);


  console.log("Pushing value 2");
  l.push(2);

  console.log("Pushing value 3");
  l.push(3);


  console.log("inserting 4 at position 2, between 2 and 3");

  l.insert(4, 2);


  console.log("removing 3");

  l.remove(3);

}
