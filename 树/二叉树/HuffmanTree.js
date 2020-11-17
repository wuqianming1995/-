/**
 *  赫夫曼树
 */

class HuffmanTree {

    createHuffmanTree(arr) {
        arr = arr.map(value => new Node(value));

        while (arr.length > 1) {
            arr.sort((a, b) => a.value - b.value);
            // 每一轮的变化
            console.log(...(arr.map(node => node.value)));

            let leftNode = arr[0];
            let rightNode = arr[1];

            let parent = new Node(leftNode.value + rightNode.value);
            parent.left = leftNode;
            parent.right = rightNode;

            arr.shift();
            arr.shift();
            arr.push(parent);
        }

        return arr[0];
    }

    preOrder(node) {
        if (node == null) {
            return;
        }
        console.log(node.value);
        this.preOrder(node.left);
        this.preOrder(node.right);
    }
}


class Node {
    left = null;
    right = null;

    constructor(value) {
        this.value = value;
    }
}


let arr = [13, 7, 8, 3, 29, 6, 1];
let huffmanTree = new HuffmanTree();

let root = huffmanTree.createHuffmanTree(arr);
console.log('前序遍历....');
huffmanTree.preOrder(root);  