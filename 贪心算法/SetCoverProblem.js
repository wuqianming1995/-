/**
 *  集合覆盖问题
 */


function SetCoverProblem(broadcasts, allAreas) {

    let selects = [];
    let maxKey;
    let maxSize;
    // 不为0, 即还没有覆盖到所有地区
    while (allAreas.length !== 0) {
        maxKey = null;
        maxSize = 0;
        for (let key in broadcasts) {
            // 求交集
            let tempSet = broadcasts[key].filter(area => new Set(allAreas).has(area));
            if (tempSet.length > 0 && (!maxSize || tempSet.length > maxSize)) {
                maxKey = key;
                maxSize = tempSet.length;
            }
        }
        // 选出覆盖最多未覆盖地区的电台
        if (maxKey) {
            selects.push(maxKey);
            allAreas = allAreas.filter(area => !broadcasts[maxKey].includes(area));
        }
    }

    console.log(`得到的选择结果是：`, ...selects);
}

let broadcasts = {};
broadcasts['K1'] = ['北京', '上海', '天津'];
broadcasts['K2'] = ['广州', '北京', '深圳'];
broadcasts['K3'] = ['成都', '上海', '杭州'];
broadcasts['K4'] = ['上海', '天津'];
broadcasts['K5'] = ['杭州', '大连'];

let allAreas = ['北京', '上海', '天津', '广州', '深圳', '成都', '杭州', '大连'];


SetCoverProblem(broadcasts, allAreas);