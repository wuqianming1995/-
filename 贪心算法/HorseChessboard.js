/**
 *  马踏棋盘（骑士周游）问题
 *  递归 + 贪心算法优化
 */


class HorseChessboard {

    X; // 列
    Y; // 行
    visited = [];
    finished = false;

    constructor(x, y) {
        this.X = x;
        this.Y = y;
    }


    traversalChessboard(chessboard, row, column, step) {
        console.log(step);
        chessboard[row][column] = step;
        this.visited[row * this.X + column] = true;

        let ps = this.next(new Point(column, row));
        // 贪心算法优化
        this.sort(ps);
        while (ps.length > 0) {
            let point = ps.shift();
            // 如果该点还没有被访问过
            if (!this.visited[point.y * this.X + point.x]) {
                this.traversalChessboard(chessboard, point.y, point.x, step + 1);
            }
        }

        // 走到这里要回溯
        if (step < (this.X * this.Y) && !this.finished) {
            chessboard[row][column] = 0;
            this.visited[row * this.X + column] = false;
        } else {
            this.finished = true;
        }

    }


    next(curPoint) {
        // 下一步的point集合
        let ps = [];
        let x, y;
        // 5
        if ((x = curPoint.x - 2) >= 0 && (y = curPoint.y - 1) >= 0) {
            ps.push(new Point(x, y));
        }
        // 6
        if ((x = curPoint.x - 1) >= 0 && (y = curPoint.y - 2) >= 0) {
            ps.push(new Point(x, y));
        }
        // 7
        if ((x = curPoint.x + 1) < this.X && (y = curPoint.y - 2) >= 0) {
            ps.push(new Point(x, y));
        }
        // 0
        if ((x = curPoint.x + 2) < this.X && (y = curPoint.y - 1) >= 0) {
            ps.push(new Point(x, y));
        }
        // 1
        if ((x = curPoint.x + 2) < this.X && (y = curPoint.y + 1) < this.Y) {
            ps.push(new Point(x, y));
        }
        // 2
        if ((x = curPoint.x + 1) < this.X && (y = curPoint.y + 2) < this.Y) {
            ps.push(new Point(x, y));
        }
        // 3
        if ((x = curPoint.x - 1) >= 0 && (y = curPoint.y + 2) < this.Y) {
            ps.push(new Point(x, y));
        }
        // 4
        if ((x = curPoint.x - 2) >= 0 && (y = curPoint.y + 1) < this.Y) {
            ps.push(new Point(x, y));
        }

        return ps;
    }


    sort(ps) {
        ps.sort((a, b) => { return this.next(a).length - this.next(b).length });
    }

}


class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
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


let X = 8;
let Y = 8;
let row = 1;
let column = 1;

// 创建棋盘
let chessboard = initMatrix(X, Y);

let horseChessboard = new HorseChessboard(X, Y);
horseChessboard.traversalChessboard(chessboard, row - 1, column - 1, 1);
// 输出棋盘
printMatrix(chessboard);
