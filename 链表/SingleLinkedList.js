/**
 *  单链表
 */


class Node {
    constructor(data, next) {
        this.data = data;
        this.next = next;
    }
}

/**
 * 1.两种条件的while遍历
 */
class SingleLinkedList {
    constructor() {
        this.head = { data: null, next: null };
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
    }

    // 按照编号顺序添加结点
    // 单链表，添加到某个位置，需要找到前一个位置的结点
    addNodeByNo(node) {
        let temp = this.head;
        let flag = false;
        while (true) {
            if (!temp.next) {
                break;
            }
            // 找到要插入的位置
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
        node.next = temp.next;
        temp.next = node;
    }

    // 因为只是更新结点，所以可以找到目标结点，不用找到上一个结点
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
        while (temp.next) {
            if (temp.next.data == data) {
                flag = true;
                break;
            }
            temp = temp.next;
        }
        if(flag){
            temp.next = temp.next.next;
        }else{
            console.log("要删除的结点不存在");
        }
    }

    // 求单链表中有效结点的个数
    getLength() {
        if (!this.head.next) {
            return 0;
        }
        // 不统计头结点
        let cur = this.head.next;
        let length = 0;
        while (cur !== null) {
            length++;
            cur = cur.next;
        }
        return length;
    }


    // 查找单链表中的倒数第k个结点
    findLastIndexNode(index) {
        // 倒数第k个结点的位置
        let length = this.getLength();
        let pos = length - (k - 1);

        /**
         * 相当于从1开始遍历，遍历到 pos 位置（总共 pos 个）
         * 也可以用for循环，从0开始遍历，遍历 pos - 1 个
         */
        let cur = this.head.next;
        let count = 0;
        while (cur != null) {
            if (++count == pos) {
                break;
            }
            cur = cur.next;
        }
        return cur;
    }


    // 单链表的反转
    reverseList() {
        if (this.head.next == null || this.head.next.next == null) {
            return;
        }


        let reverseHead = new Node();

        let cur = this.head.next;
        while (cur != null) {
            let next = cur.next;
            cur.next = reverseHead.next;
            reverseHead.next = cur;
            cur = next;
        }

        this.head.next = reverseHead.next;
    }


    // 单链表的逆序打印
    // 1.反转后再遍历。不推荐，破坏链表结构
    // 2.利用栈，先进后出。数组push() 和 pop()可以实现
}


// 打印单链表
function printList(head) {
    console.log("单链表为：");
    let temp = head;
    let arr = [];
    while (temp) {
        arr.push(temp.data || "头结点");
        temp = temp.next;
        temp && arr.push("-->");
    }
    console.log(...arr);
}


// 合并两个有序的单链表，合并之后的链表依然有序
// 链表1： 1->2->3->4  
// 链表2： 2->3->4->5
// 合并后：1->2->2->3->3->4->4->5  

// 方式1：依次比较
function mergeLinkedList1(head1, head2) {
    if (head1 == null) {
        return head2;
    }
    if (head2 == null) {
        return head1;
    }

    let head;  // 新链表的头结点
    let cur;   // 辅助指针，指向新链表的最新结点

    // 视头结点有无数据而做修改
    let temp1 = head1.next;
    let temp2 = head2.next;
    // 从两链表的第一个结点开始比较，如果头结点有数据的话，也可以从头结点开始
    // 先比较一次，选出新链表的第一个结点，比较过后，temp1(或temp2)指针后移，即在cur的后面一个结点
    if (temp1.data <= temp2.data) {
        head = head1;
        cur = temp1;
        temp1 = temp1.next;
    } else {
        head = head2;
        cur = temp2;
        temp2 = temp2.next;
    }

    // 注意temp1(或temp2)始终是比cur领先一个身位的，
    // 这样就可以在新链表生成导致旧链表结构破坏前保存下一个比较的节点
    // 不能用temp1.next
    while (temp1 != null && temp2 != null) {
        // 依次逐个比较
        if (temp1.data <= temp2.data) {
            cur.next = temp1;  // 新链表下一个节点生成
            cur = cur.next;    // cur指针后移
            temp1 = temp1.next; // 在当前cur的后一位
        } else {
            cur.next = temp2;
            cur = cur.next;
            temp2 = temp2.next;
        }
    }

    // 合并剩余结点
    if (temp1 != null) {
        cur.next = temp1;
    }

    if (temp2 != null) {
        cur.next = temp2;
    }

    return head;

}

// 方式2：递归
function mergeLinkedList2(head1, head2) {
    if(head1 == null) return head2;
    if(head2 == null) return head1;

    let head = null;
    if(head1.data <= head2.data){
        head = head1;
        head.next = mergeLinkedList2(head1.next, head2);
    }else{
        head = head2;
        head.next = mergeLinkedList2(head1, head2.next);
    }

    return head;
}


// let node1 = new Node(1);
// let node2 = new Node(2);
// let node3 = new Node(3);
// let node4 = new Node(4);
// let node5 = new Node(5);

// let singleLinkedList = new SingleLinkedList();
// singleLinkedList.addNode(node1);
// singleLinkedList.addNode(node2);
// singleLinkedList.addNode(node3);

// singleLinkedList.addNodeByNo(node2);
// singleLinkedList.addNodeByNo(node3);
// singleLinkedList.addNodeByNo(node1);
// singleLinkedList.addNodeByNo(node5);
// singleLinkedList.addNodeByNo(node4);

// 更新单链表结点
// singleLinkedList.updateNode(node1);

// 删除单链表结点
// console.log("删除前：")
// printList(singleLinkedList.head);
// singleLinkedList.delNode(1);
// console.log("删除后：")
// printList(singleLinkedList.head);

// 求单链表中有效结点的个数
// console.log(singleLinkedList.getLength());

// 查找单链表中的倒数第 k 个结点
// console.log(singleLinkedList.findLastIndexNode(5).data);

// 单链表的反转
// console.log("反转前：")
// printList(singleLinkedList.head)

// singleLinkedList.reverseList();

// console.log("反转后：")
// printList(singleLinkedList.head)



// 测试链表合并
let singleLinkedList1 = new SingleLinkedList();
singleLinkedList1.addNode(new Node(2));
singleLinkedList1.addNode(new Node(6));
singleLinkedList1.addNode(new Node(7));
singleLinkedList1.addNode(new Node(9));
printList(singleLinkedList1.head)

let singleLinkedList2 = new SingleLinkedList();
singleLinkedList2.addNode(new Node(1));
singleLinkedList2.addNode(new Node(5));
singleLinkedList2.addNode(new Node(6));
singleLinkedList2.addNode(new Node(7));
printList(singleLinkedList2.head)

console.log("合并后的单链表为：")
printList(mergeLinkedList2(singleLinkedList1.head.next, singleLinkedList2.head.next));