[TOC]



# 1 axios的理解和使用

## 1.1 axios是什么？

1. 前端最流行的ajax请求库
2. react/vue官方都推荐使用axios发Ajax请求
3. 文档：https://github.com/axios/axios

## 1.2 axios的特点

1. 基于xhr+promise的异步ajax 请求库
2. 浏览端/node端都可以使用
3. 支持请求/响应拦截器
4. 支持请求取消
5. 请求/响应数据转换
6. 批量发送多个请求

## 1.3 axios常用语法

![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/image.pstrp0t667k.png)

- axios(config)：通常/最本质的发任意类型请求的方式
- axios(url,config)：可以只指定url发get请求
- axios.request(config)：等同于发axios(config)
- axios.get(url[,config])：发get请求,（config可选，用[]表示可选，下同）
- axiod.delete(url[,config])：发delete请求
- axios.post(url[,data,config])：发post请求
- axios.put(url[,data,config])：发put请求
- axios.defaults.xxx：请求的默认全局配置

<hr>

- axios.interceptors.request.use()：添加请求拦截器
- axios.interceptors.response.use()：添加响应拦截器

```js
 <script>
        //Promise
        //设置请求拦截器 config配置对象
        axios.interceptors.request.use((config) => {
            console.log('请求拦截器  成功  1号');
            
            //失败的情况
            // throw '参数出了问题'
            // 修改config中的参数
            
            config.params = {a:100};

            return config;
        },(error) => {
            console.log('请求拦截器  失败  1号');
            return Promise.reject(error)
        });

        axios.interceptors.request.use((config) => {
            console.log('请求拦截器  成功  2号');
            
            //失败的情况
            // throw '参数出了问题'
            //修改config参数
            config.timeout = 2000;
            return config;
            },(error) => {
                console.log('请求拦截器 失败 - 2号');
                return Promise.reject(error);
            });

        //设置响应拦截器
        axios.interceptors.response.use((response) => {
            console.log('响应拦截器 成功 1号');
            // return response.data;
            return response;
        }, function (error) {
            console.log('响应拦截器 失败 1号')
            return Promise.reject(error);
        });
            
        axios.interceptors.response.use((response) => {
            console.log('响应拦截器 成功 2号');
            return response;   
        },(error) => {
            console.log('响应拦截器 失败 2号');
            return Promise.reject(error)
            
        });

        //发送请求
        axios({
            method:'GET',
            url:'http://localhost:3000/posts'
        }).then(response =>{
            console.log('自定义回调处理成功的结果');
            console.log(response);
            
        }).catch(reason =>{
            console.log('自定义失败回调');
            
        })


    </script>
```

拦截器都成功的情况

![拦截器都成功的情况](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/image.4oazy0pduas0.png)

请求拦截器1号抛出错误的情况

![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/image.9ket3rgvua.png)



请求拦截器2号抛出错误的情况

![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/image.50jfen0zmf40.png)

<hr/>

- axios.create([config])：创建一个新的axios，好处是可以配置不同的默认配置，方便使用

  ```js
  //创建实例对象 /getJoke
          const joke = axios.create({
              baseURL:'https://api.apiopen.top',
              timeout:2000
          })
  
          //创建another实例对象 
          const another = axios.create({
              baseURL: 'https://b.com',
              timeout: 2000
          });
  ```

1. 根据指定配置创建一个新的 axios, 也就就每个新 axios 都有自己的配置 

2.  新 axios 只是没有取消请求和批量发请求的方法, 其它所有语法都是一致的 

3.  为什么要设计这个语法? 

   (1) 需求: 项目中有部分接口需要的配置与另一部分接口需要的配置不太一 样, 如何处理？ 

   (2) 解决: 创建 2 个新 axios, 每个都有自己特有的配置, 分别应用到不同要求的接口请求中



注意：它没有下面的功能



<hr/>

- axios.Cancel()：用于创建取消请求的错误对象
- axiod.CancelToken()：用于创建取消请求的token对象
- axios.isCancel()：是否是一个取消请求的错误
- axios.all(promise)：用于批量执行多个异步请求
- axios.spread()：用来指定接收所有成功数据的回调函数的方法



取消请求：

1. 基本流程

   配置cancelToken对象

   缓存用于取消请求的cancel函数

   在后面特定时机调用cancel函数取消请求

   在错误回调中判断如果error是cancel，做响应处理

2. 实现功能

   点击按钮，取消某个正在请求中的请求

   在请求一个接口前，取消前面一个未完成的请求

