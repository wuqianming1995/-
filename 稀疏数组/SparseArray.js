
/**
 * 稀疏数组
 */

class SparseArray {

    // 二维数组 => 稀疏数组
    matrixToSparse(matrix) {
        //有效数据个数 
        let sum = 0;
        for (let row of matrix) {
            for (let value of row) {
                if (value !== 0) {
                    sum++;
                }
            }
        }

        let sparseArray = initMatrix(sum+1, 3);
        sparseArray[0][0] = matrix.length;
        sparseArray[0][1] = matrix[0].length;
        sparseArray[0][2] = sum;

        //转换 
        let count = 0;
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] !== 0) {
                    count++;
                    sparseArray[count] = [i, j, matrix[i][j]];
                }
            }
        }

        return sparseArray;
    }

    // 稀疏数组 => 二维数组
    sparseToMatrix(sparseArray) {
        // 根据sparseArray[0][0] 和sparseArray[0][1] 创建二维数组
        let matrix = initMatrix(sparseArray[0][0], sparseArray[0][1]);
        
        // 转换
        for (let i = 1; i < sparseArray.length; i++) {
            matrix[sparseArray[i][0]][sparseArray[i][1]] = sparseArray[i][2];
        }

        return matrix;
    }
}

// 初始化二维数组
let matrix = initMatrix(11, 11)
matrix[1][2] = 1;
matrix[2][3] = 2;
// printArr(matrix);

//测试
let spa = new SparseArray();
let sparseArr = spa.matrixToSparse(matrix);
// printArr(sparseArr);

matrix = spa.sparseToMatrix(sparseArr);
printMatrix(matrix);


function initMatrix(len1, len2){
    let matrix = [];
    for (let i = 0; i < len1; i++) {
        matrix[i] = [];
        for (let j = 0; j < len2; j++) {
            matrix[i][j] = 0;
        }
    }
    return matrix;
}

function printMatrix(arr){
    for(let row of arr){
        console.log(...row);
    }
}