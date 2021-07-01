class Dog{
    name:string;
    age:number;

    //构造函数constructor 在对象创建时调用
    constructor(name:string,age:number){
        //在实例方法中，thi就是当前的实例
        //在构造函数中当前对象就是当前新建的那个对象
        //可以通过this向新建的对象中添加属性
        this.name = name
        this.age = age;
    }
    bark(){
        console.log(this.name);
        
    }
}

const dog1 = new Dog('小黑',4);
const dog2 = new Dog('小白',2)

console.log(dog1);
console.log(dog2);

dog1.bark()
dog2.bark()

