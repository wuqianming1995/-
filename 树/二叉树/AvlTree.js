/**
 *  平衡二叉树（AVL树）
 */


class AvlTree {

    root = null;

    // 添加结点
    add(node) {
        if (!this.root) {
            this.root = node;
        } else {
            this.root.add(node);
        }
    }

    // 中序遍历
    infixOrder() {
        if (this.root) {
            this.root.infixOrder();
        } else {
            console.log("二叉树空, 无法遍历");
        }
    }


    // 删除
    delNode(value) {
        // 根结点不存在
        if (!this.root) {
            return;
        }
        // 要删除的结点不存在
        let targetNode = this.search(value);
        if (!targetNode) {
            return;
        }
        // 只存在一个结点
        if (!this.root.left && !this.root.right) {
            this.root = null;
            return;
        }

        let parent = this.searchParent(value);

        // 删除叶子结点
        if (!targetNode.left && !targetNode.right) {
            if (parent.left && parent.left.value === value) {
                parent.left = null;
            }
            if (parent.right && parent.right.value === value) {
                parent.right = null;
            }
        } else if (targetNode.left && targetNode.right) {
            // 删除两子树结点   
            let minVal = this.delRightTreeMin(targetNode.right);
            targetNode.value = minVal;
        } else {
            // 删除一子树结点
            if (targetNode.left) {  // 删除的结点有左子树
                if (parent) {
                    if (parent.left.value === value) {
                        parent.left = targetNode.left;
                    } else {
                        parent.right = targetNode.left;
                    }
                } else {
                    this.root = targetNode.left;
                }
            } else {                // 删除的结点有右子树
                if (parent) {
                    if (parent.left.value === value) {
                        parent.left = targetNode.right;
                    } else {
                        parent.right = targetNode.right;
                    }
                } else {
                    this.root = targetNode.right;
                }
            }
        }
    }


    // 查找目标结点
    search(value) {
        if (!this.root) {
            return null;
        } else {
            return this.root.search(value);
        }
    }

    // 查找目标结点的父结点
    searchParent(value) {
        if (!this.root) {
            return null;
        } else {
            return this.root.searchParent(value);
        }
    }

    // 删除右子树的最小结点, 并返回该结点值
    // 也可以找左子树最大结点
    delRightTreeMin(node) {
        let target = node;

        while (target.left) {
            target = target.left;
        }

        this.delNode(target.value);
        return target.value;
    }
}


class Node {

    left = null;
    right = null;

    constructor(value) {
        this.value = value;
    }

    // 结点左子树高度
    leftHeight() {
        if (!this.left) {
            return 0;
        }
        return this.left.height();
    }

    // 结点右子树高度
    rightHeight() {
        if (!this.right) {
            return 0;
        }
        return this.right.height();
    }


    height() {
        return Math.max(!this.left ? 0 : this.left.height(), !this.right ? 0 : this.right.height()) + 1;
    }

    // 左旋转
    leftRotate() {
        // 为什么不移动原来的结点, 而要新创建一个呢？
        // 因为原来的结点不一定是根结点, 即它前面还有指针指向, 移动会有问题(如 2 1 6 7)
        let newNode = new Node(this.value);
        newNode.left = this.left;
        newNode.right = this.right.left;

        this.value = this.right.value;
        this.right = this.right.right;
        this.left = newNode;
    }

    // 右旋转
    rightRotate() {
        let newNode = new Node(this.value);
        newNode.right = this.right;
        newNode.left = this.left.right;

        this.value = this.left.value;
        this.left = this.left.left;
        this.right = newNode;
    }

    // 添加结点
    add(node) {
        if (!node) {
            return;
        }
        // 添加到左子树
        if (node.value < this.value) {
            if (!this.left) {
                this.left = node;
            } else {
                this.left.add(node);
            }
        } else { // 添加到右子树
            if (!this.right) {
                this.right = node;
            } else {
                this.right.add(node);
            }
        }

        // 注意, 此处是每次添加都会调整一次（在一个结点的递归添加中可能会调整多次）
        // 即从下到上, 在回溯的过程中调整, 回溯到某一个结点左右子树高度不一致时就会调整

        // 左旋转
        if (this.rightHeight() - this.leftHeight() > 1) {
            if (this.right && this.right.leftHeight() > this.right.rightHeight()) {
                this.right.rightRotate();
                this.leftRotate();
            } else {
                this.leftRotate();
            }
            return;
        }

        // 右旋转
        if (this.leftHeight() - this.rightHeight() > 1) {
            if (this.left && this.left.rightHeight() > this.left.leftHeight()) {
                this.left.leftRotate();
                this.rightRotate();
            } else {
                this.rightRotate();
            }
        }

    }

    // 中序遍历
    infixOrder() {
        this.left && this.left.infixOrder();
        console.log(this.value);
        this.right && this.right.infixOrder();
    }

    // 查找目标结点
    search(value) {
        if (value === this.value) {
            return this;
        } else if (value < this.value) {
            if (!this.left) {
                return null;
            }
            return this.left.search(value);
        } else {
            if (!this.right) {
                return null;
            }
            return this.right.search(value);
        }
    }

    // 查找目标结点的父结点
    searchParent(value) {
        if ((this.left && this.left.value === value) || (this.right && this.right.value === value)) {
            return this;
        } else {
            if (value < this.value && this.left) {
                return this.left.searchParent(value);
            } else if (value >= this.value && this.right) {
                return this.right.searchParent(value);
            } else {
                return null;
            }
        }
    }

}


let arr = [10, 11, 7, 6, 8, 9];
// let arr = [2, 1, 6, 5, 7, 3];

let avlTree = new AvlTree(); 

// 创建
for (let value of arr) { 
    avlTree.add(new Node(value));
}

// avlTree.infixOrder();

console.log(avlTree.root.value, avlTree.root.left.value, avlTree.root.right.value);
let a = avlTree.root.height();
let b = avlTree.root.leftHeight();
let c = avlTree.root.rightHeight();
console.log(a, b, c);