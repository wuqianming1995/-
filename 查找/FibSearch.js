/**
 * 斐波那契查找
 */


function FibSearch(arr, value) {

    let low = 0;
    let high = arr.length - 1;

    let k = 0;
    let mid = 0;
    // 填充数组到指定长度
    let f = fib(20);
    while (high > f[k] - 1) {
        k++;
    }
    let temp = arr.slice();
    for (let i = high + 1; i < f[k]; i++) {
        temp[i] = arr[high];
    }

    // 迭代查找
    while (low <= high) {
        mid = low + f[k - 1] - 1;
        if (value < temp[mid]) {
            high = mid - 1;
            k--;
        } else if (value > temp[mid]) {
            low = mid + 1;
            k -= 2;
        } else {
            if (mid <= high) {
                return mid;
            } else {
                return high;
            }
        }
    }

    return -1;
}

// 迭代求斐波那契数列
function fib(maxSize) {
    let f = [];
    f[0] = 1;
    f[1] = 1;
    for (let i = 2; i < maxSize; i++) {
        f[i] = f[i - 1] + f[i - 2];
    }
    return f;
}


let arr = [1, 8, 10, 89, 1000, 1234];
let index = FibSearch(arr, 1234);

if (index === -1) {
    console.log(`没有找到`);
} else {
    console.log(`找到, 下标为：${index}`);
}