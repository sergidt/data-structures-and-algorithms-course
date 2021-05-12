export class BinaryTreeNode<K = any> {
    left: BinaryTreeNode<K>;
    right: BinaryTreeNode<K>;
  
    constructor(public data: K) {}
  
    isLeaf():boolean {
        return !this.left && !this.right;
    }
    
      toString(): string {
          return this.data.toString();
      }
  }