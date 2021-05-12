import { BinaryTreeNode } from "./definitions";

export type CompareFunction<T> = (a: T, b: T) => number;

export type EqualsFunction<T> = (a: T, b: T) => boolean;

export type DiffFunction<T> = (a: T, b: T) => number;

export const DOES_NOT_EXIST = -1;

export enum Compare {
  LESS_THAN = -1,
  BIGGER_THAN = 1,
  EQUALS = 0,
}

export function lesserEquals<T>(a: T, b: T, compareFn: CompareFunction<T>) {
  const comp = compareFn(a, b);
  return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}

export function biggerEquals<T>(a: T, b: T, compareFn: CompareFunction<T>) {
  const comp = compareFn(a, b);
  return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS;
}

export function defaultCompare<T>(a: T, b: T): number {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

export function defaultEquals<T>(a: T, b: T): boolean {
  return a === b;
}

export function defaultToString(item: any): string {
  if (item === null) {
    return "NULL";
  } else if (item === undefined) {
    return "UNDEFINED";
  } else if (typeof item === "string" || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}

export function swap(array: any[], a: number, b: number) {
  [array[a], array[b]] = [array[b], array[a]];
}

export function reverseCompare<T>(
  compareFn: CompareFunction<T>
): CompareFunction<T> {
  return (a, b) => compareFn(b, a);
}

export function defaultDiff<T>(a: T, b: T): number {
  return Number(a) - Number(b);
}



/**
   * It draws the tree structure using a bfs algorithm
   */
 export function printTree(root: BinaryTreeNode) {
  let lines: Array<Array<string>> = [];
  let level: Array<BinaryTreeNode> = [];
  let next: Array<BinaryTreeNode> = [];

  level.push(root);
  let nn = 1;

  let widest = 0;

  while (nn != 0) {
    const line: Array<string> = [];

    nn = 0;

    for (const n of level) {
      if (n == null) {
        line.push(null);

        next.push(null);
        next.push(null);
      } else {
        const data = n.toString();
        line.push(data);

        if (data.length > widest) widest = data.length;

        next.push(n.left);
        next.push(n.right);

        if (!!n.left) nn++;
        if (!!n.right) nn++;
      }
    }

    if (widest % 2 == 1) widest++;

    lines.push(line);

    const tmp = level;
    level = next;
    next = tmp;
    next = [];
  }

  let perpiece = lines[lines.length - 1].length * (widest + 4);
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const hpw = Math.floor(perpiece / 2) - 1;
    let str = "";
    if (i > 0) {
      for (let j = 0; j < line.length; j++) {
        // split node
        let c = " ";
        if (j % 2 == 1) {
          if (line[j - 1] != null) {
            c = line[j] != null ? "┴" : "┘";
          } else {
            if (j < line.length && line[j] != null) c = "└";
          }
        }
        str += c;

        // lines and spaces
        if (line[j] == null) {
          for (let k = 0; k < perpiece - 1; k++) {
            str += " ";
          }
        } else {
          for (let k = 0; k < hpw; k++) {
            str += j % 2 == 0 ? " " : "─";
          }
          str += j % 2 == 0 ? "┌" : "┐";
          for (let k = 0; k < hpw; k++) {
            str += j % 2 == 0 ? "─" : " ";
          }
        }
      }
      console.log(str);
    }

    let strNodes = "";

    // print line of numbers
    for (let j = 0; j < line.length; j++) {
    
      let f = line[j];
      
      if (!f) 
          f = "";
      
      let gap1 = Math.ceil(perpiece / 2 - f.length / 2);
      let gap2 = Math.floor(perpiece / 2 - f.length / 2);

      // a number
      for (let k = 0; k < gap1; k++) {
          strNodes += " ";
      }
      strNodes += f;

      for (let k = 0; k < gap2; k++) {
          strNodes += " ";
      }
    }
    console.log(strNodes);

    perpiece /= 2;
  }
}