const fs = require("fs");

const readFile = function (fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (error, data) => {
            if (error) return reject(error);
            resolve(data);
        })
    })
}

async function gen() {
    const f1 = await readFile("file1.txt");
    const f2 = await readFile("file2.txt");
    const a = await 1;
    const b = await 2;
    console.log('f1');
    console.log(f1);  // <Buffer 68 65 6c 6c 6f 20 e6 96 87 e4 bb b6 31>
    console.log('f2');
    console.log(f2); // <Buffer 68 65 6c 6c 6f 20 e6 96 87 e4 bb b6 32>
    console.log('a');
    console.log(a);  // 1
    console.log('b');
    console.log(b); // 2
    return a + b;
}
gen().then(data => {
    console.log("data", data) //  gen()函数return的返回值
}).catch(err => {
    console.log("err", err)  // gen()函数内部的错误，会被catch到
});


// async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。
// 抛出的错误对象会被catch方法回调函数接收到。


// async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，
// 才会发生状态改变，除非遇到return语句或者抛出错误。
// 也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。

// await
// await命令后面是一个 Promise 对象。如果不是，会被转成一个立即resolve的 Promise 对象。
// await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到

// 注意点
// 前面已经说过，await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。
// 多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
// await命令只能用在async函数之中，如果用在普通函数，就会报错。