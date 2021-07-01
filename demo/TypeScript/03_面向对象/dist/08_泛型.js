"use strict";
/**
 * function fn(a:any):any{
 * return a;
 * }
 */
// 在定义函数或是类时，如果遇到类型不明确就可以使用泛型
function fn(a) {
    return a;
}
//可以直接调用具有泛型的函数
let result = fn(10); //不指定泛型
let result2 = fn("hello"); //指定泛型
//泛型可以同时指定多个
function fn2(a, b) {
    console.log(b);
    return a;
}
fn2(123, "hello"); //调用
console.log(fn2(123, "hello")); //hello 123
//T extends Inter 表示泛型T必须使Inter实现类（子类）
function fn3(a) {
    return a.length;
}
class MyClass {
    constructor(name) {
        this.name = name;
    }
}
const mc = new MyClass(18);
const mc2 = new MyClass('孙悟空');
console.log(mc);
console.log(mc2);
