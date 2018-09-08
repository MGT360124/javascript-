// 创建一个记录学生成绩的对象，
// 提供一个添加成绩的方法，
// 以及一个显示学生平均成绩的方法。

let obj = [];
/**
 * 添加成绩
 * 
 * @param {any} score 
 */
function addScore(score) {
    obj.push(score)
}
/**
 * 就平均成绩
 * 
 * @param {any} obj 
 * @returns 
 */
function avgScore(obj) {
    if(obj.length > 0){
        let totleScore = 0;
    for (let j in obj) {
        totleScore +=  obj[j]
    }
    return (totleScore/obj.length).toFixed(2);
    }
}
addScore(70);
addScore(62)
addScore(80)

console.log(avgScore(obj))
