/**
 *  双向链表
 */


class Node {
    constructor(data, next, pre) {
        this.data = data;
        this.next = next;
        this.pre = pre;
    }
}

class DoubleLinkedList {
    constructor() {
        this.head = { data: null, next: null, pre: null };
    }

    // 添加结点到最后
    addNode(node) {
        let temp = this.head;
        while (true) {
            if (!temp.next) {
                break;
            }
            temp = temp.next;
        }
        temp.next = node;
        node.pre = temp;
    }

    // 按照编号顺序添加结点
    addNodeByNo(node) {
        let temp = this.head;
        let flag = false;
        while (true) {
            if (!temp.next) {
                break;
            }
            // 找到要插入的位置
            // 找到第一个比待插入结点大的结点前面的结点（找前一个结点插入好处理）
            // 找不到，则插到最后一个结点的后面
            if (temp.next.data > node.data) {
                break;
            } else if (temp.next.data === node.data) {
                flag = true;
                break;
            }
            temp = temp.next;
        }
        if (flag) {
            console.log("要插入的结点已经存在");
            return;
        }
        // 右边
        if(temp.next){
            node.next = temp.next;
            temp.next.pre = node;
        }
        // 左边
        temp.next = node;
        node.pre = temp;
    }

    // 因为只是更新结点，所以可以找到目标结点，不用找到上一个结点
    // 和单链表一样
    updateNode(newNode) {
        let temp = this.head;
        let flag = false;
        while (true) {
            if (!temp) {
                break;
            }
            if (temp.data == newNode.data) {
                flag = true;
                break;
            }
            temp = temp.next;
        }
        if (flag) {
            // 更新数据...
            temp.isUpdate = true;
        } else {
            console.log("没有找到对应的结点");
        }
    }

    // 删除结点
    delNode(data) {
        let temp = this.head;
        let flag = false;
        while (temp) {
            if (temp.data == data) {
                flag = true;
                break;
            }
            temp = temp.next;
        }
        // 此时temp为待删除的结点，可以自我删除
        if (flag) {
            temp.pre.next = temp.next;
            // 最后一个结点不需要执行，否则会出现空指针
            if (temp.next != null) {
                temp.next.pre = temp.pre;
            }
        } else {
            console.log("要删除的结点不存在");
        }
    }
}


// 打印单链表
function printList(head) {
    console.log("双向链表为：");
    let temp = head;
    let arr = [];
    while (temp) {
        arr.push(temp.data || "头结点");
        temp = temp.next;
        temp && arr.push("-->");
    }
    console.log(...arr);
}


let node1 = new Node(1);
let node2 = new Node(2);
let node3 = new Node(3);
let node4 = new Node(4);
let node5 = new Node(5);

let doubleLinkedList = new DoubleLinkedList();
// 添加到最后
// doubleLinkedList.addNode(node1);
// doubleLinkedList.addNode(node2);
// doubleLinkedList.addNode(node3);
// printList(doubleLinkedList.head);

// 按顺序添加
// doubleLinkedList.addNodeByNo(node3);
// doubleLinkedList.addNodeByNo(node1);
// doubleLinkedList.addNodeByNo(node5);
// doubleLinkedList.addNodeByNo(node4);
// doubleLinkedList.addNodeByNo(node2);

// printList(doubleLinkedList.head);


// 更新单链表结点
// doubleLinkedList.updateNode(node1);
// printList(doubleLinkedList.head);

// 删除单链表结点
// console.log("删除前：")
// printList(doubleLinkedList.head);
// doubleLinkedList.delNode(1);
// console.log("删除后：")
// printList(doubleLinkedList.head);




