/**
 *  基数排序
 */

// 不能用于有负数的序列, 负数的话要改进（20个桶）
function RadixSort(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    // 数组中最大数的位数, 决定了要进行多少轮排序
    let maxLength = (max + '').length;

    // 10个桶, 每个桶的长度为 arr.length
    let bucket = initMatrix(10, arr.length);
    // 存储每个桶每轮实际放入数据的个数, count[0] 代表第一个桶放入的数据个数
    let counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0, n = 1; i < maxLength; i++, n *= 10) {

        // 放入桶
        for (let j = 0; j < arr.length; j++) {
            let digit = parseInt(arr[j] / n) % 10;
            bucket[digit][counts[digit]] = arr[j];
            counts[digit]++;
        }

        // 取出
        let index = 0;
        for (let k = 0; k < counts.length; k++) {
            // 桶中有数据
            if (counts[k] !== 0) {
                for (let l = 0; l < counts[k]; l++) {
                    arr[index++] = bucket[k][l];
                }
            }
            // 每个桶取完数据后, 计数器清0, 下一轮排序可以继续用
            counts[k] = 0;
        }
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


// let arr = [3, 9, -1, 10, -2];
// let arr = [101, 34, 119, 1, -1, 90, 123];
// let arr = [101, 34, 119, 1, 90, 123];
let arr = [53, 3, 542, 748, 14, 214];
// let arr = []; 
// for (let i = 0; i < 20; i++) {
//     arr[i] = Math.ceil(Math.random() * 100);
// }
RadixSort(arr);

console.log('排序后：');
console.log(...arr);