```js
<script>
        //获取按钮
        const btns = document.querySelectorAll('button');
        //2.声明全局变量
        let cancel = null;
        //发送请求
        btns[0].onclick = function(){
            //检测上一次的请求是否已经完成
            if(cancel !== null){
                //取消上一次的请求
                cancel();
            }
            axios({
                method: 'GET',
                url: 'http://localhost:3000/posts',
                //1. 添加配置对象的属性
                cancelToken: new axios.CancelToken(function(c){
                    //3. 将 c 的值赋值给 cancel
                    cancel = c;
                })
            }).then(response => {
                console.log(response);
                //将 cancel 的值初始化
                cancel = null;
            }).catch((reason) => {
                console.log('请求取消');
                
            })
        }

        //绑定第二个事件取消请求
        btns[1].onclick = function(){
            cancel();
        }
    </script> 
```



# 2 axios源码分析

## 2.1 源码目录结构

![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/image.7e9gdrxs0rc.png)

## 2.2 源码分析

### 2.2.1 axios与Axios的关系

1. 从语法上来说：axios不是Axios的实例

2. 从功能上来说：axios是Axios的实例  (axios拥有Axios实例对象上的方法)

3. axios是Axios.prototype.request函数bind()返回的函数

4. axios作为对象，有Axios原型对象上的所有方法，有Axios对象的所有属性

   ![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/image.4so8u5gvxxq0.png)

### 2.2.2 instance 与 axios 的区别?

1. 相同：

   （1）都是一个能发任意请求的函数：request(config)

   （2）都有发特定请求的各种方法：get()/post()/put()/delete()

   （3）都有默认配置和拦截器的属性: defaults/interceptors

2. 不同：

   （1）默认配置很可能不同

   （2）instance 没有 axios 后面添加的一些方法：create()/ CancelToken()/ all()

![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/image.xk9n12p3134.png)

### 2.2.3 响应拦截器的执行顺序问题

这一部分先看前面的1.3 拦截器的代码和结果

这一步的关键源码如下：

![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/image.8s6mbng9x2o.png)

![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/image.6mnhqhkum5g0.png)

![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/image.17jyfze5g8xs.png)



![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/image.4r8qygmnspi0.png)



因为chain数组中每次要取出两个，所以要加入一个undefined用作占位



- 总的来说，真正调用的（dispatchRequest）放中间，undefined占位，请求头插，响应尾放



执行顺序如下：

- 所有拦截器都成功的执行顺序

![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/image.qsgya3f3a6o.png)

- 2号请求拦截器抛出异常的执行顺序

![image-20210530105719972](../../AppData/Roaming/Typora/typora-user-images/image-20210530105719972.png)



其他情况类似

### 2.2.4 axios 运行的整体流程?

![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/image.5o7mtk685fg0.png)

1. 整体流程:  request(config) ==> dispatchRequest(config) ==> xhrAdapter(config)

2. request(config):  将请求拦截器 / dispatchRequest() / 响应拦截器 通过 promise 链串连起来,  返回 promise 

3. dispatchRequest(config):  转换请求数据 → 调用 xhrAdapter()发请求 → 请求返回后转换响应数 据. 返回 promise

4.  xhrAdapter(config):  创建 XHR 对象, 根据 config 进行相应设置, 发送特定请求, 并接收响应数据,  返回 promise 

   

### 2.2.5 axios 的请求/响应拦截器是什么？
![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/image.ykejnssor1c.png)

1. 请求拦截器:  

   在真正发送请求前执行的回调函数 

   可以对请求进行检查或配置进行特定处理 

   成功的回调函数, 传递的默认是 config(也必须是) 

   失败的回调函数, 传递的默认是 error

2. 响应拦截器

   在请求得到响应后执行的回调函数 

   可以对响应数据进行特定处理 

   成功的回调函数, 传递的默认是 response 

   失败的回调函数, 传递的默认是 error

### 2.2.6. axios 的请求/响应数据转换器是什么?

这部分的功能可以由拦截器来完成

1. 请求转换器: 对请求头和请求体数据进行特定处理的函数 

```js
if (utils.isObject(data)) {
 setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
 return JSON.stringify(data);
}
```



1. 响应转换器: 将响应体 json 字符串解析为 js 对象或数组的函数 

```
response.data = JSON.parse(response.data)
```

### 2.2.7 response 的整体结构

```
{
 data,
 status,
 statusText,
 headers,
 config,
 request
 }
```

