/**
 *  图（dfs、bfs）
 */

class Graph {
    verTexList;       // 顶点集合
    edges;            // 领接矩阵
    numOfEgdes;
    isVisited = [];

    constructor(n) {
        this.verTexList = [];
        this.edges = initMatrix(n, n);
        this.numOfEgdes = 0;
    }

    // 深度优先遍历
    dfs(isVisited, i) {
        process.stdout.write(`${this.getValueByIndex(i)} => `);
        isVisited[i] = true;

        // 第一个邻接顶点
        let w = this.getFirstNeighbor(i);
        while (w !== -1) {
            if (!isVisited[w]) {
                this.dfs(isVisited, w);
            }

            w = this.getNextNeighbor(i, w);
        }
    }

    // 对所有顶点循环dfs
    dfsGraph() {
        this.isVisited = [];
        let count = 0;
        // 为什么要循环对所有顶点dfs？
        // 连通图从起始顶点dfs一次即可, 但是非连通图如果不循环的话, 就会少遍历一些顶点
        for (let i = 0; i < this.getNumOfVertexs(); i++) {
            if (!this.isVisited[i]) {
                console.log(`${++count}次dfs`);
                this.dfs(this.isVisited, i);
            }
        }
    }

    // 广度优先遍历
    bfs(isVisited, i) {

        let u;
        let w;
        let queue = [];

        process.stdout.write(`${this.getValueByIndex(i)} => `);
        isVisited[i] = true;
        queue.push(i);

        while (queue.length > 0) {
            u = queue.shift();
            w = this.getFirstNeighbor(u);

            while (w !== -1) {
                if (!isVisited[w]) {
                    process.stdout.write(`${this.getValueByIndex(w)} => `);
                    isVisited[w] = true;
                    queue.push(w);
                }

                w = this.getNextNeighbor(u, w);
            }
        }
    }

    // 对所有顶点循环bfs
    bfsGraph() {
        this.isVisited = [];
        let count = 0;
        for (let i = 0; i < this.getNumOfVertexs(); i++) {
            if (!this.isVisited[i]) {
                console.log(`${++count}次bfs`);
                this.bfs(this.isVisited, i);
            }
        }
    }


    getFirstNeighbor(i) {
        for (let j = 0; j < this.verTexList.length; j++) {
            if (this.edges[i][j] > 0) {
                return j;
            }
        }
        return -1;
    }

    getNextNeighbor(i, w) {
        for (let j = w + 1; j < this.verTexList.length; j++) {
            if (this.edges[i][j] > 0) {
                return j;
            }
        }
        return -1;
    }

    // 顶点数量
    getNumOfVertexs() {
        return this.verTexList.length;
    }

    // 边数量
    getNumOfEdges() {
        return this.numOfEgdes;
    }

    getValueByIndex(i) {
        return this.verTexList[i];
    }

    getWeight(v1, v2) {
        return this.edges[v1][v2];
    }

    showGraph() {
        printMatrix(this.edges);
    }

    // 插入顶点
    insertVertex(vertex) {
        this.verTexList.push(vertex);
    }

    // 插入边
    insertEdges(v1, v2, weight) {
        this.edges[v1][v2] = weight;
        this.edges[v2][v1] = weight;
        this.numOfEgdes++;
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

let graph;
// 初始化数据
(function () {
    // let n = 5;
    // let vertexs = ["A", "B", "C", "D", "E"];
    let n = 8;
    let vertexs = ["1", "2", "3", "4", "5", "6", "7", "8"];
    graph = new Graph(n);
    // 添加顶点
    for (let vertex of vertexs) {
        graph.insertVertex(vertex);
    }

    // 添加边
    // graph.insertEdges(0, 1, 1);
    // graph.insertEdges(0, 2, 1);
    // graph.insertEdges(1, 2, 1);
    // graph.insertEdges(1, 3, 1);
    // graph.insertEdges(1, 4, 1);
    graph.insertEdges(0, 1, 1);
    graph.insertEdges(0, 2, 1);
    graph.insertEdges(1, 3, 1);
    graph.insertEdges(1, 4, 1);
    graph.insertEdges(3, 7, 1);
    graph.insertEdges(4, 7, 1);
    graph.insertEdges(2, 5, 1);
    graph.insertEdges(2, 6, 1);
    graph.insertEdges(5, 6, 1);
    // console.log(`顶点的数量：${graph.getNumOfVertexs()}`);
    // console.log(`边的数量：${graph.getNumOfEdges()}`);
    // graph.showGraph();
})();


console.log('深度优先遍历：');
graph.dfsGraph();

console.log();
console.log();

console.log('广度优先遍历：');
graph.bfsGraph();


