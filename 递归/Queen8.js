/**
 * 八皇后 （递归 + 回溯）
 */

class Queen8 {
  
    max = 8;    // 皇后数量
    array = []; // array[i] 表示第i行（第i+1个）皇后的列数
    judgeCount = 0;
    count = 0;


    // 放置第n+1个皇后
    check(n) {
        // 递归退出条件
        if (n === this.max) {
            this.print();
            return;
        }

        for (let i = 0; i < this.max; i++) {
            // 先从第一列放起
            this.array[n] = i;

            if (this.judge(n)) {
                // 1.放完第8个皇后（n=7, 继续执行check(8), 满足递归退出条件, return, 完成一种解法。
                // 2.回溯到放第7个皇后（n=6）所在的循环, 继续放下一个位置（i++）, 且继续放第8个寻找正确解法
                // 3.找到一种正确解法或者有冲突，都会回溯到上一层，类似步骤2.
                // 4.直至回溯到 n=0, 放第一个皇后放在第一列的正确解法就全部得到, 继续 i++, 寻找放在下一列的所有正确解法...
                this.check(n+1);
            }
        }
    }

    // 判断放置第 n+1 个皇后时，是否会与前面的皇后冲突
    judge(n) {
        this.judgeCount++;
        let array = this.array;
        for (let i = 0; i < n; i++) {
            // 判断是否在同一列或同一斜线上
            if (array[n] === array[i] || Math.abs(n - i) === Math.abs(array[n] - array[i])) {
                return false;
            }
        }
        return true;
    }

    print() {
        this.count++; // 解法 +1
        console.log(...this.array);
    }
}


let queen8 = new Queen8();

queen8.check(0);

console.log(`共有${queen8.count}种解法`);
console.log(`判断了${queen8.judgeCount}次`);

