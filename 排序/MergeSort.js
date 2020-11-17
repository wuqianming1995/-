/**
 * 归并排序
 */

function MergeSort(arr, left, right, temp) {
    // 分解到 left == right 停止递归
    if (left < right) {
        // 中间索引
        let mid = parseInt((left + right) / 2);
        // 向左递归分解
        MergeSort(arr, left, mid, temp);
        // 向右递归分解   
        MergeSort(arr, mid + 1, right, temp);

        // 合并
        merge(arr, left, mid, right, temp);
    }
}


// 合并两个有序序列
// 左序列 [left, mid]   右序列 [mid+1, right]
function merge(arr, left, mid, right, temp) {

    let i = left;    // 左边有序序列的起始索引
    let j = mid + 1; // 右边有序序列的起始索引
    let t = 0;       // 临时数组的起始索引, 每次归并都是重新从0开始


    // 1.将左右序列依次按照顺序填充到temp数组, 直到一边序列填完为止
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[t] = arr[i];
            i++;
            t++;
        } else {
            temp[t] = arr[j];
            j++;
            t++;
        }
    }

    // 2.将有剩余数据的一边序列全部填充到temp数组后面
    while (i <= mid) {
        temp[t] = arr[i];
        i++;
        t++;
    }
    while (j <= right) {
        temp[t] = arr[j];
        j++;
        t++;
    }

    // 3.将temp数组的元素拷贝到arr上, 拷贝的temp区间为 [0, right-left+1]
    t = 0;   // t从0开始
    let tempLeft = left;
    while (tempLeft <= right) {
        arr[tempLeft] = temp[t];
        tempLeft++;
        t++;
    }

}


// let arr = [3, 9, -1, 10, -2];
let arr = [101, 34, 119, 1, -1, 90, 123];
// let arr = []; 
// for (let i = 0; i < 20; i++) {
//     arr[i] = Math.ceil(Math.random() * 100);
// }
MergeSort(arr, 0, arr.length - 1, []);

console.log('排序后：');
console.log(...arr);