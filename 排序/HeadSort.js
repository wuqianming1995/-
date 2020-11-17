/**
 *  堆排序
 */

 
function HeapSort(arr) {

    // 第一次从最后一个非叶子结点开始调整, (n-1)-1/2  =>  parseInt(arr.length / 2) - 1
    for (let i = parseInt(arr.length / 2) - 1; i >= 0; i--) {
        adjustHeap(arr, i, arr.length);
    }

    // n - 1 轮
    let temp;
    for (let j = arr.length - 1; j > 0; j--) {
        temp = arr[j];
        arr[j] = arr[0];
        arr[0] = temp;

        // 1.为什么第二个参数为0？
        //   因为最上面的for循环已经将所有非叶子结点调整过, 而在这个for循环中, 每次变更的只是根节点, 所以只需调整根节点即可
        // 2.最后一轮交换后其实已经不用调用adjustHeap了 (调整的序列长度到 j-1)
        adjustHeap(arr, 0, j);
    }
}

// 调整堆
function adjustHeap(arr, i, length) {

    let temp = arr[i];

    for (let k = 2 * i + 1; k < length; k = 2 * k + 1) {

        if (k + 1 < length && arr[k] < arr[k + 1]) {
            k++;
        }

        if (arr[k] > temp) {
            arr[i] = arr[k];
            i = k; // i下移
        } else {
            break;
        }
    }

    arr[i] = temp;
}

let arr = [4, 6, 8, 5, 9];
// let arr = []; 
// for (let i = 0; i < 20; i++) {
//     arr[i] = Math.ceil(Math.random() * 100);
// }
HeapSort(arr);

console.log('排序后：');
console.log(...arr);