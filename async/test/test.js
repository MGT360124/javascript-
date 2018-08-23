const fs = require("fs");

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
    console.log(f1.toString());
    console.log(f1.toString());
}