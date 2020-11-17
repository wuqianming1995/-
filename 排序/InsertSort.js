/**
 *  插入排序
 */

function InsertSort(arr) {

    let insertVal = 0;  // 待插入的值
    let insertIndex = 0;

    for (let i = 1; i < arr.length; i++) {
        insertVal = arr[i];
        insertIndex = i - 1;

        // 从后向前找到一个合适的位置
        // 标准：找到第一个比待插入的值小的位置的后面, 即为正确位置
        while (insertIndex >= 0 && insertVal < arr[insertIndex]) {
            // 先后移
            arr[insertIndex + 1] = arr[insertIndex];
            // 方便循环条件的比较, 后面再加回1就行了
            insertIndex--;
        }

        // 找到正确位置, 且不是原来的位置, 插入
        if (insertIndex + 1 !== i) {
            arr[insertIndex + 1] = insertVal;
        }
    }

}

// let arr = [3, 9, -1, 10, -2];
let arr = [101, 34, 119, 1, -1, 90, 123];
// let arr = [];
// for (let i = 0; i < 20; i++) {
//     arr[i] = Math.ceil(Math.random() * 100);
// }
InsertSort(arr);

console.log('排序后：');
console.log(...arr);