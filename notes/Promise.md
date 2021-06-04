[TOC]



# 1 Promise的理解

## 1.1 promise是什么

### 1.1.1理解：

1. 抽象表达
   - Promise是一门新的技术（ES6规范）
   - Promise是JS中进行一部编程的新的解决方案（旧方案是单纯使用回调函数）

2. 具体表达
   - 从语法上来说：Promise是一个构造函数
   - 从功能上来说：Promise对象用来封装一个一部操作并可以获取其成功/失败的结果值



### 1.1.2 异步编程的例子

* fs 文件操作（fs为node.js下的一个模块，可以对磁盘进行读写操作）
    ```js
    const fs = require('fs');
    /* 
          fs.readFile('./resource/content.txt',(err,data)=>{
            //如果错误则抛出错误
            if(err) throw err;
            //否则输出文件内容
            console.log(data.toString());
                });
     */
    
    //Promise形式
    let p = new Promise((resolve,reject) => {
        fs.readFile('./resource/content.txt',(err,data)=>{
            //如果错误则抛出错误
            if(err) reject(err);
           //如果成功
            resolve(data);
            
        });
    })
    
        //调用then方法
        p.then(value=>{console.log(value.toString());
        },reason =>{console.log(reason);
        }
            
        )
        
    
    
    ```
* 数据库操作（mongoDB，MySQL等）
* AJAX 
  ```js
    $.get('/server', (data)=>{})
  ```
* 定时器 
  ```js
  setTimeout(()=>{}, 2000);
  ```

## 1.2 为什么要使用Promise

### 1.2.1 指定回调函数的方式更加灵活

- 旧的：必须在启动异步任务之前指定
- promise：启动异步 => 返回promise对象 => 给promise对象绑定回调函数（甚至可以在异步任务结束后指定多个）

### 1.2.2 支持链式调用，可以解决回调地狱问题

1. 回调地狱：回调函数嵌套调用，外部回调函数异步执行的 结果是嵌套的回调执行的条件![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/回调地狱.29ptp8b0851c.jpg)
2. 回调地狱的缺点
    - 不便于阅读
    - 不便于异常处理
 3. 解决方案：promise链式调用
 4. 终极解决方案：async/await

## 1.3 Promise 的状态

1. 实例对象中的一个属性 『PromiseState』

- pending  未决定的

* resolved / fullfilled  成功
* rejected  失败

2. promise的状态改变
   - pending变为resolved/fullfilled
   - pending变为rejected

- 只有这两种变化可能，也就是说不可能由resolved变为rejected，且一个promise对象只能改变一次

- 无论变为成功还是失败，都会有一个结果数据
- 成功的结果数据一般称为value，失败的结果数据一般称为reason



## 1.4 Promise 对象的值
实例对象中的另一个属性 『PromiseResult』
保存着异步任务『成功/失败』的结果，下面两个函数可以修改对返回的结果进行修改，其他皆不可以

* resolve（）
* reject （）

## 1.5 promise的基本流程

![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/promise回调.jw8r3tqiuvk.png)

# 2 Promise的使用

## 2.1 API

1. Promise构造函数：Promise(excutor){}
   - executor函数：执行器（resolve，reject） => {}
   - resolve函数：内部定义成功时我们调用的函数 value => {}
   - reject函数：内部定义失败时我们调用的函数  reason => {}

- 说明：executor会在Promise内部立即同步调用，异步操作在执行器中执行

```js
<script>
        let p = new Promise((resolve,reject)=>{
            //同步调用
            console.log(111);
        });
        console.log(222);
</script>
```

![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/image.16gkk8m0hccg.png)

<hr/>

2. Promise.prototype.then方法：(onResolved,onReject) => {}
   - onResolved函数：成功的回调函数 （value） => {}
   - onReject函数：失败的回调函数 (reason) => {}

- 说明：指定用于得到成功value的成功回调和用于得到失败reason的失败回调返回一个新的promise对象

  <hr/>

  

