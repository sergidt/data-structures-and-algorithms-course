/**
 * Rotación cíclica
 *
 * dado un array de cualquier tipo, hacer un algoritmo que cada vez que lo ejecutemos,
 * rote el array una posición hacia la izquierda, ejemplo:
 *      ['c', 'a', 's', 't', 'l', 'e'] => ['a', 's', 't', 'l', 'e', 'c']
 */

function rotate<T>(array: Array<T>): Array<T> {
  // O(N)
  let x = array[0];

  for (let i = 0; i < array.length - 1; i++) {
    array[i] = array[i + 1];
  }

  array[array.length - 1] = x;

  return array;
}

export function rotate2<T>(array: Array<T>): Array<T> {
  // O(1) {
  return array.slice(1).concat(array[0]);
}

const getLast12HoursCryptoValues = () =>
  Array.from({ length: 12 }, () =>
    Array.from({ length: 12 }, () =>
      Number((Math.random() * (30 - 20) + 20).toFixed(2))
    )
  );

function matrix(values: Array<Array<number>>) {
  const t0 = performance.now();
  let times = 0;

  for (let hour of values) {
    let i = 0;
    while (i <= hour.length - 4) {
      if (
        hour[i] <= hour[i + 1] &&
        hour[i + 1] <= hour[i + 2] &&
        hour[i + 2] <= hour[i + 3]
      ) {
        times++;
        i += 4;
      } else {
        i++;
      }
    }

    // demasiado complejo
  }

  console.log("how many times?", times);
  const t1 = performance.now();
  console.log("time (matrix): ", t1 - t0, " ms");
}

function cryptoIsProfitable(values: Array<Array<number>>) {
  const t0 = performance.now();
  let times = 0;

  const allValues = values.flat();

  if (allValues[0] <= allValues[allValues.length - 1]) {
    let i = 0;
    while (i <= allValues.length - 4) {
      if (
        allValues[i] <= allValues[i + 1] &&
        allValues[i + 1] <= allValues[i + 2] &&
        allValues[i + 2] <= allValues[i + 3]
      ) {
        times++;
        i += 4;
      } else {
        i++;
      }
    }

    const t1 = performance.now();
    console.log("time (matrix2): ", t1 - t0, " ms");

    return times > 2;
  }
  return false;
}

export function arrayExercises() {
  console.log("rotate", rotate(["c", "a", "s", "t", "l", "e"]));
  console.log("rotate2", rotate2(["c", "a", "s", "t", "l", "e"]));

  const values = getLast12HoursCryptoValues();

  matrix(values);
  console.log("Crypto is profitable?", cryptoIsProfitable(values));
}
