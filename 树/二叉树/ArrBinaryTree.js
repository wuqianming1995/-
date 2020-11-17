/**
 * 顺序存储二叉树
 */


class ArrBinaryTree {

    constructor(arr) {
        this.arr = arr;
    }

    // 前序遍历
    preOrder(i) {

        if (!this.arr || this.arr.length === 0) {
            return;
        }

        console.log(this.arr[i]);

        // 左递归
        if (2 * i + 1 < this.arr.length) {
            this.preOrder(2 * i + 1);
        }

        // 右递归
        if (2 * i + 2 < this.arr.length) {
            this.preOrder(2 * i + 2);
        }

    }

    // 中序、后序只需要调整一下console.log()的位置
}


let arrBinaryTree = new ArrBinaryTree([1, 2, 3, 4, 5, 6, 7]);

arrBinaryTree.preOrder(0); 