3. Promise.prototype.catch方法：（onRejected） => {}
   - onRejected函数：失败的回调函数 （reason） =>{}

- 说明：then()的语法糖，相当于：then(undefined，onRejected)

  ```javascript
   <script>
          let p = new Promise((resolve,reject)=>{
             //修改promise对象的状态
             reject('error')
          });
          //执行catch方法
          p.catch(reason =>{
              console.log(reason); //输出error
              
          })
      </script>
  ```

  <hr/>

4. Promise.resolve方法：(value) => {}
   - value:成功的数据或promise对象

- 说明：返回一个成功/失败的 promise 对象

  ```js
   <script>
          let p1 = Promise.resolve(123);
          //如果传入的参数为非Promise类型的对象，则返回的结果皆为成功的promise对象
          console.log('p1:',p1);
  
          //如果传入的参数为Promise对象，则参数的结果决定resolve的结果
          let p2 = Promise.resolve(new Promise((resolve,reject) => {
              //成功的结果
              resolve('OK')
          }))
          console.log("p2:",p2);
         
          let p3 = Promise.resolve(new Promise((resolve,reject) => {
              //失败的结果
             reject('error');
          }))
          console.log("p3:",p3);
      </script>
  ```

  ![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/image.1p1xglhdmjk0.png)
  
  <hr/>

5. Promise.reject 方法: (reason) => {} 
   - reason：失败的原因或promise对象

- 说明: 返回一个失败的 promise ==对象==

  ```js
  <script>
          let p1 = Promise.reject(456);
          //如果传入的参数为非Promise类型的对象，则返回的结果皆为成功的promise对象
          console.log('p1:',p1);
  
          //如果传入的参数为Promise对象，则参数的结果决定resolve的结果
          let p2 = Promise.reject(new Promise((resolve,reject) => {
              resolve('OK')
          }))
          //即使传入的时一个成功的promise对象，返回的也是失败的promise对象
          console.log("p2:",p2);//结果PromiseResult是传入的参数OK
         
          let p3 = Promise.reject(new Promise((resolve,reject) => {
              //失败的结果
             reject('error');
          }))
          console.log("p3:",p3);
      </script>
  ```

  ![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/image.1mr7wqr7f04g.png)
  
  <hr/>

6. Promise.all方法：(promises) =>{}
   - promises:包含n个promise的数值

- 说明：返回一个新的promise，只有所有的promise都成功了才成功，只有有一个失败了就直接失败

  ```js
  <script>
          let p1 = new Promise((resolve, reject) => {
              resolve('OK');
          })
          let p2 = Promise.resolve('Success');
          let p3 = Promise.resolve('Oh Yeah');
          let p4 = Promise.reject('Error');//失败的
          
          //成功的情况
          const resultSuccess = Promise.all([p1, p2, p3]);
          console.log("resultSuccess:",resultSuccess);
  
          //失败的情况
          const resultError = Promise.all([p1, p2, p4]);
          console.log("resultError:",resultError);
      </script>
  ```

  ![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/image.1sp30909y6zk.png)

7. Promise.race方法：(promises) =>{}
   - promises:包含n个promise的数组

- 说明：返回一个新的promise，第一个完成的promise的结果状态就是最终的结果状态

```js
<script>
        let p1 = new Promise((resolve, reject) => {
                resolve('OK');
        })
        let p2 = Promise.resolve('Success');
        let p3 = Promise.resolve('Oh Yeah');

        let p4 = new Promise((resolve, reject) => { //添加定时器，异步任务
            setTimeout(() => {
                resolve('OK');
            }, 1000);
        })
        let p5 = Promise.reject('Error'); //失败的结果
        //调用
        const result1 = Promise.race([p1, p2, p3]);
        console.log("result1",result1);

        const result2 = Promise.race([p4, p2, p3]);
        console.log("result2",result2);

        const result3 = Promise.race([p4, p5,p1]);
        console.log("result3",result3);

        const result4 = Promise.race([p5, p1, p2]);
        console.log("result4",result4);
    </script>
```

