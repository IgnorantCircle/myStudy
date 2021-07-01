"use strict";
(function () {
    //定义一个表示人的类
    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
        /* *
         * getter 方法用来读取属性
         * setter 方法用来设置属性
         * ——它们被称为属性的存取器
         */
        //定义方法，用来获取name属性
        /*     getName(){
                return this.name;
            }
        
            //定义方法，用来设置name属性
            setName(value:string){
                this.name = value;
            }
            //定义方法，用来获取age属性
             getAge(){
                return this.age;
             }
        
             //定义方法，用来设置age的值
             setAge(value:number){
                 //判断年龄是否合法
                 if(value >= 0){
                    this.age = value
                }
             }
             */
        //TS中设置getter和setter的方法，这种方法，就不用写per.getName了，直接写per.name即可
        get Name() {
            console.log("get name()执行了");
            return this.name;
        }
        set Name(value) {
            this.name = value;
        }
        get Age() {
            return this.age;
        }
        set Age(value) {
            //判断年龄是否合法
            if (value >= 0) {
                this.age = value;
            }
        }
    }
    const per = new Person("孙悟空", 18);
    // console.log(per.getName());
    console.log(per.Name); //实际上调用了get方法
    console.log(per.Age);
    per.Name = '猪八戒';
    console.log(per.Name);
    per.Age = -33;
    console.log(per.Age); //改不了
    class A {
        constructor(num) {
            this.num = num;
        }
    }
    class B extends A {
        test() {
            console.log(this.num);
        }
    }
    const b = new B(123);
    console.log(b);
    // b.num = 33;//不能访问
    /* class C{
    
        name: string;
        age: number
    
        // 可以直接将属性定义在构造函数中
        constructor(name: string, age: number) {
            this.name = name;
             this.age = age;
        }
    
    }*/
    class C {
        // 可以直接将属性定义在构造函数中
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
    }
    const c = new C('xxx', 111);
    console.log(c);
})();
