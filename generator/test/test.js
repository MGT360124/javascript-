const fs = require("fs");


const Bar = function *(){
    const a = yield 1;
    const b = yield 2;
    console.log('a')
    console.log(a);
    console.log('b')
    console.log(b)
}

const b = Bar();
// g.next();
console.log("第一个b.next()",b.next())
// g.next();
console.log("第二个b.next()",b.next())

console.log("第三个b.next()",b.next())












const readFile = function (fileName){
    return new Promise((resolve,reject)=>{
        fs.readFile(fileName, (error,data) =>{
            if(error) return reject(error);
            resolve(data);
        })
    })
}

const gen = function * () {
    const f1 = yield readFile("file1.txt");
    const f2 = yield readFile("file2.txt");
    console.log('f1');
    console.log(f1); // undefined
    console.log('f2');
    console.log(f2); // undefined
}
const g = gen();

// // g.next();
console.log("第一个g.next()",g.next())
// g.next();
console.log("第二个g.next()",g.next())

console.log("第三个g.next()",g.next())
