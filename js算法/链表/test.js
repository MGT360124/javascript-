// element 用来保存节点上的数据，next 用来保存指向下一个节点的 链接
class Node {
    constructor(element){
        // element用来保存节点的数据
        this.element= element;
        // next用来保存指向下一个节点的连接
        this.next = null;
    }
}

// LinkedList类提供了对链表进行操作的方法，该类的功能
// 包含插入删除节点
class LinkedList{
    head = new Node("head")
    find(item){
       let currNode = this.head;
       while (currNode.element !=item) {
          currNode = currNode.next;
       }
       return currNode;
    }
    insert(newElement,item){
        let newNode = new Node(newElement)
        let current = this.find(item)
        newNode.next = current.next
        current.next = newNode
    }
    remove(){}
    display(){
        let currNode = this.head
        while(!(currNode)){}
    }
}