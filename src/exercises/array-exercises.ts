/**
 * Rotación cíclica
 *
 * dado un array de cualquier tipo, hacer un algoritmo que cada vez que lo ejecutemos,
 * rote el array una posición hacia la izquierda, ejemplo:
 *      ['c', 'a', 's', 't', 'l', 'e'] => ['a', 's', 't', 'l', 'e', 'c']
 */

// O(N)
function rotate<T>(array: Array<T>): string {
    let x = array[0];

    for (let i = 0; i < array.length - 1; i++) {
        array[i] = array[i + 1];
    }

    array[array.length - 1] = x;

    return array.join('');
}

// O(1)
export function rotate2<T>(array: Array<T>): Array<T> {
    return array.slice(1).concat(array[0]);
}

// criptomonedas

function cryptoIsProfitable(values: Array<Array<number>>) {
    const t0 = performance.now();
    let times = 0;

    const allValues = values.flat();

    console.log('values:', allValues);

    const firstElementLEThanLast = allValues[0] <= allValues[allValues.length - 1];

    if (firstElementLEThanLast) {
        let i = 0;
        while (i <= allValues.length - 4) {
            if (allValues[i] <= allValues[i + 1] && allValues[i + 1] <= allValues[i + 2] && allValues[i + 2] <= allValues[i + 3]) {
                times++;
                i += 4;
            } else {
                i++;
            }
        }

        const t1 = performance.now();
        
        console.log('time (cryptoIsProfitable): ', t1 - t0, ' ms');
        console.log('how many patterns?', times);
    }

    return times >= 2;
}

const getLast12HoursCryptoValues = () =>
    Array.from({ length: 12 }, () =>
        Array.from({ length: 12 }, () =>
            Number((Math.random() * (30 - 20) + 20).toFixed(2))
        )
    );

export function arrayExercises() {
    console.log('castle rotated => ', rotate(['c', 'a', 's', 't', 'l', 'e']));
    // console.log("rotate2", rotate2(["c", "a", "s", "t", "l", "e"]));

    const values = getLast12HoursCryptoValues();

    console.log('Crypto is profitable?', cryptoIsProfitable(values));
}
