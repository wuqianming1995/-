/**
 *  汉诺塔
 */


function HanoiTower(num, a, b, c) {
    if (num === 1) {
        console.log(`第1个盘从${a} => ${c}`);
    } else {
        // num > 2, 看做两个盘, 最下面一个, 上面的所有当做一个, 不断分解, 合并
        HanoiTower(num - 1, a, c, b);
        console.log(`第${num}个盘从${a} => ${c}`);
        HanoiTower(num - 1, b, a, c);
    }
}

// HanoiTower(5, 'A', 'B', 'C');
HanoiTower(3, 'A', 'B', 'C');