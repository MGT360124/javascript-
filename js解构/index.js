let [foo, [ [bar], baz]] = [1, [ [2], 3]];
// 解构
console.log(foo,bar,baz);

let [{id},{name}] = [{id:"2018.10.30"},{name:"agree"}];
// 解构
console.log(id,name);