![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/image.28d6m7oadpgk.png)

## 2.2 Promise的几个关键问题

1. 如何改变promise的状态
   - resolve(value)：如果当前是pending就会变为resolved
   - reject(reason): 如果当前是 pending 就会变为 rejected
   - 抛出异常: 如果当前是 pending 就会变为 rejected

2. 一个 promise 指定多个成功/失败回调函数, 都会调用吗?

   - 当 promise 改变为对应状态时都会调用

   ```js
    <script>
           let p = new Promise((resolve, reject) => {
                resolve('OK');//改变状态
           });
   
           ///指定回调 - 1
           p.then(value => {
               console.log(value);
           });
   
           //指定回调 - 2
           p.then(value => {
               alert(value);
           });
       </script>
   ```

   

3. 改变 promise 状态和指定回调函数谁先谁后？

- （1）都有可能, 正常情况下是先指定回调再改变状态, 但也可以先改状态再==指定==回调

  ```js
  <script>
          //先改变状态，再指定回调
          let p1 = new Promise((resolve, reject) => {
                  resolve('OK');//同步任务
          });
  
          p1.then(value => {
              console.log(value);
          },reason=>{
              
          })
  
          //先指定回调，再改变状态
          let p2 = new Promise((resolve, reject) => {
              //异步任务
              setTimeout(() => {
                  resolve('OK');
              },3000)
                  
          });
      
          //then先执行，而不是then里面的回调函数先执行，所以value会再3s后输出
          p2.then(value => {
              console.log(value);//状态改变才能拿到数据
          },reason=>{
              
          })
  
      </script>
  ```

  

- （2）如何先改状态再指定回调?

  - ① 在执行器中直接调用 resolve()/reject() 
  - ② 延迟更长时间才调用 then() 

- （3） 什么时候才能得到数据? 

  - 如果先指定的回调, 那当状态发生改变时, 回调函数就会调用, 得到数据 
  - 如果先改变的状态, 那当指定回调时, 回调函数就会调用, 得到数据

4. promise.then()返回的新 promise 的结果状态由什么决定?

   （1）简单表达: 由 then()指定的回调函数执行的结果决定

   （2）详细表达：

   - 如果抛出异常，新promise变为rejected，reason为抛出的异常
   - 如果返回的是非promise的任意值，新promise变为resolved，value为返回值
   - 如果返回的是另一个新的promise，此promise的结果就会成为新promise的结果

   ```js
   <script>
           let p = new Promise((resolve, reject) => {
               resolve('ok');
           });
           //执行 then 方法
           let result = p.then(value => {
               // console.log(value);
               //1. 抛出错误
               // throw '出了问题';
               //2. 返回结果是非 Promise 类型的对象
               // return 123;
               //3. 返回结果是 Promise 对象
               return new Promise((resolve, reject) => {
                   resolve('success');
                   // reject('error');
               });
           }, reason => {
               console.warn(reason);
           });
   
           console.log(result);
       </script>
   ```

5. promise 如何串连多个操作任务?

-  promise 的 then()返回一个新的 promise, 可以看成 then()的链式调用

- 通过 then 的链式调用串连多个同步/异步任务

  ```js
  <script>
          let p = new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve('OK');
              }, 1000);
          });
  
          p.then(value => {
              return new Promise((resolve, reject) => {
                  resolve("success");
              });
          }).then(value => {
              console.log(value); //success
          }).then(value => {
              console.log(value); 
              //undefined，因为第二个then没有return，所以return undefined，所以
              //第二个then的返回结果是一个成功的promise且成功的结果是undefined，而不是返回一个promise对象
             //所以第三个then会输出第二个then返回的结果
          })
  
      </script>
  ```

6. promise 异常传透?

