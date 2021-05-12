import { BinaryTreeNode } from "./definitions";
import { printTree } from "./utils";

export class BinaryTree<T> {
  protected _root: BinaryTreeNode<T>;

  get root() {
    return this._root;
  }

  insert(data: T) {
    if (!this._root) this._root = new BinaryTreeNode(data);
    else this.insertNode(this._root, data);
  }

  protected insertNode(node: BinaryTreeNode<T>, data: T) {
    if (!node.left) node.left = new BinaryTreeNode(data);
    else if (!node.right) node.right = new BinaryTreeNode(data);
    else this.insertNode(node.left, data);
  }

  inOrderTraverse() {
      const nodes = [];

    this.inOrderTraverseNode(this._root, nodes);
    console.log('In Order Traverse:', nodes.map((_: BinaryTreeNode) => _.toString()).join(','));
  }

  protected inOrderTraverseNode(node: BinaryTreeNode<T>, nodes: Array<BinaryTreeNode>) {
    if (node != null) {
      this.inOrderTraverseNode(node.left, nodes);
      nodes.push(node);
      this.inOrderTraverseNode(node.right, nodes);
    }
  }

  preOrderTraverse() {
    const nodes = [];
 
    this.preOrderTraverseNode(this._root, nodes);
    console.log('Pre Order Traverse:', nodes.map((_: BinaryTreeNode) => _.toString()).join(','));
}

  protected preOrderTraverseNode(node: BinaryTreeNode<T>, nodes: Array<BinaryTreeNode>) {
    if (node != null) {
        nodes.push(node);
      this.preOrderTraverseNode(node.left, nodes);
      this.preOrderTraverseNode(node.right, nodes);
    }
  }

  postOrderTraverse() {
    const nodes = [];
 
    this.postOrderTraverseNode(this._root, nodes);
    console.log('Post Order Traverse:', nodes.map((_: BinaryTreeNode) => _.toString()).join(','));
}

  protected postOrderTraverseNode(node: BinaryTreeNode<T>, nodes: Array<BinaryTreeNode>) {
    if (node != null) {
      this.postOrderTraverseNode(node.left, nodes);
      this.postOrderTraverseNode(node.right, nodes);
      nodes.push(node);
    }
  }

  levelOrderTraverse() {
    const visited: Set<string> = new Set();
    const queue: Array<BinaryTreeNode<T>> = [this._root];
    const order = [this._root];
    while (queue.length > 0) {
        // take first element from queued items
        const node = queue.shift();

        // its edges
        const destinations: Array<BinaryTreeNode<T>> = [
            ...(node.left ? [node.left] : []),
            ...(node.right ? [node.right] : []),
        ];
        // treatment for every single edge
        destinations.forEach(v => {
            order.push(v);
            if (!visited.has(v.toString())) {
                visited.add(v.toString());
                queue.push(v);
            }
        });
        }
        console.log('Level Order Traverse:', order.map((_: BinaryTreeNode) => _.toString()).join(','));
}
}




export function binaryTreeTest() {
  const tree: BinaryTree<string> = new BinaryTree<string>();

  tree.insert("ROOT");
  tree.insert("A");
  tree.insert("B");
  tree.insert("C");
  tree.insert("D");
  tree.insert("E");
  printTree(tree.root);
  console.log(tree);

  tree.inOrderTraverse();
  tree.preOrderTraverse();
  tree.postOrderTraverse();
  tree.levelOrderTraverse();
}
