import { BinaryTree } from "./binary-tree";
import { BinaryTreeNode } from "./definitions";
import { Compare, CompareFunction, defaultCompare, printTree } from "./utils";

export class BinarySearchTree<T> extends BinaryTree<T> {
  protected _root: BinaryTreeNode<T>;

  constructor(protected compareFn: CompareFunction<T> = defaultCompare) {
      super();
  }

  get root() {
    return this._root;
  }

  insert(data: T) {
    if (!this._root) 
    this._root = new BinaryTreeNode(data);
    else 
    this.insertNode(this._root, data);
  }

  protected insertNode(node: BinaryTreeNode<T>, data: T) {
    if (this.compareFn(data, node.data) === Compare.LESS_THAN) {
      if (!node.left) {
        node.left = new BinaryTreeNode(data);
      } else {
        this.insertNode(node.left, data);
      }
    } else if (!node.right) {
      node.right = new BinaryTreeNode(data);
    } else {
      this.insertNode(node.right, data);
    }
  }

  search(data: T, node: BinaryTreeNode<T> = this._root): boolean {
    if (!node) {
      return false;
    }

    if (this.compareFn(data, node.data) === Compare.LESS_THAN) {
      return this.search(data, node.left);
    } else if (this.compareFn(data, node.data) === Compare.BIGGER_THAN) {
      return this.search(data, node.right);
    }
    // key is equal to node.item
    return true;
  }


  min() {
    return this.minNode(this.root);
  }

  protected minNode(node: BinaryTreeNode<T>) {
    let current = node;
    while (current != null && current.left != null) {
      current = current.left;
    }
    return current;
  }

  max() {
    return this.maxNode(this.root);
  }

  protected maxNode(node: BinaryTreeNode<T>) {
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current;
  }

  remove(key: T) {
    this._root = this.removeNode(this.root, key);
  }

  protected removeNode(node: BinaryTreeNode<T>, data: T) {
    if (!node) {
      return null;
    }

    if (this.compareFn(data, node.data) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (this.compareFn(data, node.data) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      // key is equal to node.item

      // handle 3 special conditions
      // 1 - a leaf node
      // 2 - a node with only 1 child
      // 3 - a node with 2 children

      // case 1
      if (node.left == null && node.right == null) {
        node = null;
        return node;
      }

      // case 2
      if (node.left == null) {
        node = node.right;
        return node;
      } else if (node.right == null) {
        node = node.left;
        return node;
      }

      // case 3
      const aux = this.minNode(node.right);
      node.data = aux.data;
      node.right = this.removeNode(node.right, aux.data);
      return node;
    }
  }
}

export function binarySearchTreeTest() {
  const tree: BinarySearchTree<number> = new BinarySearchTree<number>();

  tree.insert(8);
  tree.insert(3);
  tree.insert(10);
  tree.insert(1);
  tree.insert(6);
  tree.insert(14);
  tree.insert(4);
  tree.insert(7);
  tree.insert(13);
  printTree(tree.root);
}
