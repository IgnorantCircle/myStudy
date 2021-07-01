[TOC]

# 1 前期准备工作

## 1.1 TypeScript的简介

1. TypeScript是JavaScript类型的超集，可以搬移成纯JavaScript
2. TypeScript可以在任何浏览器、任何计算机和操作系统上运行，由微软公司开发并开源

## 1.2 TypeScript与JavaScript的关系

1.  TypeScript是JavaScript的超集，是以JavaScript为基础构建的语言
2.  TypeScript对JS进行了扩展，向JS中引入了类型的概念，并添加了很多的新的特性
3.  TS代码不能直接运行，需要通过编译器编译成JS代码，然后交由JS解析器执行
4.  TS完全兼容JS，换而言之，任何JS代码都可以直接当TS使用
5.  相对于JS，TS拥有静态类型，更严格的语法，更强大的功能

## 1.3 TypeScript的优点

1. TS可以在代码执行前就完成代码的检查，减少了运行时异常出现的几率
2. TS可以编译成任意版本的JS代码，可以有效地解决不同JS运行环境的兼容问题
3. 同样的功能，TS的代码量要大于JS，但由与TS的代码结构更加清晰，变量类型更加明确，在后期代码的维护中TS要远远胜与JS、

## 1.4 TypeScript开发环境搭建

1. 下载Node.js（建议用稳定版）

  - [64位](https://nodejs.org/dist/v14.15.1/node-v14.15.1-x64.msi)
  - [32位](https://nodejs.org/dist/v14.15.1/node-v14.15.1-x86.msi)

  2. 安装完在命令行输入node -v 查看node版本
     如果出现版本信息，证明node安装成功
  3. 使用npm全局安装typescript
     在命令行输入 npm i -g typescript
      然后在命令行输入tsc，出现版本信息以及操作提示证明安装成功
  4. 创建一个简单的ts文件，注意后缀名为.ts
     ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210629171711137.png)
  5. 在命令行窗口进行编译
     进到所在的目录，输入命令` tsc helloTS.ts `
      完成后可以看到以及编译成功的js文件
      ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210629171934596.png)
     至此TypeScript的环境搭建完毕



# 2 基本类型

## 2.1 类型声明

1. 类型声明是TS中非常重要的一个特点，也是TS对JS改造的最重要的点

2. 通过类型声明可以指定TS中变量（参数、形参）的类型

3. 指定类型后，当为变量赋值时，TS编译器会自动检查值是否符合声明，符合则赋值，否则报错

4. 简而言之，类型声明给变量设置了类型，使得变量之恩呢存储某种类型的值

5. 语法

   自动类型判断

   - TS拥有自动的类型判断机制
   - 当对变量的声明和赋值是同时进行的，TS编译器会自动判断变量的类型
   - 所以当变量和声明自动进行时，可以省略掉类型声明

   ```tsx
   let 变量: 类型;
   
   let 变量: 类型 = 值;
   
   function fn(参数: 类型, 参数: 类型): 类型{
       ...
   }
   ```

   ```ts
   //声明一个变量a，同时指定它的类型为number
   let a:number;
   
   //a 的类型设置为number，在以后的使用过程中a的值只能时数字
   a=22;
   a=33;
   // a="hello"  //此行代码会报错，因为变量a的类型时number，不能赋值字符串
   
   let b: string;
   b = 'hello';
   // b = 123; //此行代码会报错，因为变量b的类型时string，不能赋值数字
   
   //声明完变量直接赋值
   let c:boolean = false;
   
   // 如果变量的声明和赋值是同时进行的，TS可以自动对变量进行类型检测
   let d = false;
   // d="abc" //此行会报错
   d = true;
   
   // JS中的函数是不考虑参数的类型和个数的
   // function sum(a, b){
   //     return a + b;
   // }
   
   // console.log(sum(123, 456)); // 579
   // console.log(sum(123, "456")); // "123456"
   
   //参数类型时number，返回值类型也是number
   function sum (a:number,b:number):number{
       return a+b;
   }
   let result = sum(123,456)
   console.log(result);
   
   ```


