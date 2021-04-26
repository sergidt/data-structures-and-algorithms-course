const union = <T>(setA: Set<T>, setB: Set<T>): Set<T> => new Set<T>([...setA, ...setB]);

const intersection = <T>(setA: Set<T>, setB: Set<T>): Set<T> => new Set<T>([...setA].filter(x => setB.has(x)));

const difference = <T>(setA: Set<T>, setB: Set<T>): Set<T> => new Set<T>([...setA].filter(x => !setB.has(x)));

const xor = <T>(setA: Set<T>, setB: Set<T>): Set<T> => new Set<T>([...setA].filter(x => !setB.has(x)).concat([...setB].filter(x => !setA.has(x))));

const subset = <T>(setA: Set<T>, setB: Set<T>): boolean => ([...setA].every(x => !setB.has(x)));


export function setTest() {
    const setA = new Set([1,2,3,4]);
    const setB = new Set([3,4,5,6]);

 console.log('union', union(setA, setB));
 console.log('intersection', intersection(setA, setB));
 console.log('difference', difference(setA, setB));
 console.log('A is subset of B?', subset(setA, setB));
 console.log('A is subset of B?', xor(setA, setB));
}