class Stack{
    constructor(){
        // dataStore 保存栈内元素
        this.dataStore = [];
        // top记录栈顶位置
        this.top = 0;
    }
    push(element){
        this.dataStore[this.top++] = element
    }
    pop(){
        return this.dataStore[--this.top]
    }
    peek(){
        return this.dataStore[this.top -1]
    }
    length(){
        return this.top
    }
}

let s  = new Stack()
s.push("mao");
s.push("guo");
s.push("tao");
console.log(s.dataStore)
console.log(s.pop())
console.log(s.dataStore)
console.log(s.peek())