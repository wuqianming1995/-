/**
 * 迷宫问题
 */


class MiGong {
    // i, j 表示从哪个点开始
    // 约定：当 map[i][j]为 0:该点没有走过   1:墙    2:通路可以走 3:走不通,死路
    // return true用于回溯的时候返回值
    setWay(map, i, j) {
        if (map[6][5] === 2) {  // 到哪个点结束
            return true;
        } else {
            // 防止走到超出迷宫范围
            if(map[i] == undefined || !map[i][j] == undefined){
                return false;
            }
            // 该点未走过
            if (map[i][j] === 0) { 
                map[i][j] = 2;     // 假定可以走
                if (this.setWay(map, i + 1, j)) {  // 下
                    return true;
                } else if (this.setWay(map, i, j + 1)) {  // 右
                    return true;
                } else if (this.setWay(map, i - 1, j)) {  // 上
                    return true;
                } else if (this.setWay(map, i, j - 1)) {  // 左
                    return true;
                } else {
                    map[i][j] = 3;  // 走不通，再置为死路
                    return false;
                }
            } else {
                return false;  // map[i][j] 可能为 1（墙） 2（可以走，已经走过） 3（死路）
            }
        }
    }

    // 可以换不同的走法、策略
    setWay2(map, i ,j){
        //.... 上、右、下、左等
    }

}

let miGong = new MiGong();
let map = initMatrix(8, 7);
setWall(map);

console.log('原始迷宫：');
printMatrix(map);
console.log('');


let flag = miGong.setWay(map, 1, 1);
console.log("是否可以走通：" + flag);
console.log('走过后的迷宫：');
printMatrix(map);


function setWall(map) {
    for (let i = 0; i < 7; i++) {
        map[0][i] = 1;
        map[7][i] = 1;
    }

    for (let i = 0; i < 8; i++) {
        map[i][0] = 1;
        map[i][6] = 1;
    }

    map[3][1] = 1;
    map[3][2] = 1;
}


function initMatrix(len1, len2) {
    let matrix = [];
    for (let i = 0; i < len1; i++) {
        matrix[i] = [];
        for (let j = 0; j < len2; j++) {
            matrix[i][j] = 0;
        }
    }
    return matrix;
}

function printMatrix(arr) {
    for (let row of arr) {
        console.log(...row);
    }
}