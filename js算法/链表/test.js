// element 用来保存节点上的数据，next 用来保存指向下一个节点的 链接
class Node {
    constructor(element) {
        // element用来保存节点的数据
        this.element = element;
        // next用来保存指向下一个节点的连接
        this.next = null;
    }
}

// LinkedList类提供了对链表进行操作的方法，该类的功能
// 包含插入删除节点
class LinkedList extends  Node{
   constructor(element){
        super(element);
   }
    find(item) {
        let currNode = this.head;
        while (currNode.element != item) {
            currNode = currNode.next;
        }
        return currNode;
    }
    insert(newElement, item) {
        let newNode = new Node(newElement)
        let current = this.find(item)
        newNode.next = current.next
        current.next = newNode
    }
    remove(item) {
        let prevNode = this.findPrevious(item);
        if (!(prevNode.next == null)) {
            prevNode.next = prevNode.next.next;
        }
    }
    findPrevious(item) {
        let currNode = this.head;
        while (!(currNode.next == null) && (currNode.next.element != item)) {
            currNode = currNode.next;
        }
        return currNode;
    }

    display() {
        let currNode = this.head;
        while (!(currNode.next == null)) {
            console.log(currNode.next.element);
            currNode = currNode.next;
        }
    }
}

let cities = new LinkedList(); 
cities.insert("Conway", "head"); 
cities.insert("Russellville", "Conway"); 
cities.insert("Carlisle", "Russellville"); 
cities.insert("Alma", "Carlisle"); 
cities.display(); 
cities.remove("Carlisle");
cities.display();
