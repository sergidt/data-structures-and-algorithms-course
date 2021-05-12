import { BinarySearchTree } from './binary-search-tree';
import { BinaryTreeNode } from './definitions';
import { Compare, CompareFunction, defaultCompare, printTree } from './utils';


enum BalanceFactor {
  UNBALANCED_RIGHT = 1,
  SLIGHTLY_UNBALANCED_RIGHT = 2,
  BALANCED = 3,
  SLIGHTLY_UNBALANCED_LEFT = 4,
  UNBALANCED_LEFT = 5
}

export default class AVLTree<T> extends BinarySearchTree<T> {

  constructor(protected compareFn: CompareFunction<T> = defaultCompare) {
    super(compareFn);
  }

  private getNodeHeight(node: BinaryTreeNode<T>): number {
    if (node == null) {
      return -1;
    }
    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
  }

  /**
   * Left left case: rotate right
   *
   *       b                           a
   *      / \                         / \
   *     a   e -> rotationLL(b) ->   c   b
   *    / \                             / \
   *   c   d                           d   e
   *
   * @param node Node<T>
   */
  private rotationLL(node: BinaryTreeNode<T>) {
    const tmp = node.left;
    node.left = tmp.right;
    tmp.right = node;
    return tmp;
  }

  /**
   * Right right case: rotate left
   *
   *     a                              b
   *    / \                            / \
   *   c   b   -> rotationRR(a) ->    a   e
   *      / \                        / \
   *     d   e                      c   d
   *
   * @param node Node<T>
   */
  private rotationRR(node: BinaryTreeNode<T>) {
    const tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;
    return tmp;
  }

  /**
   * Left right case: rotate left then right
   * @param node Node<T>
   */
  private rotationLR(node: BinaryTreeNode<T>) {
    node.left = this.rotationRR(node.left);
    return this.rotationLL(node);
  }

  /**
   * Right left case: rotate right then left
   * @param node Node<T>
   */
  private rotationRL(node: BinaryTreeNode<T>) {
    node.right = this.rotationLL(node.right);
    return this.rotationRR(node);
  }

  private getBalanceFactor(node: BinaryTreeNode<T>) {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  insert(data: T) {
    this._root = this.insertNode(this.root, data);
  }

  protected insertNode(node: BinaryTreeNode<T>, data: T) {
    if (node == null) {
      return new BinaryTreeNode(data);
    } else if (this.compareFn(data, node.data) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, data);
    } else if (this.compareFn(data, node.data) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, data);
    } else {
      return node; // duplicated key
    }

    // verify if tree is balanced
    const balanceState = this.getBalanceFactor(node);

    if (balanceState === BalanceFactor.UNBALANCED_LEFT) {
      if (this.compareFn(data, node.left.data) === Compare.LESS_THAN) {
        // Left left case
        node = this.rotationLL(node);
      } else {
        // Left right case
        return this.rotationLR(node);
      }
    }

    if (balanceState === BalanceFactor.UNBALANCED_RIGHT) {
      if (this.compareFn(data, node.right.data) === Compare.BIGGER_THAN) {
        // Right right case
        node = this.rotationRR(node);
      } else {
        // Right left case
        return this.rotationRL(node);
      }
    }

    return node;
  }

  protected removeNode(node: BinaryTreeNode<T>, key: T) {
    if (node == null) {
      return null;
    }

    if (this.compareFn(key, node.data) === Compare.LESS_THAN) {
      // The key to be deleted is in the left sub-tree
      node.left = this.removeNode(node.left, key);
    } else if (this.compareFn(key, node.data) === Compare.BIGGER_THAN) {
      // The key to be deleted is in the right sub-tree
      node.right = this.removeNode(node.right, key);
    } else {
      // node is the node to be deleted
      if (node.left == null && node.right == null) {
        node = null;
      } else if (node.left == null && node.right != null) {
        node = node.right;
      } else if (node.left != null && node.right == null) {
        node = node.left;
      } else {
        // node has 2 children, get the in-order successor
        const inOrderSuccessor = this.minNode(node.right);
        node.data = inOrderSuccessor.data;
        node.right = this.removeNode(node.right, inOrderSuccessor.data);
      }
    }

    if (node == null) {
      return node;
    }

    // verify if tree is balanced
    const balanceState = this.getBalanceFactor(node);

    if (balanceState === BalanceFactor.UNBALANCED_LEFT) {
      // Left left case
      if (
        this.getBalanceFactor(node.left) === BalanceFactor.BALANCED ||
        this.getBalanceFactor(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return this.rotationLL(node);
      }
      // Left right case
      if (this.getBalanceFactor(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.rotationLR(node.left);
      }
    }

    if (balanceState === BalanceFactor.UNBALANCED_RIGHT) {
      // Right right case
      if (
        this.getBalanceFactor(node.right) === BalanceFactor.BALANCED ||
        this.getBalanceFactor(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return this.rotationRR(node);
      }
      // Right left case
      if (this.getBalanceFactor(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotationRL(node.right);
      }
    }

    return node;
  }
}

export function avlTreeTest() {
    const tree: AVLTree<number> = new AVLTree<number>();
  
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tree.insert(6);
    tree.insert(7);
    tree.insert(14);
    tree.insert(15);
    tree.insert(13);
    tree.insert(12);
    tree.insert(11);
    printTree(tree.root);
  }
  