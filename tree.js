import Node from "./node.js";

export default class Tree {
    // init block

    #root
    constructor(array = []) {
        this.#root = this.#buildTree(array);
    };

    get rootnode() {
        return this.#root;
    }

    // public interfaces

    insert(value, reference = this.#root) {
        if(reference.data === value) return false;
        
        if(value > reference.value) {
            if(reference.rightChild) this.insert(value, reference.rightChild);
            else { 
                reference.rightChild = new Node(value);
                return true;
            };
        } else if(value < reference.value) {
            if(reference.leftChild) this.insert(value, reference.leftChild);
            else {
                reference.leftChild = new Node(value);
                return true;
            };
        };
    };

    deleteItem(value, reference = this.#root) {
        if(!reference) return reference;
        
        const findReplacement = (node) => {
            node = node.rightChild;
            while(node && node.leftChild) node = node.leftChild;
            return node;
        };

        if(value > reference.data) {
            reference.rightChild = this.deleteItem(value, reference.rightChild);
        } else if(value < reference.data) {
            reference.leftChild = this.deleteItem(value, reference.leftChild);
        } else {
            if(reference.leftChild === null) return reference.rightChild;
            if(reference.rightChild === null) return reference.leftChild;
            if(reference.leftChild && reference.rightChild) {
                let successor = findReplacement(reference);
                reference.data = successor.data;
                reference.rightChild = this.deleteItem(successor.data, reference.rightChild);
            };
        };

        return reference;
    };

    find(value, reference = this.#root) {
        if(!reference) return reference;
        else if(reference.data > value) return this.find(value, reference.leftChild);
        else if(reference.data < value) return this.find(value, reference.rightChild);
        else return reference;
    };

    levelOrder(fn, workingQueue = [this.#root]) {
        if(!fn) throw new Error("callback required for levelOrder()");
        if(workingQueue.length === 0) return null;
        let reference = workingQueue.shift();
        if(reference.leftChild) workingQueue.push(reference.leftChild);
        if(reference.rightChild) workingQueue.push(reference.rightChild);
        fn(reference);
        return this.levelOrder(fn, workingQueue);
    };



    // private interfaces

    #buildTree(array) {
        const buildBranch = (array, startIndex, endIndex) => {
            if(startIndex > endIndex) return null;
            let midpoint = startIndex + Math.floor((endIndex - startIndex) / 2);
            let root = new Node(array[midpoint]);
            root.leftChild = buildBranch(array, startIndex, midpoint - 1);
            root.rightChild = buildBranch(array, midpoint + 1, endIndex);

            return root;
        };

        let sortedArray = [... new Set(this.#mergeSort(array))];

        return buildBranch(sortedArray, 0, sortedArray.length - 1);
    };

    #mergeSort(array) {
        if(array.length <= 1) return array;
        let halfway = Math.floor(array.length / 2);
        const merge = (left, right) => {    
            const result = [];
            while(left.length && right.length) {
                if(left[0] <= right[0]) result.push(left.shift());
                else result.push(right.shift());
            }
            if(left.length) return result.concat(left)
            else return result.concat(right);
        };
        return merge(
            this.#mergeSort(array.slice(0,halfway)), 
            this.#mergeSort(array.slice(halfway))
        );
    }
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

tree.levelOrder(thing => {
    console.log(thing.data);
})

prettyPrint(tree.rootnode);