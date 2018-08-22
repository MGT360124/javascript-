# 基本概念
generator函数是ES6提供的一种异步编程解决方案，语法行为与传统函数完全不同。generator（发电机，发生者，生产者）
Generator函数有多种理解角度，从语法上，Generator函数是一个状态机，封装了多个内部状态。

执行Generator函数会返回一个遍历器对象，也就是说，Generator函数除了状态机，还是一个遍历器对象生成函数，返回的遍历器对象，可以依次遍历Generator函数内部的每个状态。
形式上，Generator函数是一个普通的函数，但是有两个特征：

一，function关键字与函数名之间有个星号*；

二，函数体内部使用yield表达式，定义不同的内部状态（yield“产出”）
```
function* helloWorldGenerator () {
       yield "hello";
        yield "world";
         return "ending";  
}
var hw = helloworldGenerator();
```
定义一个Generator函数helloWorldGenerator，它内部有两个yield表达式（hello和world）,即该函数有三个状态：hello，world和return语句;

Generator函数的调用方法与普通函数一样，也就是在函数名后面加上一对圆括号，不同的是，调用Generator函数后，该函数并不执行，返回的也不是函数运行的结果，而是一个指向内部状态的指针对象；
下一步，必须调用遍历器对象的next方法，使得指向移向下一个状态，也就是说每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。
也就是说，**Generator函数是分段执行的，yield表达式是暂时执行的标记，而next方法可以恢复执行。**

```
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```
第一次调用，Generator 函数开始执行，直到遇到第一个yield表达式为止。next方法返回一个对象，它的value属性就是当前yield表达式的值hello，done属性的值false，表示遍历还没有结束。

第二次调用，Generator 函数从上次yield表达式停下的地方，一直执行到下一个yield表达式。next方法返回的对象的value属性就是当前yield表达式的值world，done属性的值false，表示遍历还没有结束。

第三次调用，Generator 函数从上次yield表达式停下的地方，一直执行到return语句（如果没有return语句，就执行到函数结束）。next方法返回的对象的value属性，就是紧跟在return语句后面的表达式的值（如果没有return语句，则value属性的值为undefined），done属性的值true，表示遍历已经结束。

第四次调用，此时 Generator 函数已经运行完毕，next方法返回对象的value属性为undefined，done属性为true。以后再调用next方法，返回的都是这个值。

**二，yield表达式**
因为Generator函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数，yield表达式就是暂停标志。
遍历器对象的next方法的运行逻辑如下：
（1）遇到yield表达式，是暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值；
（2）下一次调用next方法时，再继续往下执行,直到遇到下一个yield表达式；
（3）如果没有遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值；
（4）如果该函数没有return语句，则返回的对象的value属性值为undefined；
**yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。**
**next方法的参数**
yield表达式本身没有返回值，或者说返回值为undefined，next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值；

```
function* fn(){
        for(var i = 0 ; true ; i++) {
                 var reset = yield i;
                   if(reset) {i=-1}
            }
}
var g = fn();
g.next();
//Object {value: 0, done: false}
g.next();
//Object {value: 1, done: false}
g.next(true);
//Object {value: 0, done: false}
```
上面代码先定义了一个可以无限运行的 Generator 函数f，如果next方法没有参数，每次运行到yield表达式，变量reset的值总是undefined。当next方法带一个参数true时，变量reset就被重置为这个参数（即true），因此i会等于-1，下一轮循环就会从-1开始递增。
**for ...of循环**
for...of循环可以自动遍历 Generator 函数时生成的Iterator对象，且此时不再需要调用next方法。

```
function *foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5
```
上面代码使用for...of循环，依次显示5个yield表达式的值。这里需要注意，一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象，所以上面代码的return语句返回的6，不包括在for...of循环之中。