### 2.2.8 error 的整体结构

```
{
	message,
	response,
	request
}

```

### 2.2.9 如何取消未完成的请求?

1. 当配置了 cancelToken 对象时, 保存 cancel 函数 

   (1) 创建一个用于将来中断请求的 cancelPromise

   (2) 并定义了一个用于取消请求的 cancel 函数

   (3) 将 cancel 函数传递出来 

2. 调用 cancel()取消请求

   (1) 执行 cacel 函数, 传入错误信息 message

   (2) 内部会让 cancelPromise 变为成功, 且成功的值为一个 Cancel 对象 

   (3) 在 cancelPromise 的成功回调中中断请求, 并让发请求的 proimse 失败,  失败的 reason 为 Cancel 对象



# 3 模拟代码

## 3.1 模拟发送请求代码

```html
 <script>
        //axios发送请求 axios Axios.prototype.request  bind
        //1.声明构造函数
        function Axios(config){
            this.config = config;
        }

        Axios.prototype.request = function(config){
            //发送请求
            //做一些合并工作，但这里并不需要合并
            //创建一个promise对象
            let promise = Promise.resolve(config);
            // console.log(promise);
            //声明一个数组
            let chains = [dispatchRequest,undefined];//undefined占位
            //调用then方法指定回调
            let result = promise.then(chains[0],chains[1]);
            //返回promise的结果
            return result;
        }

        //2.dispatchRequest函数
        function dispatchRequest(config){
            //调用适配器发送请求
            return xhrAdapter(config).then(response =>{
                //对响应的结果进行转换处理
                //...
               return response;
                
            },error =>{
                throw error;
                
            })
            

        }

        //3.Adapter适配器
        function xhrAdapter(config){
            console.log('xhrAdapter函数执行');
            return new Promise((resolve,reject) => {
                /*发送ajax请求*/
                //创建对象
                let xhr = new XMLHttpRequest();
                //初始化
                xhr.open(config.method,config.url)
                //发送
                xhr.send();
                //绑定事件
                xhr.onreadystatechange = () => {
                    if(xhr.readyState === 4){
                        if (xhr.status>=200 && xhr.status<300) {
                            //成功的状态
                            resolve({
                                //配置对象
                                config:config,
                                //响应体
                                data:xhr.data,
                                //响应头
                                header: xhr.getAllResponseHeaders(), //字符串
                                //xhr请求对象
                                request: xhr,
                                //响应状态码
                                status:xhr.status,
                                //响应状态字符串
                                statusText:xhr.statusText

                            });
                            
                        }else{
                            //失败的状态
                            reject(new Error('请求失败 状态码为' + xhr.status))
                        }
                    }
                    
                }
                
            })
            
        }

        //4. 创建 axios 函数
         let axios = Axios.prototype.request.bind(null);
        axios({
            method:'GET',
            url:'http://localhost:3000/posts'
        }).then(response => {
            console.log(response);
        });
    </script>
```

## 3.2 模拟拦截器

```html
<script>
       //构造函数
       function Axios(config){
           this.config = config;
           this.interceptors = {
               request:new InterceptorManager(),
               response:new InterceptorManager(),
           }
       }
       //发送请求 难点与重点
       Axios.prototype.request = function(config){

        //创建一个promise对象
        let promise = Promise.resolve(config);
        //创建一个数组
        let chains = [dispatchRequest,undefined];
        //处理拦截器
        //请求拦截器 将请求拦截器的回调 压到chains的前面 request.handles = []
       this.interceptors.request.handlers.forEach( item=>{
           chains.unshift(item.fulfilled,item.rejected)
       });
       //请求拦截器 将请求拦截器的回调 压到chains的后面 request.handles = []
       this.interceptors.response.handlers.forEach( item=>{
           chains.push(item.fulfilled,item.rejected)
       });
    //  console.log(chains);
       while(chains.length > 0){
           promise = promise.then(chains.shift(),chains.shift());
       }
       return promise
     
       }
       //发送请求
       function dispatchRequest(config) {
           //返回一个promise对象
           return new Promise((resolve,reject) => {
               resolve({
                   status:200,
                   statusText:'OK'
               })
           })
       }     
       //创建实例
       let context = new Axios({})
        //创建axios函数
        let axios = Axios.prototype.request.bind(context);

       //将context属性添加到axios函数对象上
       Object.keys(context).forEach(key =>{
           axios[key] = context[key];
       })
       //拦截器管理器构造函数 ,用于保存回调
       function InterceptorManager(){
           this.handlers = [];
       }

       InterceptorManager.prototype.use = function (fulfilled,rejected) {
           this.handlers.push({
               fulfilled,
               rejected
           })
       }
       
       
        //以下为功能测试代码
        // 设置请求拦截器  config 配置对象
        axios.interceptors.request.use(function one(config) {
            console.log('请求拦截器 成功 - 1号');
            return config;
        }, function one(error) {
            console.log('请求拦截器 失败 - 1号');
            return Promise.reject(error);
        });

        axios.interceptors.request.use(function two(config) {
            console.log('请求拦截器 成功 - 2号');
            return config;
        }, function two(error) {
            console.log('请求拦截器 失败 - 2号');
            return Promise.reject(error);
        });

        // 设置响应拦截器
        axios.interceptors.response.use(function (response) {
            console.log('响应拦截器 成功 1号');
            return response;
        }, function (error) {
            console.log('响应拦截器 失败 1号')
            return Promise.reject(error);
        });

        axios.interceptors.response.use(function (response) {
            console.log('响应拦截器 成功 2号')
            return response;
        }, function (error) {
            console.log('响应拦截器 失败 2号')
            return Promise.reject(error);
        });


        //发送请求
        axios({
            method: 'GET',
            url: 'http://localhost:3000/posts'
        }).then(response => {
            console.log(response);
        });
    </script>
```



