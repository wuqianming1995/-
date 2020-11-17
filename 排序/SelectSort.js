/**
 *  选择排序
 */

function SelectSort(arr) {

    let minIndex;
    let min;
    
    // n - 1 轮排序
    for (let i = 0; i < arr.length - 1; i++) {
        minIndex = i;
        min = arr[i];

        for (let j = i + 1; j < arr.length; j++) {
            if (min > arr[j]) {
                minIndex = j;
                min = arr[j];
            }       
        }

        // 找到更小的值，交换
        if (minIndex !== i) {
            arr[minIndex] = arr[i];
            arr[i] = min;
        }
    }
}

// let arr = [3, 9, -1, 10, -2];
let arr = [101, 34, 119, 1, -1, 90, 123];
// let arr = [];
// for (let i = 0; i < 20; i++) {
//     arr[i] = Math.ceil(Math.random() * 100);
// }
SelectSort(arr);

console.log('排序后：');
console.log(...arr);