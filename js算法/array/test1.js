// 创建一个对象，它将字母存储在一个数组中，并且用一个方法可以将字母连接在一起，显示成一个单词
let arr = ["mao","guo","tao"];
/**
 * 
 * 
 * @param {any} arr 
 * @returns 
 */
function connectAlphabet (arr){
    let letter = ""
    for(let i in arr){
        letter += arr[i]
    }
    return letter
}

console.log(connectAlphabet(arr))