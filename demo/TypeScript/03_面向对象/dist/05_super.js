"use strict";
(function () {
    class Animal {
        constructor(name) {
            this.name = name;
        }
        sayHello() {
            console.log("动物在叫");
        }
    }
    class Dog extends Animal {
        constructor(name, age) {
            //如果在子类中写了构造函数，在子类的构造方法中必须要对父类的的构造函数进行调用
            super(name);
            this.age = age;
        }
        sayHello() {
            // 在类的方法中 super就表示当前类的父类
            // super.sayHello(); //输出动物在叫
            console.log('汪汪汪汪！');
        }
    }
    const dog = new Dog('旺财', 3);
    dog.sayHello();
})();