## 2.2 基本类型种类

|  类型   |       例子        |              描述              |
| :-----: | :---------------: | :----------------------------: |
| number  |    1, -33, 2.5    |            任意数字            |
| string  | 'hi', "hi", `hi`  |           任意字符串           |
| boolean |    true、false    |       布尔值true或false        |
| 字面量  |      其本身       |  限制变量的值就是该字面量的值  |
|   any   |         *         |            任意类型            |
| unknown |         *         |         类型安全的any          |
|  void   | 空值（undefined） |     没有值（或undefined）      |
|  never  |      没有值       |          不能是任何值          |
| object  |  {name:'孙悟空'}  |          任意的JS对象          |
|  array  |      [1,2,3]      |           任意JS数组           |
|  tuple  |       [4,5]       | 元素，TS新增类型，固定长度数组 |
|  enum   |    enum{A, B}     |       枚举，TS中新增类型       |

- number

  ```typescript
  let decimal: number = 6;
  let hex: number = 0xf00d;
  let binary: number = 0b1010;
  let octal: number = 0o744;
  let big: bigint = 100n;
  ```

- boolean

  ```typescript
  let isDone: boolean = false;
  ```

- string

  ```typescript
  let color: string = "blue";
  color = 'red';
  
  let fullName: string = `Bob Bobbington`;
  let age: number = 37;
  let sentence: string = `Hello, my name is ${fullName}.I'll be ${age + 1} years old next month.`;
  ```

- 字面量

  也可以使用字面量去指定变量的类型，通过字面量可以确定变量的取值范围

  ```typescript
  let color: 'red' | 'blue' | 'black';
  let num: 1 | 2 | 3 | 4 | 5;
  ```

- any

  ```typescript
  let d: any = 4;
  d = 'hello';
  d = true;
  ```

- unknown

  ```typescript
  let notSure: unknown = 4;
  notSure = 'hello';
  ```

- void

  ```typescript
  let unusable: void = undefined;
  ```

- never

  ```typescript
  function error(message: string): never {
    throw new Error(message);
  }
  ```

- object（没啥用），一般是直接在{}里面指定对象的类型

  ```typescript
  let obj: object = {};
  ```

- array

  ```typescript
  let list: number[] = [1, 2, 3];
  let list: Array<number> = [1, 2, 3];
  ```

- tuple

  ```typescript
  let x: [string, number];
  x = ["hello", 10]; 
  ```

- enum

  ```typescript
  num Color {
    Red,
    Green,
    Blue,
  }
  let c: Color = Color.Green;
  
  enum Color {
    Red = 1,
    Green,
    Blue,
  }
  let c: Color = Color.Green;
  
  enum Color {
    Red = 1,
    Green = 2,
    Blue = 4,
  }
  let c: Color = Color.Green;
  ```

- 类型断言

  有些情况下，变量的类型对于我们来说是很明确，但是TS编译器却并不清楚，此时，可以通过类型断言来告诉编译器变量的类型，断言有两种形式：

  - 第一种

    ```typescript
    let someValue: unknown = "this is a string";
    let strLength: number = (someValue as string).length;
    ```

    

  - 第二种

    ```typescript
    let someValue: unknown = "this is a string";
    let strLength: number = (<string>someValue).length;
    ```

    

```typescript
//可以直接使用字面量进行类型声明
let a:10
a = 10

//可以使用|来连接多个类型（联合类型）
let b:"male"|"female";
b = "male";
b = "female"
// b = "hello" //出错，因为hello不属于上面这两个值



let c: boolean | string;
c = true;
c = 'hello'

// any 表示的是任意类型，一个变量设置类型为any后相当于对该变量关闭了TS的类型检测
// 使用TS时，不建议使用any类型
// let d: any;

// 声明变量如果不指定类型，则TS解析器会自动判断变量的类型为any （隐式的any）
let d;
d = 10;
d = 'hello';
d = true;

