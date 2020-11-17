/**
 *  希尔排序 
 */


// 交换法
function ShellSort(arr) {
    let temp;
    // 三个for循环搞定
    // 这里gap需要去掉小数部分 用parseInt 或者 ~~
    // 实质上是每轮排序都是用了交换排序, 因此这种不算真正的希尔排序
    for (let gap = parseInt(arr.length / 2); gap > 0; gap = parseInt(gap / 2)) {
        // console.log(gap);
        // gap组数据
        for (let i = gap; i < arr.length; i++) {
            for (let j = i - gap; j >= 0; j -= gap) {
                if (arr[j] > arr[j + gap]) {
                    temp = arr[j];
                    arr[j] = arr[j + gap];
                    arr[j + gap] = temp;
                }
            }
        }
    }
}


// 移动法
function ShellSort2(arr) {
    for (let gap = parseInt(arr.length / 2); gap > 0; gap = parseInt(gap / 2)) {
        for (let i = gap; i < arr.length; i++) {
            let j = i;
            let temp = arr[j];
            // 不同分组的数据插入排序交替进行的过程, 即每组插入排序的过程不是连续的
            // 这里其实是优化, 减少不必要的判断
            // 每组插入排序过程中, 要插入的数如果比已有的有序表最大的数还要大, 那就不用插入了
            if (arr[j] < arr[j - gap]) {

                while (j - gap >= 0 && temp < arr[j - gap]) {
                    // 先后移
                    arr[j] = arr[j - gap];
                    j -= gap;
                }

                // while循环结束后, 已经找到正确位置
                // 因为有了36行的判断, 能进到这里 j一定不等于i了
                arr[j] = temp;
            }
        }
    }
}


// let arr = [3, 9, -1, 10, -2];
let arr = [101, 34, 119, 1, -1, 90, 123];
// let arr = []; 
// for (let i = 0; i < 20; i++) {
//     arr[i] = Math.ceil(Math.random() * 100);
// }
ShellSort2(arr);

console.log('排序后：');
console.log(...arr);