##  3.3 模拟取消请求

```html
<body>
    <div class="container">
        <h2 class="page-header">axios取消请求</h2>
        <button class="btn btn-primary"> 发送请求 </button>
        <button class="btn btn-warning"> 取消请求 </button>
    </div>
    <script>
        //构造函数
        function Axios(config){
            this.config = config;
        }
        //原型request方法
        Axios.prototype.request = function(config){
            return dispatchRequest(config);
        }
        function dispatchRequest(config){
            return xhrAdapter(config)
        }
        //xhrAdapter
        function xhrAdapter(config){
            //发送Ajax请求
            return new Promise((resolve,reject) => {
                //实例化对象
                const xhr = new XMLHttpRequest();
                //初始化
                xhr.open(config.method,config.url);
                //发送
                xhr.send();
                //处理结果
                xhr.onreadystatechange = () => {
                    //判断结果
                    if (xhr.readyState===4) {
                        if (xhr.status>=200 && xhr.status<300) {
                            //设置成功状态
                            resolve({
                                status:xhr.status,
                                statusText:xhr.statusText
                            })
                            
                        }else{
                            reject(new Error('请求失败'))
                        }
                    }
                }
                //关于取消请求的处理
                if (config.cancelToken) { //如果config有cancelToken
                    //对cancelToken对象身上的promise对象指定成功的回调
                    config.cancelToken.promise.then(value =>{
                        xhr.abort();
                        //将整体结果设置为失败
                       // reject(new Error('请求已经被取消'))
                    })
                }
            })
        }
        //创建axios函数
        const context = new Axios({})
        const axios = Axios.prototype.request.bind(context);
        //CancelToken 构造函数
        function CancelToken(executor){
            //声明一个变量
            var resolvedPromise
            //为实例对象添加属性
            this.promise = new Promise((resolve) =>{
                //将resolve赋值给resolvePromise 
                resolvedPromise=resolve; //使resolvePromise和resolve功能一样
            });
        //调用executor函数
        executor(function(){
            //执行resolvePromise函数
            resolvedPromise();
        })
        }        
        //获取按钮 以上为模拟实现的代码
        const btns = document.querySelectorAll('button');
        //2.声明全局变量
        let cancel = null;
        //发送请求
        btns[0].onclick = function(){
            //检测上一次的请求是否已经完成
            if(cancel !== null){
                //取消上一次的请求
                cancel();
            }

            //创建 cancelToken 的值
            let cancelToken = new CancelToken(function(c){
                cancel = c;
            });

            axios({
                method: 'GET',
                url: 'http://localhost:3000/posts',
                //1. 添加配置对象的属性
                cancelToken: cancelToken
            }).then(response => {
                console.log(response);
                //将 cancel 的值初始化
                cancel = null;
            })
        }

        //绑定第二个事件取消请求
        btns[1].onclick = function(){
            cancel();
        }
    </script>   
</body>
```

# 4 其他

参考视频：[尚硅谷axios视频](https://www.bilibili.com/video/BV1wr4y1K7tq?from=search&seid=14715949355001381263)

