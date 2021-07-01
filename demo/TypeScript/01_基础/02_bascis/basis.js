//声明一个变量a，同时指定它的类型为number
var a;
//a 的类型设置为number，在以后的使用过程中a的值只能时数字
a = 22;
a = 33;
// a="hello"  //此行代码会报错，因为变量a的类型时number，不能赋值字符串
var b;
b = 'hello';
// b = 123; //此行代码会报错，因为变量b的类型时string，不能赋值数字
//声明完变量直接赋值
var c = false;
// 如果变量的声明和赋值是同时进行的，TS可以自动对变量进行类型检测
var d = false;
// d="abc" //此行会报错
d = true;
// JS中的函数是不考虑参数的类型和个数的
// function sum(a, b){
//     return a + b;
// }
// console.log(sum(123, 456)); // 579
// console.log(sum(123, "456")); // "123456"
//参数类型时number，返回值类型也是number
function sum(a, b) {
    return a + b;
}
var result = sum(123, 456);
console.log(result);
