/**
 * 快速排序
 */

/**
 * 基准值中间
 */ 
function QuickSort(arr, left, right) {
    let l = left;
    let r = right;
    let pivot = arr[parseInt((left + right) / 2)];
    let temp;
    while (l < r) {
        while (arr[l] < pivot) {
            l++;
        }
        while (arr[r] > pivot) {
            r--;
        }

        if (l >= r) {
            break;
        }
        // 交换
        temp = arr[l];
        arr[l] = arr[r];
        arr[r] = temp;

        // 防止一边有和pivot相同的数, 循环到最后形成死循环
        if (arr[l] === pivot) {
            r--;
        }
        if (arr[r] === pivot) {
            l++;
        }
    }

    if (l === r) {
        l++;
        r--;
    }

    //左递归
    if (left < r) {
        QuickSort(arr, left, r);
    }
    //右递归
    if (right > l) {
        QuickSort(arr, l, right);
    }
}


/**
 * 基准值最左最右 + 双指针法
 */
function QuickSort2(arr, left, right) {
    if (left > right) {
        return;
    }
    let pivot = arr[left];
    let l = left;
    let r = right;
    // l == r 时, 找到基准值的插入位置
    while (l < r) {
        // 基准值选左边, 先从右边开始遍历
        while (r > l && arr[r] >= pivot) {
            r--;
        }
        arr[l] = arr[r];

        while (l < r && arr[l] <= pivot) {
            l++;
        }
        arr[r] = arr[l];
    }

    arr[r] = pivot;

    if (left < r) {
        QuickSort2(arr, left, r - 1);
    }

    if (right > l) {
        QuickSort2(arr, l + 1, right);
    }
}

// let arr = [3, 9, -1, 10, -2];
let arr = [101, 34, 119, 1, -1, 90, 123];
// let arr = []; 
// for (let i = 0; i < 20; i++) {
//     arr[i] = Math.ceil(Math.random() * 100);
// }
// QuickSort(arr, 0, arr.length - 1);
QuickSort2(arr, 0, arr.length - 1);

console.log('排序后：');
console.log(...arr);