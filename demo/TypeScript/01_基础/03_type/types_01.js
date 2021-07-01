//可以直接使用字面量进行类型声明
var a;
a = 10;
//可以使用|来连接多个类型（联合类型）
var b;
b = "male";
b = "female";
// b = "hello" //出错，因为hello不属于上面这两个值
var c;
c = true;
c = 'hello';
// any 表示的是任意类型，一个变量设置类型为any后相当于对该变量关闭了TS的类型检测
// 使用TS时，不建议使用any类型
// let d: any;
// 声明变量如果不指定类型，则TS解析器会自动判断变量的类型为any （隐式的any）
var d;
d = 10;
d = 'hello';
d = true;
// unknown 表示未知类型的值
var e;
e = 10;
e = "hello";
e = true;
var s;
// d的类型是any，它可以赋值给任意变量
// s = d;
e = 'hello';
//s = e //报错 因为s的的类型是字符串，而e的类型是unknown,两者的类型不等
// unknown 实际上就是一个类型安全的any
// unknown类型的变量，不能直接赋值给其他变量
if (typeof e === "string") { //只有类型是string是才能赋值
    s = e;
}
// 类型断言，可以用来告诉解析器变量的实际类型
/*
* 语法：两种
*   变量 as 类型
*   <类型>变量
* 两种用法的效果是一样的
* */
s = e;
s = e;
// void 用来表示空，以函数为例，就表示没有返回值的函数
function fn() {
}
// never 表示永远不会返回结果
function fn2() {
    throw new Error('报错了！');
}
