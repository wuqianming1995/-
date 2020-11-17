/**
 *  哈希表
 */



class HashTab {

    linkedListArr = [];

    constructor(size) {
        this.size = size;
        for (let i = 0; i < size; i++) {
            this.linkedListArr[i] = new LinkedList();
        }
    }


    add(node) {
        let no = this.hashFun(node.id);
        this.linkedListArr[no].add(node);
    }


    list() {
        for (let i = 0; i < this.size; i++) {
            this.linkedListArr[i].list(i);
        }
    }

    findNodeById(id) {
        let no = this.hashFun(id);
        let node = this.linkedListArr[no].findNodeById(id);
        if (node != null) {
            console.log(`在第${no + 1}条链表找到结点${node.id}`);
        } else {
            console.log(`在哈希表中没有找到该结点`);
        }
    }

    // 散列函数
    hashFun(id) {
        return id % this.size;
    }
}



class LinkedList {
    head = null;

    // 假定每条链表的结点按id从小到大插入
    add(node) {
        if (this.head == null) {
            this.head = node;
            return;
        }
        // 找到链表最后, 插入结点
        let cur = this.head;
        while (true) {
            if (cur.next == null) {
                break;
            }
            cur = cur.next;
        }
        cur.next = node;
    }


    list(no) {
        if (this.head == null) {
            console.log(`第${no + 1}条链表为空`);
            return;
        }

        console.log(`第${no + 1}条链表信息: `);

        let print = [];
        let cur = this.head;
        while (true) {
            // 链表最后
            if (cur.next == null) {
                print.push(cur.id);
                break;
            } else {
                print.push(cur.id + '->');
            }
            cur = cur.next;
        }
        console.log(...print);
    }


    findNodeById(id) {
        if (this.head == null) {
            console.log(`链表为空`);
            return;
        }

        let cur = this.head;
        while (true) {
            // 找到
            if (cur.id === id) {
                break;
            }
            // 没有找到
            if (cur.next == null) {
                cur = null;
                break;
            }
            cur = cur.next;
        }

        return cur;
    }

}


class Node {
    id;
    next = null;
    constructor(id) {
        this.id = id;
    }
}

let hashTab = new HashTab(7);

for (let i = 0; i < 50; i++) {
    hashTab.add(new Node(i));
}

hashTab.list();

hashTab.findNodeById(42);

