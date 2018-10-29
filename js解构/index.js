let [foo, [
    [bar], baz
]] = [1, [
    [2], 3
]];
// 解构
console.log(foo, bar, baz);

let [{
    id
}, {
    name
}] = [{
    id: "2018.10.30"
}, {
    name: "agree"
}];
// 解构
console.log(id, name);

// 解构的用途有
// 函数参数的默认值,
//  交换变量值
// [x,y] = [y,x];
// 函数返回多个值
// 返回一个数组

function example() {
    return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象

function example() {
    return {
        foo: 1,
        bar: 2
    };
}
let {
    foo,
    bar
} = example();

// 提取json数据
let jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309]
};

let {
    id,
    status,
    data: number
} = jsonData;

console.log(id, status, number);