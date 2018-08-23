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

