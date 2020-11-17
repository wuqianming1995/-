/**
 *  弗洛伊德算法 求最短路径, 是求每个顶点之间的最短路径
 *  时间复杂度：O(n^3)
 */

let N = Infinity;

class Graph {

    constructor(vertexs, matrix) {
        let len = vertexs.length;
        this.vertexs = [];
        // 距离表和前驱表   
        this.dis = initMatrix(len, len);
        this.pre = initMatrix(len, len);
        // 初始化
        for (let i = 0; i < len; i++) {
            this.vertexs[i] = vertexs[i];
            this.pre[i].fill(i);
            for (let j = 0; j < len; j++) {
                this.dis[i][j] = matrix[i][j];
            }
        }
    }


    show() {
        for (let k = 0; k < this.vertexs.length; k++) {
            let prePrint = this.pre[k].map(i => this.vertexs[i]);
            console.log(...prePrint);
            console.log('');
            let disPrint = this.dis[k].map((v,i) => `${this.vertexs[k]}到${this.vertexs[i]}的最短路径为：${v}`);
            console.log(...disPrint);
        }
    }


    floyd() {
        let len = 0, num = this.vertexs.length;
        let { dis, pre } = this;
        for (let k = 0; k < num; k++) {
            for (let i = 0; i < num; i++) {
                for (let j = 0; j < num; j++) {
                    len = dis[i][k] + dis[k][j];
                    if (len < dis[i][j]) {
                        dis[i][j] = len;
                        pre[i][j] = pre[k][j];
                    }
                }
            }
        }
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


let vertexs = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
let matrix = [
         /*A*//*B*//*C*//*D*//*E*//*F*//*G*/
    /*A*/[0, 5, 7, N, N, N, 2],
    /*B*/[5, 0, N, 9, N, N, 3],
    /*C*/[7, N, 0, N, 8, N, N],
    /*D*/[N, 9, N, 0, N, 4, N],
    /*E*/[N, N, 8, N, 0, 5, 4],
    /*F*/[N, N, N, 4, 5, 0, 6],
    /*G*/[2, 3, N, N, 4, 6, 0]
];

let graph = new Graph(vertexs, matrix);

graph.floyd();
graph.show();