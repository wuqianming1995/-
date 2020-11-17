/**
 * 冒泡排序
 */

// O(n^2)
function BubbleSort(arr) {
    let temp;
    let flag = false;
    // n - 1 轮排序
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            // 前面的数大于后面的数，则交换
            // 倒序只需要把 > 改为 <
            if (arr[j] > arr[j + 1]) {
                flag = true;
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }

        // 在其中一趟排序中没有交换过，则序列已经有序
        if(!flag){
            break;
        }else{
            flag = false;  // 重置flag，进行下次判断
        }
    }
}

// let arr = [3, 9, -1, 10, -2];
let arr = [];
for (let i = 0; i < 20; i++) {
    arr[i] = Math.ceil(Math.random() * 100);
}
BubbleSort(arr);

console.log('排序后：');
console.log(...arr);