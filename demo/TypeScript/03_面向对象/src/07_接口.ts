(function(){
    //描述一个对象的类型
    type myType = {
        name:string,
        age:number
    };
    /**
     * 接口用来定义一个类结构，用来定义一个类中应该包含哪些属性和方法
     * 同时接口也可以当成类型声明来使用
     */

    interface myInterface{
        name:string;
        age:number;
    }
    //接口是可以重复声明的，而自定义类型不可以重复声明
    interface myInterface{
        gender:string
    }

    const obj:myInterface = {
        name:'sss',
        age:11,
        gender:'男'
    }

    /**
     * 接口可以在定义类的时候去限制类的结构
     * 接口中的所有属性都不能有实际的值
     * 接口只定义对象的结构，而不考虑实际值
     *  在接口中所有方法都是抽象方法
     */

    interface myInter{
        name:string;
        sayHello():void
    }

    /**
     * 定义类时，可以使类去实现一个接口
     * 实现接口就是使类满足接口的要求
     */

    class MyClass implements myInter{
        //必须要有name和sayHello方法
        name:string;
        constructor(name:string){
            this.name = name;
        }

        sayHello(){
            console.log("Hello World");
            
        }
        sayHi(){
            console.log("大家好~~~");
            
        }
    }
    
    const test = new MyClass("peiqi")
    console.log(test.name);
    test.sayHello();
    test.sayHi();
  
    
    
    


})();