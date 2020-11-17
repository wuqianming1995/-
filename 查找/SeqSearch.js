/**
 * 顺序(线性)查找
 */

function SeqSearch(arr, value) {

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            return i;
        }
    }

    return -1;
}



let arr = [1, 9, 11, -1, 34, 89];
// let index = SeqSearch(arr, 34);
let index = SeqSearch(arr, -11);

if (index === -1) {
    console.log(`没有找到`);
}else{
    console.log(`找到, 下标为：${index}`);
}