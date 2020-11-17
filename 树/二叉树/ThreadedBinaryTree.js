/**
 *  线索化二叉树
 */

class ThreadedBinaryTree {
    root;
    pre = null;

    // 中序线索化
    threadedNodes(node) {
        if (!node) {
            return;
        }

        this.threadedNodes(node.left);

        // 前驱
        if (!node.left) {
            node.left = this.pre;
            node.leftType = 1;
        }

        // 后继
        if (this.pre && !this.pre.right) {
            this.pre.right = node;
            this.pre.rightType = 1;
        }

        this.pre = node;

        this.threadedNodes(node.right);
    }


    // 遍历中序线索二叉树
    threadedList() {
        let node = this.root;

        while (node) {

            while (node.leftType === 0) {
                node = node.left;
            }

            console.log(node.data);


            while (node.rightType === 1) {
                node = node.right;
                console.log(node.data);
            }

            node = node.right;
        }
    }

}


class Node {
    left = null;
    right = null;
    leftType = 0;
    rightType = 0;

    constructor(data) {
        this.data = data;
    }
}


let root = new Node(1);
let node2 = new Node(3);
let node3 = new Node(6);
let node4 = new Node(8);
let node5 = new Node(10);
let node6 = new Node(14); 

root.left = node2;
root.right = node3;
node2.left = node4;
node2.right = node5;
node3.left = node6;

let threadedBinaryTree = new ThreadedBinaryTree();
threadedBinaryTree.root = root;

threadedBinaryTree.threadedNodes(threadedBinaryTree.root);
// console.log(node5.left.data);
// console.log(node5.right.data);

threadedBinaryTree.threadedList();