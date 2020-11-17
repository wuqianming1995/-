/**
 *  二分（折半）查找
 *  使用二分查找前提: 数组有序
 */


// 递归法
function BinarySearch(arr, left, right, value) {

    // 已经递归整个数组, 没有找到
    // 一直左递归 => right一直减小 < left
    // 一直右递归 => left一直增大 > right
    if (left > right) {
        return -1;
    }

    let mid = parseInt((left + right) / 2);
    let midVal = arr[mid];

    if (value > midVal) {
        return BinarySearch(arr, mid + 1, right, value);  // 向右递归
    } else if (value < midVal) {
        return BinarySearch(arr, left, mid - 1, value);  // 向左递归
    } else {
        return mid;             // 找到
    }
}

// 当查找的值在数组中存在多个时, 返回多个下标
// [1,8, 10, 89, 1000, 1000，1234]
function BinarySearch2(arr, left, right, value) {

    if (left > right) {
        return [];
    }

    let mid = parseInt((left + right) / 2);
    let midVal = arr[mid];

    if (value > midVal) {
        return BinarySearch2(arr, mid + 1, right, value);  // 向右递归
    } else if (value < midVal) {
        return BinarySearch2(arr, left, mid - 1, value);  // 向左递归
    } else {
        let indexs = [];

        let temp = mid - 1;
        // mid 左边扫描
        while (true) {
            if (temp < 0 || arr[temp] !== value) {
                break;
            }
            indexs.push(temp);
            temp--;
        }

        indexs.push(mid);             // 找到

        temp = mid + 1;
        // mid右边扫描
        while (true) {
            if (temp > arr.length - 1 || arr[temp] !== value) {
                break;
            }
            indexs.push(temp);
            temp++;
        }

        return indexs;
    }

}


// 非递归, 即迭代
function BinarySearchNoRecur(arr, value) {

    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = parseInt((left + right) / 2);
        if (value > arr[mid]) {
            left = mid + 1;
        } else if (value < arr[mid]) {
            right = mid - 1;
        } else {
            return mid;
        }
    }

    return -1;
}


// let arr = [1, 8, 10, 89, 1000, 1234];
// let arr = [1, 8, 10, 89, 1000, 1000, 1000, 1234];
let arr = [1, 3, 8, 10, 11, 67, 100];
// let index = BinarySearch(arr, 0, arr.length - 1, 10);
// let index = BinarySearch2(arr, 0, arr.length - 1, 1000);
let index = BinarySearchNoRecur(arr, 100);

if (index === -1) {
    console.log(`没有找到`);
} else {
    console.log(`找到, 下标为：${index}`);
}

