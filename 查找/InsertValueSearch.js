/**
 *  插值查找
 *  适用于数据量比较大, 关键字分布比较均匀的序列, 采用插值查找, 速度比较快。（尤其是找边界值次数比较少）
 *  关键字分布不均匀的情况下, 不一定比二分查找快
 */


// 前提也是: 数组有序 
function InsertValueSearch(arr, left, right, value) {

    // 已经递归整个数组, 没有找到
    // 后面两个条件, 防止数组越界。因为在计算mid的时候, value的大小会影响到mid
    if (left > right || value < arr[0] || value > arr[arr.length - 1]) {
        return -1;
    }

    // 自适应mid(插值)
    let mid = left + (right - left) * parseInt((value - arr[left]) / (arr[right] - arr[left]));
    let midVal = arr[mid];

    if (value > midVal) {
        return InsertValueSearch(arr, mid + 1, right, value);  // 向右递归
    } else if (value < midVal) {
        return InsertValueSearch(arr, left, mid - 1, value);  // 向左递归
    } else {
        return mid;             // 找到
    }
}


let arr = [1, 8, 10, 89, 1000, 1234];
let index = InsertValueSearch(arr, 0, arr.length - 1, 10);

if (index === -1) {
    console.log(`没有找到`);
} else {
    console.log(`找到, 下标为：${index}`);
}
