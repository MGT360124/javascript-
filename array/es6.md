
# Array.from 
方法将两类对象转为正真的数组: 类似数组的对象和可遍历的对象(包含es6 新增的数据结构set和map)

列子

```
let arrayLike = {
    '0':'a',
    '1': 'b',
    '2': 'c',
    length: 3
}
// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

```
常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。
