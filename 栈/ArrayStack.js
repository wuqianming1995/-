/**
 * 数组模拟栈 +  计算器
 */


class ArrayStack {

    stack = [];
    top = -1;

    constructor(maxSize) {
        this.maxSize = maxSize;
    }

    isFull() {
        return this.top === this.maxSize - 1;
    }

    isEmpty() {
        return this.top === -1;
    }

    push(value) {
        if (this.isFull()) {
            console.log("栈满,不能再入栈");
            return;
        }

        this.top++;
        this.stack[this.top] = value;
    }

    pop() {
        if (this.isEmpty()) {
            console.log("栈空,不能再出栈");
            return;
        }

        let value = this.stack[this.top];
        this.top--;
        return value;
    }

    list() {
        if (this.isEmpty()) {
            console.log("栈空,没有数据");
            return;
        }

        for (let i = this.top; i >= 0; i--) {
            console.log(this.stack[i]);
        }
    }

    getTop() {
        if (this.top !== -1) {
            return this.stack[this.top];
        } else {
            return null;
        }
    }

}


/**
 * 中缀表达式计算器
 * 1.注意减法和除法的时候，用后出栈元素 -(/) 先出栈元素
 * 2.注意多位数（2位以上）处理
 */
class Calculator {

    numStack = new ArrayStack(10);  // 数栈
    operStack = new ArrayStack(10);  // 符号栈

    // 计算中缀表达式
    calInfix(expr) {
        /**
         * 1.数字入数栈
         * 2.符号入符号栈
         *   符号栈空，直接入栈
         *   当前操作符优先级 <= 符号栈顶操作符优先级，进行相应运算。 > 直接入栈 
         */
        const { numStack, operStack } = this;
        // 7*2*2-5+1-5+3-4
        let keepNum = '';
        for (let i = 0; i < expr.length; i++) {
            if (!this.isOper(expr[i])) {
                keepNum += expr[i];
                if (i === expr.length - 1) {
                    numStack.push(Number(keepNum));
                } else {
                    if (this.isOper(expr[i + 1])) {
                        numStack.push(Number(keepNum));
                        keepNum = '';
                    }
                }
            } else {
                if (operStack.isEmpty()) {
                    operStack.push(expr[i]);
                } else {
                    if (this.getPriority(expr[i]) <= this.getPriority(operStack.getTop())) {
                        let topOper = operStack.pop();
                        let num1 = numStack.pop();
                        let num2 = numStack.pop();
                        let result = this.getResult(num1, num2, topOper);
                        numStack.push(result);
                        operStack.push(expr[i]);
                    } else {
                        operStack.push(expr[i]);
                    }
                }
            }
        }

        while (true) {
            if (operStack.isEmpty()) {
                break;
            }
            let topOper = operStack.pop();
            let num1 = numStack.pop();
            let num2 = numStack.pop();
            let result = this.getResult(num1, num2, topOper);
            numStack.push(result);
        }

        return numStack.pop();
    }

    // 计算后缀表达式
    calSuffix(expr) {
        let exprArr = expr.split(' ');
        let stack = [];
        for (let item of exprArr) {
            if (item.match(/\d+/)) {
                stack.push(Number(item));
            } else {
                let num1 = stack.pop();
                let num2 = stack.pop();
                let result = this.getResult(num1, num2, item);
                stack.push(result);
            }
        }

        return stack.pop();
    }

    // 中缀 => 后缀
    infixToSuffix(expr) {
        let exprArr = expr.split(' ');
        let s1 = []; // 符号栈
        let s2 = []; // 中间结果栈

        for (let item of exprArr) {
            if (item.match(/\d+/)) {
                s2.push(item);
            } else {
                if (s1.length === 0 || s1[s1.length - 1] === '('
                    || item === '(' || this.getPriority(item) > this.getPriority(s1[s1.length - 1])) {
                    s1.push(item);
                } else if (item === ')') {
                    while (true) {
                        let top = s1.pop();
                        if (top === '(') {
                            break;
                        }
                        s2.push(top);
                    }
                } else if(this.getPriority(item) <= this.getPriority(s1[s1.length - 1])){
                    s2.push(s1.pop());
                    s1.push(item);
                }
            }
        }

        while(s1.length > 0){
            s2.push(s1.pop());     
        }

        return s2.join(' ');
    }

    getPriority(oper) {
        let priority = -1;
        switch (oper) {
            case '+':
                priority = 0;
                break;
            case '-':
                priority = 0;
                break;
            case '*':
                priority = 1;
                break;
            case '/':
                priority = 1;
                break;
            default:
                break;
        }
        return priority;
    }


    isOper(oper) {
        return oper == '+' || oper == '-' || oper == '*' || oper == '/';
    }

    getResult(num1, num2, oper) {
        let result = 0;
        switch (oper) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num2 - num1;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num2 / num1;
                break;
            default:
                break;
        }
        return result;
    }
}


// let stack = new ArrayStack(4);
// stack.push(1);
// stack.push(2);
// stack.push(3);
// stack.push(4);
// stack.push(5);
// // stack.list();
// stack.pop();
// stack.pop();
// stack.list();


let calculator = new Calculator();

// let expr = '3+2*6-2';         //13
// let expr = '7*2*2-5+1-5+3-4'; //18
// let expr = '10*1*2-5+13-5+3-4'; //22
// let result = calculator.calInfix(expr);

// let expr = '30 4 + 5 * 6 -'; // 164
// let expr = '4 5 * 8 - 60 + 8 2 / +'; // 76
// let result = calculator.calSuffix(expr);


// let expr = '1 + ( ( 2 + 3 ) × 4 ) - 5';  // 1 2 3 + 4 × + 5 -
// let expr = '( 30 + 4 ) * 5 - 6';            // 30 4 + 5 * 6 -
let expr = '4 * 5 - 8 + 60 + 8 / 2'      // 4 5 * 8 - 60 + 8 2 / +   
let suffixExpr = calculator.infixToSuffix(expr);
let result = calculator.calSuffix(suffixExpr);

console.log("结果为：" + result);