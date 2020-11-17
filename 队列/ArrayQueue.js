
/**
 * 数组模拟队列
 */


class ArrayQuque {

    constructor(maxSize) {
        this.maxSize = maxSize;
        this.front = -1; // 指向队头前一个元素
        this.rear = -1;  // 指向队尾元素
        this.queue = [];
    }

    // 入队列
    inQueue(item) {
        if (!this.isFull()) {
            this.queue[++this.rear] = item;
        } else {
            console.log('队列满');
        }
    }

    // 出队列
    outQueue() {
        if (!this.isEmpty()) {
            return this.queue[++this.front];
        } else {
            console.log('队列空');
        }
    }

    // 显示队列头数据
    headQueue() {
        if (!this.isEmpty()) {
            return this.queue[this.front + 1];
        } else {
            console.log('队列空');
        }
    }

    // 判断队列是否为空
    isEmpty() {
        return this.rear === this.front;
    }

    // 判断队列是否为满
    isFull() {
        return this.rear === this.maxSize - 1;
    }

    // 打印队列
    printQueue(queue, front, rear) {
        for (let i = front + 1; i <= rear; i++) {
            console.log(queue[i]);
        }
        console.log("front:" + front);
        console.log("rear:" + rear);
    }
    
}


// 测试
let arrayQuque = new ArrayQuque(3);

console.log('入队列：');
arrayQuque.inQueue(1);
arrayQuque.inQueue(2);
arrayQuque.inQueue(3);
arrayQuque.inQueue(4);
console.log('当前队列为:');
arrayQuque.printQueue(arrayQuque.queue, arrayQuque.front, arrayQuque.rear);
console.log('队列头:' + arrayQuque.headQueue());

console.log('出队列：');
arrayQuque.outQueue();
arrayQuque.outQueue();
console.log('当前队列为:');
arrayQuque.printQueue(arrayQuque.queue, arrayQuque.front, arrayQuque.rear);
console.log('队列头:' + arrayQuque.headQueue());



