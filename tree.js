export default class Tree() {
    #root;
    constructor(array = []) {
        let sortedArray = [... new Set(mergeSort(array))];
    };

    buildTree() {

    }
}

function mergeSort(array) {
    if(array.length <= 1) return array;
    let halfway = Math.floor(array.length / 2);
    let firstHalf = array.slice(0,halfway);
    let secondHalf = array.slice(halfway);
    return merge(mergeSort(firstHalf), mergeSort(secondHalf));
}

function merge(left, right) {
    const result = [];
    while(left.length && right.length) {
        if(left[0] <= right[0]) result.push(left.shift());
        else result.push(right.shift());
    }
    if(left.length) return result.concat(left)
    else return result.concat(right);
}