# 熟练使用class

javascript 生成实例对象传统的方式是通过构造函数
```
function  Point (x,y) {
 this.x = x;
 this.y = y;
}

Point.prototype.toString = function () {
    return '('+this.x+ ',' + this.y + ')';
}

const p = new Point(1, 2)
```
es6的class就是有一个语法糖，他的绝大数功能es5都可以做到，新的class写法让对象原型的写法更加清晰，更像面向对象编程
```
class Point {
    constructor (x,y){
        this.x = x;
        this.y = y;
    }
    toString() {
        return '('+this.x+ ',' + this.y + ')';
    }
}
```
定义类的方法的时候，前面**不需要**加上function关键字，直接写上方法名，方法名之间**不需要逗号**。
``` 
class Point {

}
typeof Point // function
Point === Point.prototype.constructor // true
```
可以看出，类数据类型就是函数类型，类本身就是指向构造函数，因此可以使用**new命令**，跟构造函数的用法完全一致。
```
class Bar {
    doStuff () {
        console.log("stuff");
    }
}

const b = new Bar();
b.doStuff();
// "stuff"
```
构造函数的prototype属性，在ES6的“类”中是依然存在的，**类的所有方法都定义在类的prototype属性上面**。
```
class Point {
    constructor(){

    }
    toString(){

    }
    toValue(){

    }
}

//等同于
      Point.prototype = {
          constructor(){

          },
          toString(){

          },
          toValue(){

          }
      }
```
以上可知，在类实例上面的调用方法，其实就是调用原型上的方法。

另外，类的内部所有定义的方法，都是不可枚举的。
```
class Point {
    constructor(x,y){

    }
    toString() {

    }
}

Object.keys(Point.prototype) // []

Object.getOwnPropertyNames(Point.prototype);
 // ["constructor","toString"]
```
但是呢，在es5中的话，在原型链上定义的方法是可枚举的
```
const Point = function (x,y) {

}
Point.prototype.toString = function () {

};
 
Object.keys(Point.prototype) // ["toString"] 只获取可枚举的

Object.getOwnPropertyNames(Point.prototype);
 // ["constructor","toString"] 管你可不可枚举都获取到
```

类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。

考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。

## constructor
constructor方法是类的默认方法，通过new 命令生成的实例时，自动调用该方法
一个类必须有constructor方法，如果没有显式定义的话，那么会默认添加一个空的
constructor方法。
```
class Point{

}

// 等同于
class Point {
    constructor() {

    }
}
```
另外constructor方法默认返回的是实例对象(即this),并且我们可以返回另一个对象。


## class的静态方法
类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
```
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```
如果静态方法包含this关键字，这个this指的是类，而不是实例。
```
class Foo {
  static bar () {
    this.baz();
  }
  static baz () {
    console.log('hello');
  }
  baz () {
    console.log('world');
  }
}

Foo.bar() // hello
```
静态方法bar调用了this.baz，这里的this指的是Foo类，而不是Foo的实例，等同于调用Foo.baz。另外，从这个例子还可以看出，静态方法可以与非静态方法重名。
父类的静态方法，可以被子类继承,Class 内部只有静态方法，没有静态属性。
```
// 以下两种写法都无效
class Foo {
  // 写法一
  prop: 2

  // 写法二
  static prop: 2
}

Foo.prop // undefined
```

## 继承父类

```
class Son extends Father {
    constructor(){
        super() //调用父类constructor,必须调用否则不能创建子类的实例
        super.getFather() // 调用父类的方法。
    }
    getSonName(){
        super.getName() // 调用父类的getName()方法
    }
    static getSonName() {
        super.getName() // 调用父类的静态的getName()方法
    }
}
```