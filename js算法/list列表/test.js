class List {
    constructor() {
        this.listSize = 0;
        this.pos = 0;
        this.dataStore = [];
    }
    /**
     * 查找元素的位置
     * 
     * @param {any} element 
     * @returns 
     * @memberof List
     */
    find(element) {

        for (let j in this.dataStore) {
            if (this.dataStore[j] == element) {
                return j
            }
        }
        return -1
    }
    /**
     * 返回这个dataStore的字符串
     * 
     * @returns 
     * @memberof List
     */
    toString() {
        return this.dataStore.toString()
    }
    /**
     * 给列表的下一个位置增加一个新的元素，这个位置等于变量listSize的值
     * 
     * @param {any} element 
     * @memberof List
     */
    append(element) {
        this.dataStore[this.listSize++] = element
    }
    /**
     * 删除一个元素并且fontSize-- 
     * 
     * @param {any} element 
     * @returns 
     * @memberof List
     */
    remove(element) {
        let foundAt = this.find(element);
        if (foundAt > -1) {
            this.dataStore.splice(foundAt, 1);
            this.fontSize--;
            return true;
        }
        return false;
    }
    /**
     * 设置位置为0
     * 
     * @memberof List
     */
    front() {
        this.pos = 0;
    }
    /**
     * 设置位置为listSize-1
     * 
     * @memberof List
     */
    end() {
        this.pos = this.listSize - 1;
    }

    prev(){
       if(this.pos > 0 ){
           --this.pos
       }
    }
    next(){
        if(this.pos < this.listSize -1){
            ++this.pos
        }
    }

    /**
     * 返回 dataStore的长度
     * 
     * @returns 
     * @memberof List
     */
    length() {
        return this.fontSize
    }
    /**
     * 在 after 元素之后 插入 element 元素
     * 
     * @param {any} element 
     * @param {any} after 
     * @returns 
     * @memberof List
     */
    insert(element, after) {
        let insertPos = this.find(after)
        if (insertPos > -1) {
            this.dataStore.splice(insertPos + 1, 0, element)
            this.listSize++
            return true
        }
        return false
    }
    /**
     * 清除元素
     * 
     * @memberof List
     */
    clear() {
        delete this.dataStore;
        this.dataStore = [];
        this.listSize = 0;
        this.pos = 0;
    }

    currPos() { 
        return this.pos
    }
    moveTo(position) { 
        this.pos = position
    }

    getElement() {
        return this.dataStore[this.pos]
    }
    /**
     * 返回一个dataStore是否包含element
     * 
     * @param {any} element 
     * @returns 
     * @memberof List
     */
    contains(element) {
        for (let i in this.dataStore) {
            if (this.dataStore[i] === element) {
                return true
            }
        }
        return false
    }
}

let list = new List();

list.append("mao");
list.append("guo");
list.append("tao");
console.log(list.toString())
console.log("this.dataStore", list.dataStore);
list.length();
