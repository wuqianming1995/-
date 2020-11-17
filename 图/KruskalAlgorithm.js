/**
 *  克鲁斯卡尔算法 求最小生成树
 *  实质是找边, 稀疏图即边少的情况, 效率更高
 *  时间复杂度： 领接矩阵：O(eloge) e为边数
 */

let INF = Infinity;

class Graph {
    edgeNum;  // 边的数量
    vertexs;  // 顶点数组
    matrix;   // 领接矩阵 
    // 使用INF表示两个顶点之间不能连通
    INF = Infinity;

    constructor(vertexs, matrix) {
        let num = vertexs.length;
        // 初始化
        this.edgeNum = 0;
        this.vertexs = [];
        this.matrix = initMatrix(num, num);
        for (let i = 0; i < num; i++) {
            this.vertexs[i] = vertexs[i];
            for (let j = 0; j < num; j++) {
                this.matrix[i][j] = matrix[i][j];
            }
        }
        // 统计边的条数, 无向图, 所以只统计对角线上一半即可
        for (let i = 0; i < num; i++) {
            for (let j = i + 1; j < num; j++) {
                if (this.matrix[i][j] !== this.INF) {
                    this.edgeNum++;
                }
            }
        }
    }


    // 克鲁斯卡尔算法
    kruskal() {
        let ends = {};      // 保存顶点在最小生成树中的终点
        let mstEdges = [];  // 最小生成树的边集合

        let edges = this.getEdges();
        console.log(edges.length);
        // 按边的权排序
        this.sortEdges(edges);

        // 实际上, 找到 顶点数 - 1 条边后, 后面的循环不起作用了, 因为此时任何一条边都会构成回路
        for (let i = 0; i < this.edgeNum; i++) {
            // 两顶点下标
            let p1 = this.getPosition(edges[i].start);
            let p2 = this.getPosition(edges[i].end);
            // 两顶点在最小生成树中的终点
            let m = this.getEnd(ends, p1);
            let n = this.getEnd(ends, p2);

            if (m !== n) { // 没有构成回路
                ends[m] = n;
                mstEdges.push(edges[i]);
            }
        }

        console.log('最小生成树为：');
        for (let edge of mstEdges) {
            console.log(`边<${edge.start}, ${edge.end}> 权:${edge.weight}`);
        }

    }

    showGraph() {
        printMatrix(this.matrix);
    }


    getEdges() {
        let edges = [];
        let num = this.vertexs.length;
        for (let i = 0; i < num; i++) {
            for (let j = i + 1; j < num; j++) {
                if (this.matrix[i][j] !== this.INF) {
                    edges.push(new edge(this.vertexs[i], this.vertexs[j], this.matrix[i][j]));
                }
            }
        }
        return edges;
    }


    sortEdges(edges) {
        let n = edges.length;
        let temp;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - 1 - i; j++) {
                if (edges[j].weight > edges[j + 1].weight) {
                    temp = edges[j];
                    edges[j] = edges[j + 1];
                    edges[j + 1] = temp;
                }
            }
        }
    }


    getPosition(ch) {
        for (let i = 0; i < this.vertexs.length; i++) {
            if (this.vertexs[i] == ch) {
                return i;
            }
        }
        return -1;
    }


    getEnd(ends, i) {
        while (ends[i]) {
            i = ends[i];
        }
        return i;
    }

}

// 边对象
class edge {
    constructor(start, end, weight) {
        this.start = start;
        this.end = end;
        this.weight = weight;
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
    /*A*/[0, 12, INF, INF, INF, 16, 14],
    /*B*/[12, 0, 10, INF, INF, 7, INF],
    /*C*/[INF, 10, 0, 3, 5, 6, INF],
    /*D*/[INF, INF, 3, 0, 4, INF, INF],
    /*E*/[INF, INF, 5, 4, 0, 2, 8],
    /*F*/[16, 7, 6, INF, 2, 0, 9],
    /*G*/[14, INF, INF, INF, 8, 9, 0]
];

let graph = new Graph(vertexs, matrix);

// graph.showGraph();
graph.kruskal();