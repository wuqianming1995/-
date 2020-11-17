/**
 *  背包问题
 */


// 01背包问题
// w:物品重量  val:物品价值
// m:背包容量  n:物品个数
function KnapsackProblem01(w, val, m, n) {

    let v = initMatrix(n + 1, m + 1);
    let path = initMatrix(n + 1, m + 1);

    // 初始化v数组第一列和第一行
    for (let i = 0; i < v.length; i++) {
        v[i][0] = 0;
    }

    for (let i = 0; i < v[0].length; i++) {
        v[0][i] = 0;
    }

    // 遍历动态处理(填表)
    for (let i = 1; i < v.length; i++) {
        for (let j = 1; j < v[0].length; j++) {
            if (w[i - 1] > j) {
                v[i][j] = v[i - 1][j];
            } else {
                if (v[i - 1][j] < val[i - 1] + v[i - 1][j - w[i - 1]]) {
                    v[i][j] = val[i - 1] + v[i - 1][j - w[i - 1]];
                    path[i][j] = 1;
                } else {
                    v[i][j] = v[i - 1][j];
                }
            }
        }
    }

    printMatrix(v);
    console.log('----------------')
    printMatrix(path);

    let i = path.length - 1;
    let j = path[0].length - 1;

    while (i > 0 && j > 0) {
        if (path[i][j] === 1) {
            console.log(`第${i}个物品放入背包`);
            j -= w[i - 1];
        }
        i--;
    }

}

function initMatrix(len1, len2) {
    let matrix = [];
    for (let i = 0; i < len1; i++) {
        matrix[i] = [];
        for (let j = 0; j < len2; j++) {
            matrix[i][j] = 0;
        }
    }
    return matrix;
}

function printMatrix(arr) {
    for (let row of arr) {
        console.log(...row);
    }
}


let w = [1, 4, 3];
let val = [1500, 3000, 2000];
let m = 4; // 背包容量
let n = val.length; //物品个数

KnapsackProblem01(w, val, m, n);