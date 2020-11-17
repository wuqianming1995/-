/**
 *  二叉树
 */

 

class BinaryTree {
    root = null;

    // 前序遍历
    preOrder() {
        if (this.root) {
            this.root.preOrder();
        } else {
            console.log('二叉树空, 无法遍历');
        }
    }

    // 中序遍历
    inOrder() {
        if (this.root) {
            this.root.inOrder();
        } else {
            console.log('二叉树空, 无法遍历');
        }
    }

    // 后序遍历
    postOrder() {
        if (this.root) {
            this.root.postOrder();
        } else {
            console.log('二叉树空, 无法遍历');
        }
    }

    // 前序查找
    preOrderSearch(data) {
        if (this.root != null) {
            return this.root.preOrderSearch(data);
        } else {
            return null;
        }
    }

    // 中序查找
    inOrderSearch(data) {
        if (this.root != null) {
            return this.root.inOrderSearch(data);
        } else {
            return null;
        }
    }

    // 后序查找
    postOrderSearch(data) {
        if (this.root != null) {
            return this.root.postOrderSearch(data);
        } else {
            return null;
        }
    }

    // 简单删除
    delNode(data) {
        if (this.root) {
            if (this.root.data === data) {
                this.root = null;
            } else {
                this.root.delNode(data);
            }
        }
    }
}


class Node {
    left = null;
    right = null;
    constructor(data) {
        this.data = data;
    }

    // 前序遍历
    preOrder() {
        console.log(this.data);

        if (this.left != null) {
            this.left.preOrder();
        }

        if (this.right != null) {
            this.right.preOrder();
        }
    }

    // 中序遍历
    inOrder() {
        if (this.left != null) {
            this.left.inOrder();
        }

        console.log(this.data);

        if (this.right != null) {
            this.right.inOrder();
        }
    }

    // 后序遍历
    postOrder() {

        if (this.left != null) {
            this.left.postOrder();
        }

        if (this.right != null) {
            this.right.postOrder();
        }

        console.log(this.data);
    }

    // 前序查找
    preOrderSearch(data) {
        console.log(`前序查找, 当前结点为: ${this.data}`);
        if (this.data === data) {
            return this;
        }

        // 左递归
        let resNode = null;
        if (this.left != null) {
            resNode = this.left.preOrderSearch(data);
        }
        if (resNode != null) {
            return resNode;
        }

        // 右递归
        if (this.right != null) {
            resNode = this.right.preOrderSearch(data);
        }

        return resNode;
    }

    // 中序查找
    inOrderSearch(data) {
        // 左递归
        let resNode = null;
        if (this.left != null) {
            resNode = this.left.inOrderSearch(data);
        }
        if (resNode != null) {
            return resNode;
        }

        console.log(`中序查找, 当前结点为: ${this.data}`);
        if (this.data === data) {
            return this;
        }

        // 右递归
        if (this.right != null) {
            resNode = this.right.inOrderSearch(data);
        }

        return resNode;
    }

    // 后序查找
    postOrderSearch(data) {
        // 左递归
        let resNode = null;
        if (this.left != null) {
            resNode = this.left.postOrderSearch(data);
        }
        if (resNode != null) {
            return resNode;
        }

        // 右递归
        if (this.right != null) {
            resNode = this.right.postOrderSearch(data);
        }
        if (resNode != null) {
            return resNode;
        }

        console.log(`后序查找, 当前结点为: ${this.data}`);
        if (this.data === data) {
            return this;
        }

        return resNode;
    }

    // 简单删除（叶子结点删除叶子结点, 非叶子结点删除子树）
    // 找到被删除结点的父结点
    delNode(data) {
        if (this.left && this.left.data === data) {
            this.left = null;
            return;
        }

        if (this.right && this.right.data === data) {
            this.right = null;
            return;
        }

        // 左递归
        if (this.left) {
            this.left.delNode(data);
        }

        // 右递归
        if (this.right) {
            this.right.delNode(data);
        }


    }
}

function init() {
    let node1 = new Node(1);
    let node2 = new Node(2);
    let node3 = new Node(3);
    let node4 = new Node(4);
    let node5 = new Node(5);

    node1.left = node2;
    node1.right = node3;
    node3.left = node5;
    node3.right = node4;

    let binaryTree = new BinaryTree();
    binaryTree.root = node1;

    return binaryTree;
}

let binaryTree = init();

// 遍历
// binaryTree.preOrder();    // 1 2 3 5 4
// binaryTree.inOrder();  // 2 1 5 3 4
// binaryTree.postOrder();     //  2 5 4 3 1 

// 查找
// let resNode = binaryTree.preOrderSearch(5);
// let resNode = binaryTree.inOrderSearch(5);
// let resNode = binaryTree.postOrderSearch(5);
// console.log(resNode.data);

// 删除
// binaryTree.delNode(5);
// binaryTree.delNode(3);
// binaryTree.preOrder();