// unknown 表示未知类型的值
let e: unknown;
e = 10;
e = "hello";
e = true;

let s:string;

// d的类型是any，它可以赋值给任意变量
// s = d;

e = 'hello';

//s = e //报错 因为s的的类型是字符串，而e的类型是unknown,两者的类型不等

// unknown 实际上就是一个类型安全的any
// unknown类型的变量，不能直接赋值给其他变量
if(typeof e === "string"){ //只有类型是string是才能赋值
    s = e;
}


// 类型断言，可以用来告诉解析器变量的实际类型
/*
* 语法：两种
*   变量 as 类型 
*   <类型>变量
* 两种用法的效果是一样的
* */
s = e as string;
s = <string>e

// void 用来表示空，以函数为例，就表示没有返回值的函数
function fn(): void{
}

// never 表示永远不会返回结果
function fn2(): never{
    throw new Error('报错了！');
}
```

```typescript
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

```

# 3 编译选项

## 3.1 自动编译文件

1. 编译文件时，使用 -w指令，TS编译器会自动监视文件的变化，并在文件发送变化时对文件进行重新编译
2. 指令：`tsc xxx.ts -w`

## 3.2 自动编译整个项目

1. 如果直接使用tsc指令，则可以自动将当前项目下的所有ts文件编译为js文件。但是能直接使用tsc命令的前提时，要先在项目根目录下创建一个ts的配置文件 tsconfig.json
2. tsconfig.json是一个JSON文件，添加配置文件后，只需只需 tsc 命令即可完成对整个项目的编译
3. 配置选项：

- include

  - 定义希望被编译文件所在的目录

  - 默认值：["\*\*/\*"]

  - 示例

    ```typescript
    "include":["src/**/*", "tests/**/*"]
    //所有src目录和tests目录下的文件都会被编译，注意src的所在的路径
    ```

- exclude

  - 定义需要排除在外的目录

  - 默认值：["node_modules", "bower_components", "jspm_packages"]

  - 示例

    ```typescript
    "exclude": ["./src/hello/**/*"]
    //src下hello目录下的文件都不会被编译
    ```

- extends

  - 定义被继承的配置文件

  - 示例：

    ```typescript
    "extends": "./configs/base"
    //当前配置文件中会自动包含config目录下base.json中的所有配置信息
    ```

- files（很少用）

  - 指定被编译文件的列表，只有需要编译的文件少时才会用到

  - 示例

    ```typescript
    "files": [
        "core.ts",
        "sys.ts",
        "types.ts",
        "scanner.ts",
        "parser.ts",
        "utilities.ts",
        "binder.ts",
        "checker.ts",
        "tsc.ts"
      ]
    //列表中的文件都会被TS编译器所编译
    ```

- compilerOptions（最重要也是最复杂的）

  - 编译选项是配置文件中非常重要也比较复杂的配置选项

  - 在compilerOptions中包含多个子选项，用来完成对编译的配置

  - 项目选项：

    1. target：设置ts代码编译的目标版本

    - 可选值：【当输入一个错误的值时，编译器会提示有哪些可以选择的选项】

      ES3（默认）、ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext

    - 示例：

      ```json
      //我们所编写的ts代码将会被编译为ES6版本的js代码
      "compilerOptions": {
          "target": "ES6"
      }
      ```

    2. lib：指定代码运行时所包含的库（宿主环境）【一般不需要设置

    - 可选值：ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext、DOM、WebWorker、ScriptHost ......

    - 示例：

      ```json
      "compilerOptions": {
          "target": "ES6",
          "lib": ["ES6", "DOM"],
          "outDir": "dist",
          "outFile": "dist/aa.js"
      }
      ```

    3. module：设置编译后代码使用的模块化系统

    - 可选值：'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015', 'es2020', 'esnext'

    - 示例：

      ```json
      "compilerOptions": {
          "module": "CommonJS"
      }
      ```

    4. outDir：编译后文件的所在目录

    - 默认情况下，编译后的js文件会和ts文件位于相同的目录，设置outDir后可以改变编译后文件的位置

    - 示例：

      ```json
      //设置后编译后的js文件将会生成到dist目录
      "compilerOptions": {
          "outDir": "dist"
      }
      ```

    5. outFile：将所有的文件编译为一个js文件

    - 默认会将所有的编写在全局作用域中的代码合并为一个js文件，如果module制定了None、System或AMD则会将模块一起合并到文件之中

    - 示例：

      ```json
      "compilerOptions": {
          "outFile": "dist/app.js"
      }
      ```

    6. rootDir：指定代码的根目录

    - 默认情况下编译后文件的目录结构会以最长的公共目录为根目录，通过rootDir可以手动指定根目录

    - 示例：

      ```json
      "compilerOptions": {
          "rootDir": "./src"
      }
      ```

    7. allowJs：否对js文件编译，值为true或false
    8. checkJs：是否对js文件进行检查

    - 示例：

      ```json
      "compilerOptions": {
          "allowJs": true,
          "checkJs": true
      }
      ```

    9. 其他：

    - removeComments：是否删除注释，默认值为false
    - noEmit：不对代码进行编译，即生成编译后的文件，默认值为false
    - sourceMap：是否生成sourceMap，默认值：false

    10. 严格检查
        - strict：启用所有的严格检查，默认值为true，设置后相当于开启了所有的严格检查
        - alwaysStrict：总是以严格模式对代码进行编译
        - noImplicitAny：禁止隐式的any类型
        - noImplicitThis：禁止类型不明确的this
        - strictBindCallApply：严格检查bind、call和apply的参数列表
        - strictFunctionTypes：严格检查函数的类型
        - strictNullChecks：严格的空值检查
        - strictPropertyInitialization：严格检查属性是否初始化
    11. 额外检查
        - noFallthroughCasesInSwitch：检查switch语句包含正确的break
        - noImplicitReturns：检查函数没有隐式的返回值
        - noUnusedLocals：检查未使用的局部变量
        - noUnusedParameters：检查未使用的参数
    12. 高级使用

    - allowUnreachableCode：检查不可达代码

      可选值：true，忽略不可达的代码

      ​					false：不可达代码将引发错误

    - noEmitOnError：有错误的情况下不进行编译，默认值：false

# 4 用webpack配置TS

1. 通常情况下，实际开发中我们都需要使用构建工具对代码进行打包，TS同样也可以结合构建工具一起使用

2. 步骤

   1. 初始化项目

      进入项目根目录，执行命令 ``` npm init -y```，创建package.json文件

   2. 下载构建工具：```npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader clean-webpack-plugin```

      共安装7个包：

      - webpack：构建工具webpack
      - webpack-cli：webpack的命令行工具
      - webpack-dev-server：webpack的开发服务器
      - typesript：ts编译器
      - ts-loader：ts加载器，用于在webpack中编译ts文件
      - html-webpack-plugin：webpack中html插件，用来自动创建html文件
      - clean-webpack-plugin：webpack中的清除插件，每次构建都会先清除目录

   3. 根目录下创建webpack的配置文件webpack.config.js

      ```javascript
      //引入一个包
      const path = require("path");
      //引入html 插件
      const HTMLWebpackPlugin = require('html-webpack-plugin')
      //引入clean插件
      const {CleanWebpackPlugin} = require('clean-webpack-plugin')
      
      //webpack中的所有配置信息都要写在module.exports中
      module.exports = {
          //指定入口文件
          entry:"./src/index.ts",
      
          //指定打包文件所在目录
          output:{
              //指定打包文件所在的目录
              path:path.resolve(__dirname,'dist'),
              //打包后的文件名
              filename:'bundle.js'
          },
          //指定webpack打包时要使用的模块
          module:{
              //指定要加载的规则
              rules:[
                  {
                      //test指定规则生效的文件,写正则表达式
                      test:/\.ts$/,
                      // 使用哪些 loader 进行处
                      use:'ts-loader',
                      //要排除的文件
                      exclude:/node-modules/
                  }
              ]
          },
          plugins:[
              new CleanWebpackPlugin(),
              new HTMLWebpackPlugin({
                  // title:'只是一个自定义题目'
                  template:'./src/index.html'
              })
          ],
           //用来设置引用模块
           resolve:{
              extensions:['.ts','.js']
          },
          mode:'development',//开发模式
         
      }
      ```

   4. 根目录下创建tsconfig.json，配置可以根据自己需要

      ```
      {
          "compilerOptions": {
              "target": "ES2015",
              "module": "ES2015",
              "strict": true
          }
      }
      ```

   5. 修改package.json添加如下配置

      ```json
      {
      ...略...
        "scripts": {
          "build": "webpack",
          "start":"webpack server --open chrome.exe"
      
        },
        ...略...
      }
      ```

   6. 在src下创建ts文件，并在并命令行执行```npm run build```对代码进行编译，或者执行```npm start```来启动开发服务器

# 5 Babel

经过一系列的配置，使得TS和webpack已经结合到了一起，除了webpack，开发中还经常需要结合babel来对代码进行转换以使其可以兼容到更多的浏览器，在上述步骤的基础上，通过以下步骤再将babel引入到项目中。

1. 安装依赖包：

   - 命令：```npm i -D @babel/core @babel/preset-env babel-loader core-js```

   - 共安装了4个包，分别是：

     1）@babel/core：babel的核心工具

     2）@babel/preset-env：babel的预定义环境

     3）@babel-loader ：babel在webpack中的加载器

     4）core-js：core-js用来使老版本的浏览器支持新版ES语法

2. 修改webpack.config.js配置文件

   ```js
   ...略...
    //指定要加载的规则
           rules:[
               {
                   //test指定规则生效的文件,写正则表达式
                   test:/\.ts$/,
                   // 使用哪些 loader 进行处
                   use:[
                       //配置babel
                       {
                           //指定加载器
                           loader:"babel-loader",
                           //设置babel
                           options:{
                               //设置预定义的环境
                               presets:[
                                   [
                                       //指定环境的插件
                                       "@babel/preset-env",
                                       //配置信息
                                       {
                                           //要兼容的标准
                                          targets: {
                                              //兼容的版本
                                              "chrome":"58",
                                              "ie":"11"//ie11不支持Promise语法，所以在打包过程中corejs会自动转换promise
                                          },
                                          //指定corejs的版本
                                          "corejs":"3",
                                          //指定corejs的方式，"usage"表示按需加载
                                          "useBuiltIns":"usage"
                                       }
                                   ]
                               ]
                           },  
                       },
                       'ts-loader'
                      
                   ],
                   //要排除的文件
                   exclude:/node-modules/
               }
           ]
   ...略...
   ```

   注意如果要兼容ie11，可能会出现箭头函数的问题，所以要在webpack的output中加上

   ```js
   // 告诉webpack不使用箭头
           environment:{
               arrowFunction: false
           },
   ```

   

3. 配置好webpack后，使用ts编译后的文件将会再次被babel处理，使得代码可以在大部分浏览器中直接使用，也可以在配置选项的targets中指定要兼容的浏览器版本

# 6 面向对象

## 6.1 前言

<font color =red>面向对象这部分和es6差不多，只是加了类型的限制，就当复习了</font>

面向对象是程序中一个非常重要的思想，简而言之就是程序之中所有的操作都需要通过对象来完成。

举例说：

- 操作浏览器要使用window对象
- 操作网页要使用document对象
- 操作控制台使用console对象

一切操作都要通过对象，也就是所谓的面向对象，那么对象到底是什么呢？这就要先说到程序是什么，计算机程序的本质就是对现实事物的抽象，抽象的反义词是具体，比如：照片是对一个具体的人的抽象，汽车模型是对具体汽车的抽象等等。程序也是对事物的抽象，在程序中我们可以表示一个人、一条狗、一把枪、一颗子弹等等所有的事物。一个事物到了程序中就变成了一个对象。

在程序中所有的对象都被分成了两个部分数据和功能，以人为例，人的姓名、性别、年龄、身高、体重等属于数据，人可以说话、走路、吃饭、睡觉这些属于人的功能。数据在对象中被成为属性，而功能就被称为方法。所以简而言之，在程序中一切皆是对象。

## 6.2 类（class）

要想面向对象，操作对象，首先便要拥有对象，那么下一个问题就是如何创建对象。要创建对象，必须要先定义类，所谓的类可以理解为对象的模型，程序中可以根据类创建指定类型的对象，举例来说：可以通过Person类来创建人的对象，通过Dog类创建狗的对象，通过Car类来创建汽车的对象，不同的类可以用来创建不同的对象。

1. 定义类：

   ```typescript
   class 类名 {
   	属性名: 类型;
   	
   	constructor(参数: 类型){
   		this.属性名 = 参数;
   	}
   	
   	方法名(){
   		....
   	}
   
   }
   ```

   ```typescript
   // 使用class关键字来定义一个类
   /*
   *   对象中主要包含了两个部分：
   *       属性
   *       方法
   * */
   class Person{
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
   
       name = '孙悟空'
   
       //在属性前使用static关键字可以定义类属性（静态属性）
       static readonly age:number = 18
       age = 18
   
       //定义方法
       //如果以static开头则该方法时类方法，可以通过类去调用
       sayHello(){
           console.log("Hello TS");
           
       }
   
   }
   const per = new Person();
   console.log(per);
   console.log(per.name,per.age);
   
   console.log(Person.age);
   
   
   per.name = 'tom'
   console.log(per.name);
   
   per.sayHello()
   
   ```

2. 构造函数

   ```typescript
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
   ```

## 6.3 面向对象的特点

1. 封装

- 对象实质上就是属性和方法的容器，它的主要作用就是存储属性和方法，这就是所谓的封装
- 默认情况下，对象的属性是可以任意的修改的，为了确保数据的安全性，在TS中可以对属性的权限进行设置
- 只读属性（readonly）：如果在声明属性时添加一个readonly，则属性便成了只读属性无法修改
- TS中属性具有三种修饰符：
  - public（默认值），可以在类、子类和对象中修改
  - protected ，可以在类、子类中修改
  - private ，可以在类中修改
- 示例：

  - public

    ```typescript
    class Person{
        public name: string; // 写或什么都不写都是public
        public age: number;
    
        constructor(name: string, age: number){
            this.name = name; // 可以在类中修改
            this.age = age;
        }
    
        sayHello(){
            console.log(`大家好，我是${this.name}`);
        }
    }
    
    class Employee extends Person{
        constructor(name: string, age: number){
            super(name, age);
            this.name = name; //子类中可以修改
        }
    }
    
    const p = new Person('孙悟空', 18);
    p.name = '猪八戒';// 可以通过对象修改
    ```

    

  - protectd

    ```typescript
    class Person{
        protected name: string;
        protected age: number;
    
        constructor(name: string, age: number){
            this.name = name; // 可以修改
            this.age = age;
        }
    
        sayHello(){
            console.log(`大家好，我是${this.name}`);
        }
    }
    
    class Employee extends Person{
    
        constructor(name: string, age: number){
            super(name, age);
            this.name = name; //子类中可以修改
        }
    }
    
    const p = new Person('孙悟空', 18);
    p.name = '猪八戒';// 不能修改
    ```

  - protect

    ```typescript
    class Person{
        private name: string;
        private age: number;
    
        constructor(name: string, age: number){
            this.name = name; // 可以修改
            this.age = age;
        }
    
        sayHello(){
            console.log(`大家好，我是${this.name}`);
        }
    }
    
    class Employee extends Person{
    
        constructor(name: string, age: number){
            super(name, age);
            this.name = name; //子类中不能修改
        }
    }
    
    const p = new Person('孙悟空', 18);
    p.name = '猪八戒';// 不能修改
    ```

    
- 属性存取器
  - 对于一些不希望被任意修改的属性，可以将其设置为private
  
  - 但直接将其设置为private将导致无法再通过对象修改其中的属性
  
  - 因此我们可以在类中定义一组读取、设置属性的方法，这种对属性读取或设置的属性被称为属性的存取器
  
  - 读取属性的方法叫做setter方法，设置属性的方法叫做getter方法
  
  - 示例：
  
    ```typescript
    (function (){
        //定义一个表示人的类
    class Person{
        //TS可以在属性前添加属性的修饰符
        /**
         * public:修饰的属性可以在任意位置访问（修改）默认值
         * private:私有属性，私有属性只能在类内部进行访问（修改）
         *           ——通过在类中添加方法使得私有属性可以被外部访问
         * protected:受保护属性。只能在当前类和当前类的子类中访问（修改）
         */
        private name:string;
        private age:number;
        constructor(name:string , age:number){
            this.name = name;
            this.age =age
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
        get Name(){
            console.log("get name()执行了");
            return this.name
            
        }
        set Name(value){
            this.name = value
        }
    
        get Age(){
            return this.age;
         }
    
         
         set Age(value:number){
             //判断年龄是否合法
             if(value >= 0){
                this.age = value
            }
         } 
        
    }
    const per = new Person("孙悟空",18)
    // console.log(per.getName());
    console.log(per.Name);//实际上调用了get方法
    console.log(per.Age);
    
    per.Name = '猪八戒'
    console.log(per.Name);
    per.Age = -33
    
    console.log(per.Age);//改不了
    
    class A{
        protected num: number;
    
        constructor(num: number) {
            this.num = num;
        }
    }
    
    class B extends A{
    
        test(){
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
    
    class C{
    
        // 可以直接将属性定义在构造函数中
        constructor(public name: string, public age: number) {
        }
    
    }
    
    const c = new C('xxx', 111);
    
    console.log(c);
    })()
    ```
  
    
- 静态属性
  - 静态属性（方法），也称为类属性。使用静态属性无需创建实例，通过类即可直接使用
  
  - 静态属性（方法）使用static开头
  
  - 示例：
  
    ```typescript
    class Tools{
        static PI = 3.1415926;
        
        static sum(num1: number, num2: number){
            return num1 + num2
        }
    }
    
    console.log(Tools.PI);
    console.log(Tools.sum(123, 456));
    ```
  
    

2. 继承
   - 继承是面向对象中的一个特性

   - 通过继承可以将其他类中的属性和方法引入到当前类中

   - 示例：

     ```typescript
     (function(){
     
         //定义一个Animal类
         class Animal{
             name:string;
             age:number;
             constructor(name:string,age:number){
                 this.name= name;
                 this.age= age;
             }
             sayHello(){
                 console.log('动物在叫');  
             }
         }
       class Dog extends Animal{
           run(){
               console.log(`${this.name}在跑~~~`);
               
           }
           sayHello() {
             console.log('汪汪汪汪！');
         }
       } 
     
       // 定义一个表示猫的类
       // 使Cat类继承Animal类
       class Cat extends Animal{
           sayHello() {
               console.log('喵喵喵喵！');
           }
       }
      const dog = new Dog('旺财', 5);
         const cat = new Cat('咪咪', 3);
         console.log(dog);
         dog.sayHello();
         dog.run();
         console.log(cat);
         cat.sayHello();
     })()
     ```

   - 通过继承可以在不修改类的情况下完成对类的扩展

   - 重写
     - 发生继承时，如果子类中的方法会替换掉父类中的同名方法，这就称为方法的重写
     
     - 示例：
     
       ```typescript
       (function(){
           class Animal{
               name:string;
               constructor(name:string){
                   this.name = name;
               }
               sayHello(){
                   console.log("动物在叫");  
               }    
           }
       
           class Dog extends Animal{
               age:number;
               constructor(name:string,age:number){
                   //如果在子类中写了构造函数，在子类的构造方法中必须要对父类的的构造函数进行调用
                   super(name);
                   this.age= age
               }
               sayHello(){
                   // 在类的方法中 super就表示当前类的父类
                   // super.sayHello(); //输出动物在叫
                   console.log('汪汪汪汪！'); //重写父方法
               }
           }
           const dog = new Dog('旺财', 3);
           dog.sayHello();
       })();
       ```
     
     - 在子类中可以使用super来完成对父类的引用
     
   - 抽象类（abstract class）
     - 抽象类是专门用来被其他类所继承的类，它只能被其他类所继承不能用来创建实例
     
     - 示例
     
       ```typescript
       (function(){
           /**
            * 以abstract开头的类就是抽象类
            * 抽象类和其他类区别不大，只是不能用来创建对象
            * 抽象类就是专门用来被继承的
            * 
            * 抽象类里可以添加抽象方法
            */
       
           abstract class Animal{
               name:string;
               constructor(name:string){
                   this.name = name;
               }
       
               //定义一个抽象方法
               //抽象方法：abstract开头，没有方法体
               //抽象方法只能定义在抽象类中，子类必须对抽象方法进行重写
               abstract sayHello():void;
           }
       
           class Dog extends Animal{
               sayHello(){
                   console.log("汪汪汪");
                   
               }
           }
           class Cat extends Animal{
               sayHello(){
                   console.log("喵喵喵");
                   
               }
           }
           const dog = new Dog('旺财');
           dog.sayHello()
       
           const cat  = new Cat("小刀")
           cat.sayHello()
           
       })()
       ```
     
     - 使用abstract开头的方法叫做抽象方法，抽象方法没有方法体只能定义在抽象类中，继承抽象类时抽象方法必须要实现，即子类必须对抽象方法进行重写

  3. 多态:父类定义一个方法不去实现，让继承它的子类去实现 每一个子类有不同的表现

     注意：使用多态基础是类的继承或者接口实现

     举例子说：多态 ，一种事物的不同表现形态。例如在代码中先声明变量f是Animal类型，具体是Dog还是Cat，在new对象时才知道
     如果是Dog，则f.eat()调用的是Dog类中的eat方法；如果是Cat，则f.eat()调用的是Cat类中的eat方法，这就是多态！！！

## 6.4 接口

​	接口的作用类似于抽象类，不同点在于接口中的所有方法和属性都是没有实值的，换句话说接口中的所有方法都是抽象方法。

接口主要负责定义一个类的结构，接口可以去限制一个对象的接口，对象只有包含接口中定义的所有属性和方法时才能匹配接口。

同时，可以让一个类去实现接口，实现接口时类中要包含接口中的所有属性。

示例：

```typescript
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
```



## 6.5 泛型（Generic）

定义一个函数或类时，有些情况下无法确定其中要使用的具体类型（返回值、参数、属性的类型不能确定），此时泛型便能够发挥作用。

```typescript
/**
 * function fn(a:any):any{
 * return a;
 * }
 */

// 在定义函数或是类时，如果遇到类型不明确就可以使用泛型

function fn<T>(a:T):T{
    return a;
}

//可以直接调用具有泛型的函数
let result = fn(10);//不指定泛型

let result2 = fn<string>("hello"); //指定泛型

//泛型可以同时指定多个
function fn2<T,K>(a:T,b:K):T{
    console.log(b);
    return a;
    
}

fn2<number,string>(123,"hello"); //调用
console.log(fn2<number,string>(123,"hello")); //hello 123

interface Inter{
    length:number;
}

//T extends Inter 表示泛型T必须使Inter实现类（子类）
function fn3<T extends Inter>(a:T):number{
    return a.length;
}

class MyClass<T>{
    name:T;
    constructor(name:T){
        this.name =name;
    }
}

const mc = new MyClass(18)
const mc2 = new MyClass<string>('孙悟空')
console.log(mc);
console.log(mc2);
```

