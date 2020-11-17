
/**
 * 数组模拟环形队列
 */


class CircleArrayQuque {

    constructor(maxSize) {
        this.maxSize = maxSize;
        this.front = 0; // 指向队头前一个元素
        this.rear = 0;  // 指向队尾元素
        this.queue = [];
    }

    // 入队列
    inQueue(item) {
        if (!this.isFull()) {
            this.queue[this.rear] = item;
            this.rear = (this.rear + 1) % this.maxSize;
        } else {
            console.log('队列满');
        }
    }

    // 出队列
    outQueue() {
        if (!this.isEmpty()) {
            let value = this.queue[this.front];
            this.queue[this.front] = undefined;
            this.front = (this.front + 1) % this.maxSize;
            return ;
        } else {
            console.log('队列空');
        }
    }

    // 显示队列头数据
    headQueue() {
        if (!this.isEmpty()) {
            return this.queue[this.front];
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
        return (this.rear+1) % this.maxSize === this.front;
    }

    // 打印队列
    printQueue(queue, front, rear) {
        for (let i = front; i < front + this.size(); i++) {
            console.log(queue[i]);
        }
        console.log("front:" + front);
        console.log("rear:" + rear);
    }

    size(){
        return (this.rear + this.maxSize - this.front) % this.maxSize;
    }
}


// 测试
let arrayQuque = new CircleArrayQuque(4);

// 入
console.log('入队列：');
arrayQuque.inQueue(1);
arrayQuque.inQueue(2);
arrayQuque.inQueue(3);
arrayQuque.inQueue(4);

console.log('当前队列为:');
arrayQuque.printQueue(arrayQuque.queue, arrayQuque.front, arrayQuque.rear);
console.log('队列头:' + arrayQuque.headQueue());

// 出
console.log('出队列：');
arrayQuque.outQueue();
arrayQuque.outQueue();

console.log('当前队列为:');
arrayQuque.printQueue(arrayQuque.queue, arrayQuque.front, arrayQuque.rear);
console.log('队列头:' + arrayQuque.headQueue());

// 再入再出
console.log('入出队列：');
arrayQuque.inQueue(5);
arrayQuque.inQueue(6);
arrayQuque.inQueue(7);
arrayQuque.outQueue();
arrayQuque.inQueue(7);

arrayQuque.outQueue();
arrayQuque.inQueue(8);


console.log('当前队列为:');
arrayQuque.printQueue(arrayQuque.queue, arrayQuque.front, arrayQuque.rear);
console.log('队列头:' + arrayQuque.headQueue());