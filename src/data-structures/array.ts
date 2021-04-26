console.clear();

////////////// UTILS ////////////////////

function time(f: (...params) => any, ...rest: any) {
    const init = new Date();
    f.apply(this, rest);
    const end = new Date();

    console.log(`${f.name} execution time: ${end.getTime() - init.getTime()} ms`);
}


const LENGTH =20000;

const numbers = Array.from({ length: LENGTH }, () => Math.round(Math.random() * LENGTH));


/********************************************************
 * SORTING ALGORITHMS
 ********************************************************/

// Bubble sort

function bubbleSort(arr: Array<number>) {
    for (let i = 0; i < arr.length; i++) {

        // Last i elements are already in place  
        for (let j = 0; j < (arr.length - i - 1); j++) {

            // Checking if the item at present iteration 
            // is greater than the next iteration
            if (arr[j] > arr[j + 1]) {

                // If the condition is true then swap them
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}


// Merge sort

function merge(left, right) {
    let sorted = [];

    while (left.length && right.length) {
        if (left[0] < right[0]) sorted.push(left.shift());
        else sorted.push(right.shift());
    };
    return [...sorted, ...left, ...right];

}

function mergeSort(unsortedArray) {
    // No need to sort the array if the array only has one element or empty
    if (unsortedArray.length <= 1) {
        return unsortedArray;
    }
    // In order to divide the array in half, we need to figure out the middle
    const middle = Math.floor(unsortedArray.length / 2);

    // This is where we will be dividing the array into left and right
    const left = unsortedArray.slice(0, middle);
    const right = unsortedArray.slice(middle);

    // Using recursion to combine the left and right
    return merge(
        mergeSort(left), mergeSort(right)
    );
}




/********************************************************
 * SEARCH ALGORITHMS
 ********************************************************/

// Sequential search

function sequentialSearch(array, num) {
    let found = false;
    for (const i of array) {
        if (i === num) {
            found = true;
            break;
        }
    }

    console.log(num, found ? ' FOUND!!' : ' NOT FOUND!!');
}


// Binary search

function binarySearch(arr, x, start, end) {

    // Base Condition
    if (start > end) return false;

    // Find the middle index
    const mid = Math.floor((start + end) / 2);
 
    // Compare mid with given key x
    if (arr[mid] === x) {
        return true;
    }
    // If element at mid is greater than x,
    // search in the left half of mid
    if (arr[mid] > x) {
        return binarySearch(arr, x, start, mid - 1);
    }
    else {

        // If element at mid is smaller than x,
        // search in the right half of mid
        return binarySearch(arr, x, mid + 1, end);
    }
}


export function arrayTest() {
    time(bubbleSort, numbers);
    time(mergeSort, numbers);
    const num = numbers[LENGTH - 500];
    time(sequentialSearch, numbers, num);

    const nums = mergeSort(numbers);
    const init = new Date();
    console.log('NUM', num, '\n----------------------------');
    console.log('binarySearch found?', binarySearch(nums, num, 0, LENGTH - 1));
    const end = new Date();

    console.log(`${end.getTime() - init.getTime()} ms`);
}