- 当使用 promise 的 then 链式调用时, 可以在最后指定失败的回调，前面任何操作出了异常, 都会传到最后失败的回调中处理

  ```js
   <script>
          let p = new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve('OK');
                  // reject('Err');
              }, 1000);
          });
  
          p.then(value => {
              // console.log(111);
              throw '失败啦!';
          }).then(value => {
              console.log(222);
          }).then(value => {
              console.log(333);
          }).catch(reason => { //catch方法最后对错误进行统一的处理
              console.warn(reason);
          });
      </script>
  ```

7. 中断 promise 链?

- 当使用 promise 的 then 链式调用时, 在中间中断, 不再调用后面的回调函数

- 办法: 在回调函数中返回一个 pendding 状态的 promise 对象（有且只有一个方式）

  ```js
  <script>
          let p = new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve('OK');
              }, 1000);
          });
  
          p.then(value => {
              console.log(111);
              //有且只有一个方式
              return new Promise(() => {}); //返回以恶pending状态的promise对象，状态不改变，后面的回调不再执行
          }).then(value => {
              console.log(222); 
          }).then(value => {
              console.log(333);
          }).catch(reason => {
              console.warn(reason);
          });
      </script>
  ```

  

# 3 自定义（手写）Promise

> 这部分看文件夹中的代码

# 4 async 与 await

## 4.1 MDN文档

[async](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)

[await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)

## 4.2 async函数

1. 函数的返回值为 promise 对象
2. promise 对象的结果由 async 函数执行的返回值决定

```js
<script>
        //then
        async function main(){
            //1. 如果返回值是一个非Promise类型的数据
            // return 521;
            //2. 如果返回的是一个Promise对象
            // return new Promise((resolve, reject) => {
            //     // resolve('OK');
            //     reject('Error');
            // });
            //3. 抛出异常
            throw "Oh NO";
        }

        let result = main();

        console.log(result);
 </script>
```

## 4.3 await表达式

1. await 右侧的表达式一般为 promise 对象, 但也可以是其它的值 
2. 如果表达式是 promise 对象, await 返回的是 promise 成功的值 
3. 如果表达式是其它值, 直接将此值作为 await 的返回值

```js
<script>
        async function main(){
            let p = new Promise((resolve, reject) => {
                // resolve('OK');
                reject('Error');
            })
            //1. 右侧为promise的情况，await 返回的是 promise 成功的值
            // let res = await p;
            // console.log(res);
            
            //2. 右侧为其他类型的数据，直接将此值作为 await 的返回值
            let res2 = await 20;
            console.log(res2);
            
            //3. 如果promise是失败的状态,用try catch进行捕获
            try{
                let res3 = await p;
            }catch(e){
                console.log(e); 
            }
        }

        main();
    </script>
```

## 4.4 注意

1. await 必须写在 async 函数中, 但 async 函数中可以没有 await 
2.  如果 await 的 promise 失败了, 就会抛出异常, 需要通过 try...catch 捕获处理

## 4.5 async与await结合使用

```js
/**
 * resource  1.html  2.html 3.html 文件内容
 */

const fs = require('fs');
const util = require('util');
const mineReadFile = util.promisify(fs.readFile);

// //回调函数的方式
// fs.readFile('./resource/1.html', (err, data1) => {
//     if(err) throw err;
//     fs.readFile('./resource/2.html', (err, data2) => {
//         if(err) throw err;
//         fs.readFile('./resource/3.html', (err, data3) => {
//             if(err) throw err;
//             console.log(data1 + data2 + data3);
//         });
//     });
// });

//async 与 await
async function main(){
    try{
        //读取第一个文件的内容
        let data1 = await mineReadFile('./resource/1.html');
        let data2 = await mineReadFile('./resource/2.html');
        let data3 = await mineReadFile('./resource/3.html');
        console.log(data1 + data2 + data3);
    }catch(e){
        console.log(e.code);
    }
}

main();
```

