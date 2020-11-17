/**
 *  KMP算法
 *  如果文本串的长度为n, 模式串的长度为m, 那么匹配过程的时间复杂度为O(n)
 *  算上计算next的O(m)时间，KMP的整体时间复杂度为O(m + n)
 */



function KMPSearch(s, p, next) {

    for (let i = 0, j = 0; i < s.length; i++) {
        while (j > 0 && s[i] !== p[j]) {
            j = next[j - 1];
        }

        if (s[i] === p[j]) {
            j++;
        }
        // 找到了, 返回第一次出现的位置, 如果还想找后面的, 可以继续往下匹配（前面的位置用数组存起来）
        if (j === p.length) {
            return i - (j - 1);
        }
    }

    return -1;
}


// 求部分匹配表 用的是next(j-1) 相当于真正next数组的next(j)
// 例子：ABCDABD   ABCDABCE   ACADACAE
function getNext(p) {
    let next = [];
    next[0] = 0;

    for (let i = 1, j = 0; i < p.length; i++) {

        // 注意 j > 0 结束循环条件
        while (j > 0 && p[i] !== p[j]) {
            // 寻找更短的公共前后缀
            j = next[j - 1];
        }

        // 必须先放不等的情况在上面
        if (p[i] === p[j]) {
            j++;
        }

        // 可以理解为: 一开始j不动, i从1开始一直找到一个和j相等的字符
        next[i] = j;
    }

    return next;
}


let s = "BBC ABCDAB ABCDABCDABDE";
let p = "ABCDABD";
let next = getNext(p);
console.log("部分匹配表为：", ...next);

let index = KMPSearch(s, p, next);

console.log(`index:${index}`);