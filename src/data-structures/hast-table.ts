import { defaultToString } from "./utils";

export class ValuePair<K, V> {
  constructor(public key: K, public value: V) {}

  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}

export default class HashTable<K, V> {
  protected _table: { [key: string]: ValuePair<K, V> };

  constructor(protected toStrFn: (key: K) => string = defaultToString) {
    this._table = {};
  }

  private loseHashCode(key: K) {
    if (typeof key === "number") {
      return key;
    }
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    return hash % 37;
  }

  /* private strongHashCode(key: K) {
    const tableKey = this.toStrFn(key);
    let hash = 5381;
    for (let i = 0; i < tableKey.length; i++) {
      hash = (hash * 33) + tableKey.charCodeAt(i);
    }
    return hash % 1013;
  } */

  hashCode(key: K) {
    return this.loseHashCode(key);
  }

  put(key: K, value: V) {
    if (!!key && !!value) {
      const position = this.hashCode(key);
      this._table[position] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  get(key: K) {
    const valuePair = this._table[this.hashCode(key)];
    return valuePair ? valuePair.value : undefined;
  }

  remove(key: K) {
    const hash = this.hashCode(key);
    const valuePair = this._table[hash];
    if (!!valuePair) {
      delete this._table[hash];
      return true;
    }
    return false;
  }

  getTable() {
    return this._table;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return Object.keys(this._table).length;
  }

  clear() {
    this._table = {};
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    const keys = Object.keys(this._table);
    let objString = `{${keys[0]} => ${this._table[keys[0]].toString()}}`;
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this._table[
        keys[i]
      ].toString()}}`;
    }
    return objString;
  }
}

interface User {
    id: number;
    name: string;
    city: string;
}

export function hastTableTest() {

    const table = new HashTable<number, User>();
const user1: User = {
    id: 1,
    name: 'sergi',
    city: 'Barcelona'
};

const user2: User = {
    id: 2,
    name: 'john',
    city: 'NY'
};

const user3: User = {
    id: 3,
    name: 'Mary',
    city: 'LA'
};

    console.log('Putting', user1);
    table.put(user1.id, user1);

    console.log('Putting', user2);
    table.put(user2.id, user2);

    console.log('Putting', user3);
    table.put(user3.id, user3);

    console.log('Hash table\n--------------------------');
    console.log(table.toString());

}