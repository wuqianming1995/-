/**
 * 单向环形链表解决约瑟夫问题
 */

class Node {
    constructor(data) {
        this.data = data;
    }
}

class CircleSingleLinkedList {
    first;

    // 添加指定数量的结点，构成单向环形链表
    addNode(nums) {
        if (nums < 1) {
            return;
        }
        let cur = null;

        for (let i = 1; i <= nums; i++) {
            let node = new Node(i);
            if (i == 1) {
                this.first = node;
                this.first.next = this.first;
                cur = this.first;
            } else {
                cur.next = node;
                node.next = this.first;
                cur = node;
            }
        }
    }

    list() {
        let temp = this.first;
        while (true) {
            console.log(temp.data);
            if (temp.next == this.first) {
                break;
            }
            temp = temp.next;
        }
    }

    // 从第k个人开始报数  
    // 数m下出列         
    // 1.helper指针先移动到最后一个结点，即 first的前一个
    // 2.first 和 helper 移动 k-1 次
    // 3.first 和 helper 移动 m-1 次
    // 4.执行出列，直到 first == helper
    josephu(startNo, countNum, nums) {
        if (this.first == null || startNo < 1 || startNo > nums) {
            console.log("参数错误");
            return;
        }
        let helper = this.first;
        // 1.
        while (true) {
            if (helper.next == this.first) {
                break;
            }
            helper = helper.next;
        }
        // 2.
        for (let i = 0; i < startNo - 1; i++) {
            helper = helper.next;
            this.first = this.first.next;
        }
        // 3.
        let count = 0;
        while (true) {
            if (helper == this.first) {
                break;
            }

            for (let i = 0; i < countNum - 1; i++) {
                helper = helper.next;
                this.first = this.first.next;
            }
            // 此时first就是要出列的结点
            // 4.出列
            console.log("出列：" + this.first.data);

            this.first = this.first.next;
            helper.next = this.first;
            count++;
        }

        console.log("最后一个出列：" + this.first.data);
        console.log(`总共出列${++count}次`);
    }
}


let circleSingleLinkedList = new CircleSingleLinkedList();

circleSingleLinkedList.addNode(125);

// circleSingleLinkedList.list();

circleSingleLinkedList.josephu(2, 4, 15);