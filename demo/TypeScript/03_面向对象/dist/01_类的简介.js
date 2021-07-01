"use strict";
// 使用class关键字来定义一个类
/*
*   对象中主要包含了两个部分：
*       属性
*       方法
* */
class Person {
    constructor() {
        /**
         * 直接定义的属性时实例的属性，需要通过对象的实例去访问
         * const per = new Person();
         *
         * 使用static开头的属性都是静态属性（类属性),可以直接通过类徐访问
         * Person.age
         *
         * readonly开头的书信表示一个只读的属性无法修改
         */
        //定义实例属性
        //readonly name:string = '孙悟空';
        this.name = '孙悟空';
        this.age = 18;
    }
    //定义方法
    //如果以static开头则该方法时类方法，可以通过类去调用
    sayHello() {
        console.log("Hello TS");
    }
}
//在属性前使用static关键字可以定义类属性（静态属性）
Person.age = 18;
const per = new Person();
console.log(per);
console.log(per.name, per.age);
console.log(Person.age);
per.name = 'tom';
console.log(per.name);
per.sayHello();
