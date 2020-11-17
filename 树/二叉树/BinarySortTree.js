/**
 *  二叉排序树
 */


class BinarySortTree {

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


let arr = [7, 3, 10, 12, 5, 1, 9, 2];

let binarySortTree = new BinarySortTree();

// 创建
for (let value of arr) {
    binarySortTree.add(new Node(value));
}
binarySortTree.add(new Node(11));

// 中序遍历
// binarySortTree.infixOrder();

// 删除叶子、一子树、二子树结点
// binarySortTree.delNode(2);
// binarySortTree.delNode(1);
// binarySortTree.delNode(3);
binarySortTree.delNode(10);
binarySortTree.infixOrder(); 
 