/**
 *  迪杰斯特拉算法 求最短路径
 *  适用: 求单源最短路径(即某个固定顶点出发到其它顶点), 要求边的权值不能为负
 *  时间复杂度： O(n^2)
 */

let N = Infinity;

class Graph {

    visitedVertex;

    constructor(vertexs, matrix) {
        let num = vertexs.length;
        this.vertexs = [];
        this.matrix = initMatrix(num, num);
        // 初始化
        for (let i = 0; i < num; i++) {
            this.vertexs[i] = vertexs[i];
            for (let j = 0; j < num; j++) {
                this.matrix[i][j] = matrix[i][j];
            }
        }
    }

    showGraph() {
        printMatrix(this.matrix);
    }


    showDijkstra() {
        this.visitedVertex.show();
    }


    dijkstra(index) {
        this.visitedVertex = new VisitedVertex(this.vertexs.length, index);
        // 先更新起始点
        this.update(index);
        for (let i = 1; i < this.vertexs.length; i++) {
            index = this.visitedVertex.getNextVertex();
            this.update(index);
        }
    }


    update(index) {
        let len = 0;
        let vv = this.visitedVertex;
        for (let j = 0; j < this.matrix[index].length; j++) {
            // 出发顶点到index顶点的距离 + index顶点到j顶点的距离
            len = vv.getDis(index) + this.matrix[index][j];
            if (!vv.isVisited[j] && len < vv.getDis(j)) {
                vv.setPre(j, index);
                vv.setDis(j, len);
            }
        }
    }

}

// 已访问顶点集合
class VisitedVertex {

    constructor(vertexLength, index) {
        // 是否访问过
        this.isVisited = [];
        this.pre = [];
        this.dis = [];
        // 初始化
        for (let i = 0; i < vertexLength; i++) {
            this.isVisited[i] = false;
            this.pre[i] = index;
            this.dis[i] = N;
        }
        this.isVisited[index] = true;
        this.dis[index] = 0;
    }

    isVisited(index) {
        return this.isVisited[index];
    }

    getDis(index) {
        return this.dis[index];
    }

    setDis(index, len) {
        this.dis[index] = len;
    }

    // 设置pre的前驱为index
    setPre(pre, index) {
        this.pre[pre] = index;
    }


    // 选择下一个访问顶点
    getNextVertex() {
        let min = N;
        let index = 0;

        for (let i = 0; i < this.dis.length; i++) {
            if (!this.isVisited[i] && this.dis[i] < min) {
                min = this.dis[i];
                index = i;
            }
        }

        this.isVisited[index] = true;
        return index;
    }


    show() {
        console.log(...this.isVisited);
        console.log(...this.pre);
        console.log(...this.dis);
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
    /*A*/[N, 5, 7, N, N, N, 2],
    /*B*/[5, N, N, 9, N, N, 3],
    /*C*/[7, N, N, N, 8, N, N],
    /*D*/[N, 9, N, N, N, 4, N],
    /*E*/[N, N, 8, N, N, 5, 4],
    /*F*/[N, N, N, 4, 5, N, 6],
    /*G*/[2, 3, N, N, 4, 6, N]
];

let graph = new Graph(vertexs, matrix);

// graph.showGraph();

graph.dijkstra(6);  // 2 3 9 10 4 6 0
// graph.dijkstra(2);
graph.showDijkstra();