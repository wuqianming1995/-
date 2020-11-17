/**
 *  普里姆算法 求最小生成树
 *  实质是找顶点, 稠密图即边数较多的情况, 效率更高
 *  时间复杂度： 领接矩阵：O(n^2) n为顶点个数
 */

class Graph {
    vertexs; // 顶点个数
    data;    // 顶点集合
    weight;  // 边

    constructor(vertexs, data, weight) {
        this.vertexs = vertexs;
        this.data = [];
        this.weight = initMatrix(vertexs, vertexs);
        for (let i = 0; i < vertexs; i++) {
            this.data[i] = data[i];
            for (let j = 0; j < vertexs; j++) {
                this.weight[i][j] = weight[i][j];
            }
        }
    }


    showGraph() {
        printMatrix(this.weight);
    }

    // 普里姆算法
    prim(v) {

        // 顶点个数
        let num = this.vertexs;
        let visited = {};
        visited[v] = true;

        // 边的两个顶点下标
        let h1 = -1;
        let h2 = -1;
        let minWeight = 10000;

        // num - 1条边
        console.log('最小生成树为：');
        for (let k = 1; k < num; k++) {
            for (let i = 0; i < num; i++) {
                for (let j = 0; j < num; j++) {
                    if (visited[i] && !visited[j] && this.weight[i][j] < minWeight) {
                        minWeight = this.weight[i][j];
                        h1 = i;
                        h2 = j
                    }
                }
            }
            console.log(`边<${this.data[h1]}, ${this.data[h2]}> 权:${this.weight[h1][h2]}`);
            // 找到一条边后将h2顶点标记为访问, 下次就从所有已访问过的顶点找
            visited[h2] = true;
            minWeight = 10000;
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

let data = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
let vertexs = data.length;
let weight = [
    [10000, 5, 7, 10000, 10000, 10000, 2],
    [5, 10000, 10000, 9, 10000, 10000, 3],
    [7, 10000, 10000, 10000, 8, 10000, 10000],
    [10000, 9, 10000, 10000, 10000, 4, 10000],
    [10000, 10000, 8, 10000, 10000, 5, 4],
    [10000, 10000, 10000, 4, 5, 10000, 6],
    [2, 3, 10000, 10000, 4, 6, 10000]
];

let graph = new Graph(vertexs, data, weight);

// graph.showGraph();

// graph.prim(0);
graph.prim(1);