/**
 *  二叉树遍历
 */

class TreeNode {
    left = null;
    right = null;
    constructor(val) {
        this.val = val;
    }
}


/**
 *  递归
 */
function preOrder(treeNode) {
    if (!treeNode) {
        return;
    }
    console.log(treeNode.val);
    preOrder(treeNode.left);
    preOrder(treeNode.right);
}


function inOrder(treeNode) {
    if (!treeNode) {
        return;
    }
    inOrder(treeNode.left);
    console.log(treeNode.val);
    inOrder(treeNode.right);
}


function postOreder(treeNode) {
    if (!treeNode) {
        return;
    }
    postOreder(treeNode.left);
    postOreder(treeNode.right);
    console.log(treeNode.val);
}



/**
 *  迭代     
 */

function preOrderIte(root) {
    let list = [];
    let stack = [];

    while (root != null || stack.length > 0) {
        // 一直访问左子树
        while (root != null) {
            stack.push(root);
            // 访问根节点
            list.push(root.val);
            root = root.left;
        }

        //自底向上找到栈中根结点第一个非空右孩子
        while (root == null && stack.length > 0) {
            root = stack.pop().right;
        }
    }

    console.log(`前序遍历：`, ...list);
    return list;
}


function preOrderIte2(root) {
    let list = [];
    let stack = [];
    stack.push(root);

    while (stack.length > 0) {
        let node = stack.pop();
        // 访问根节点
        list.push(node.val);

        if (node.right) {
            stack.push(node.right);
        }

        if (node.left) {
            stack.push(node.left);
        }
    }

    console.log(`前序遍历2：`, ...list);
    return list;
}


function inOrderIte(root) {
    let list = [];
    let stack = [];

    while (root != null || stack.length > 0) {
        // 一直迭代左子树
        while (root != null) {
            stack.push(root);
            root = root.left;
        }

        root = stack.pop();
        list.push(root.val);

        // 更新root节点为右子节点或者null(下次循环会变为上一层的根节点)
        root = root.right;
    }

    console.log(`中序遍历：`, ...list);
    return list;
}


function postOrderIte(root) {
    let list = [];
    let stack = [];
    let pre = null;

    while (root != null || stack.length > 0) {

        while (root != null) {
            stack.push(root);
            root = root.left;
        }

        // 看看栈顶元素
        root = stack[stack.length - 1];
        if (root.right == null || root.right == pre) {
            pre = root;
            list.push(stack.pop().val);
            root = null;
        } else {
            root = root.right;
        }

    }

    console.log(`后序遍历：`, ...list);
    return list;
}



/*
        1
       / \
      2   3
     /\   /\
    4  5 6  7
 */

function init() {
    let node1 = new TreeNode(1);
    let node2 = new TreeNode(2);
    let node3 = new TreeNode(3);
    let node4 = new TreeNode(4);
    let node5 = new TreeNode(5);
    let node6 = new TreeNode(6);
    let node7 = new TreeNode(7);

    node1.left = node2;
    node1.right = node3;
    node2.left = node4;
    node2.right = node5;
    node3.left = node6;
    node3.right = node7;

    return node1;
}

let root = init();

//递归
// preOrder(root);
// inOrder(root);
// postOreder(root);

preOrderIte(root);
preOrderIte2(root);
inOrderIte(root);
postOrderIte(root);