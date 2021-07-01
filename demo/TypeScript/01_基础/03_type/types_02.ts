//object表示一个js对象
let a :object;
a={}
a = function(){};

//{}用来指定对象种可以包含哪些属性
//语法：{属性名：属性值，属性名：属性值} 注意要与声明的类型和个数一致
//属性后面加一个？表示属性是可选的
let b:{name:string,age?:number};
b={name:'佩奇',age:18}
b={name:'孙悟空'}

//[xxx:类型]:any表示任意类型的属性
//这样写表示只要求拥有一个name的属性，类型是string，其他的我都不管
let c:{name:string,[proName:string]:any};
c={name:'猪八戒',a:1,c:'male'}

/**
 * 利用箭头函数来设置函数结构的声明类型
 * 语法：(形参：类型,形参：类型) => 返回值类型
 * 
 */

//限制d为一个函数，拥有两个number类型的形参，返回值为number
let d:(a:number,b:number) => number;
d = function(num1,num2):number{
    return num1+num2
}

/*
*   数组的类型声明：
*       类型[]
*       Array<类型>
* */
//string[] 表示字符串数组
let e:string[]

let f:number[]

let g:Array<number>

e=['ds','a']
g=[1,3,6,9,6]

/**
 * tuple
 * 元组：固定长度的数组
 */

let h:[string,string];
h=['hello','world']
//h=['hello','world','!'] 有且只能有两个


/**
 * enum 枚举
 * 把所有可能的情况列举出来
 * 
 */

//定义一个枚举型
enum Gender{
    Male,
    Female
}
let i:{name:string,gender:Gender}
i = {
    name:'孙悟空',
    gender:Gender.Male
}

// console.log(i.gender === Gender.Male);

//&表示同时 
let j :{name:string}&{age:number}

//类型的别名,可以简化类型的使用
// type myType = string;
// let m :myType;

type myType = 1|2|3|4|5
let k : myType;
let l : myType
