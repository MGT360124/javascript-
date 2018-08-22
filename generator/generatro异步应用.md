异步编程对js语言太重要了,js语言的执行环境是 ‘单线程‘ 的，如果没有异步编程,根本没法用。
ES6之前，异步编程的方法有四种:
(1)回调函数；
(2)事件监听；
(3)发布/订阅;
(4)promise对象;
Generator函数将js异步编程带入了全新的阶段;
**基本概念**

**“异步”**就是一个任务不是连续完成的，可以理解为该任务是被人为的分成两段，先执行一段，然后转而执行其他任务，等做好准备，再回过头来执行第二段；
例如，有一个任务是读取文件进行处理，任务的第一段是向操作系统发出请求，要求读取文件，然后，程序执行其他任务，等到操作系统返回文件，再接着执行任务的第二阶段,这种不连续的执行，就叫异步;

**回调函数**
js语言对异步编程的实现，就是回调函数，所谓回调函数，就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务时候，就直接调用这个函数；callback（重新调用）

```
fs.readFile( "/etc/passwd", 'utf-8' , function (err, data) {
           if(err) throw err;
           console.log(data);
})
```
读取文件进行处理，readFile函数的第三个参数，就是回调函数，也就是任务的第二段，等到操作系统返回了/etc/passwd这个文件以后，回调函数才会执行。
回调函数本身并没有问题，他的问题是出现多个回调函数嵌套，假设独处文件A之后，再读取文件B:

```
fs.readFile( fileA, "utf-8", function (err, data ) {
          fs.readFile( fileB, "utf-8", function ( err, data ) {
                      //... 
           })
})
```
如果依次读取两个以上的文件，就会出现多重嵌套。代码不是纵向发展，而是横向发展，很快就会乱成一团，无法管理。因为多个异步操作形成了强耦合，只要有一个操作需要修改，它的上层回调函数和下层回调函数，可能都要跟着修改。这种情况就称为"回调函数地狱"（callback hell）。

**Promise对象**

Promise 对象就是为了解决这个问题而提出的。它不是新的语法功能，而是一种新的写法，允许将回调函数的嵌套，改成链式调用。采用 Promise，连续读取多个文件，写法如下。

```
var readFile = require('fs-readfile-promise');

readFile(fileA)
.then(function (data) {
  console.log(data.toString());
})
.then(function () {
  return readFile(fileB);
})
.then(function (data) {
  console.log(data.toString());
})
.catch(function (err) {
  console.log(err);
});
```
我使用了fs-readfile-promise模块，它的作用就是返回一个 Promise 版本的readFile函数。Promise 提供then方法加载回调函数，catch方法捕捉执行过程中抛出的错误。

可以看到，Promise 的写法只是回调函数的改进，使用then方法以后，异步任务的两段执行看得更清楚了，除此以外，并无新意。

Promise 的最大问题是代码冗余，原来的任务被 Promise 包装了一下，不管什么操作，一眼看去都是一堆then，原来的语义变得很不清楚。

## Generator 函数 ##
整个Generator函数就是一个封装的异步任务，或者硕士异步任务的容器，异步操作需要暂停的地方，都用yield语句注明

```
function* gen(x) {
       var y = yield x + 2;
         return y;
}
var g = gen(1);
g.next();// { value: 3, done: false }
g.next(); // { value: undefined, done: true }
```
调用 Generator 函数，会返回一个内部指针（即遍历器）g。这是 Generator 函数不同于普通函数的另一个地方，即执行它不会返回结果，返回的是指针对象。调用指针g的next方法，会移动内部指针（即执行异步任务的第一段），指向第一个遇到的yield语句，上例是执行到x + 2为止。

换言之，next方法的作用是分阶段执行Generator函数。每次调用next方法，会返回一个对象，表示当前阶段的信息（value属性和done属性）。value属性是yield语句后面表达式的值，表示当前阶段的值；done属性是一个布尔值，表示 Generator 函数是否执行完毕，即是否还有下一个阶段。
**Generator 函数的数据交换和错误处理**
Generator函数可以暂停和恢复执行，这是他能封装异步任务的根本原因,除此他还有两个特性：使得他可以作为异步编程的完整解决方法，函数体内外的数据交换和错误处理机制；
next返回值的value属性，是Generator函数向外输出数据，next方法还可以接受参数，向Generator函数体内输入数据。

```
function* gen(x){
  var y = yield x + 2;
  return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next(2) // { value: 2, done: true }
```
上面代码中，第一next方法的value属性，返回表达式x + 2的值3。第二个next方法带有参数2，这个参数可以传入 Generator 函数，作为上个阶段异步任务的返回结果，被函数体内的变量y接收。因此，这一步的value属性，返回的就是2（变量y的值）。
Generator 函数内部还可以部署错误处理代码，捕获函数体外抛出的错误。

```
function * gen (x) {
  try{
        var y = yield  x + 2;
     }catch (e) {
     console.log(e);
     }
     return y;
}

var g =gen(1);
g.next();
g.throw("出错了");
//出错了
```
上面代码的最后一行，Generator 函数体外，使用指针对象的throw方法抛出的错误，可以被函数体内的try...catch代码块捕获。这意味着，出错的代码与处理错误的代码，实现了时间和空间上的分离，这对于异步编程无疑是很重要的。

**如何使用Generator函数：异步任务的封装**
-----------

```
var fetch = require("node-fetch");
function * gen () {
       var url = "https://api.github.com/users/github";
        var result = yield fetch(url);
        console.log(result.bio);  
}
```
Generator函数封装了一个异步操作,该操作先读取一个远程接口，然后从json格式的数据解析信息，就像前面说过的，这段代码非常像同步操作，除了加上yield命令；执行这段代码的方法：

```
var g = gen();
var result = g.next();

result.value.then( function (data) {
       return data.json();
}).then(function(data){
        g.next(data);
});
```
首先执行generator函数，获取遍历器对象，然后使用next方法(第二行)，执行异步任务的第一阶段，由于fetch模块返回的是一个promise对象，因此要用then方法调用下一个next方法；