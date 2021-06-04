[TOC]



# 1 Redux理解

## 1.1 学习文档

1. 英文文档: https://redux.js.org/

2. 中文文档: http://www.redux.org.cn/

3. Github: https://github.com/reactjs/redux

## 1.2 Redux是什么

1. Redux是一个专门用于做==状态管理==的JS库（不是react插件库）
2. 它可以用在React，Angular，vue等项目中，但基本与React配合使用
3. 作用：集中式管理React应用中多个组件共享的状态

## 1.3 什么情况下需要使用Redux

1. 某个组件的状态，需要让其他组件可以随时拿到（共享）
2. 一个组件需要改变另一个组件的状态（通信）
3. 总体原则：能不用就不用，如果不用比较吃力才考虑使用

## 1.4 Redux工作流程

![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/image.5qcxewf1ah40.png)

备注：redux只负责管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写

# 2 Redux的三个核心概念

## 2.1 Action

1. 动作的对象

2. 包含2个属性

   - type：标识属性，值为字符串，唯一，必要属性
   - data：数据属性，值类型任意，可选属性

3. 例子：

   ```js
   {
   	type:'ADD STUDENT',
   	data:{name:'Tom',age:18}
   }
   ```

## 2.2 Reducer

1. 用于初始化状态，加工状态

2. 加工时，根据旧的state和action，产生新的state的纯函数

3. 说明：

   1）reducer的本质是一个函数，接收：prestate , action，返回加工后的状态

   2）reducer的两个作用：初始化状态，加工状态

   3）reducer被第一次调用是由store自动触发的，传递的preState是undefined，传递的action是{type:'@@REDUX/INIT_a.2.b.4}【类似】

## 2.3 Store

1. 将state、action、reducer联系在一起的对象

2. 如何得到此对象

   （1）

   ```js
   import {createStroe} from 'redux'
   ```

   （2）

   ```js
   import reducer from './reducers'
   ```

   （3）

   ```js
   const stroe = createStore(reducer)
   ```

3. 此对象的功能

   （1）getState()：得到state

   （2）dispatch(action)：分发action，触发reducer调用，产生新的state

   （3）subscribe(listener)：注册监听，当产生了新的state时，自动调用

4. 编码：

   1）引入redux中的createStore函数，创建一个store

   2）createStore调用时要传入一个为其服务的reducer

   3）记得暴露store对象

   

# 3 Redux的核心API

## 3.1 createstore()

作用：创建包含指定 reducer 的 store 对象

## 3.2 store 对象

1. 作用：redux库最为核心的管理对象

2. 它内部维护着：

   1）state

   2）reducer

3. 核心方法：

   1）getState() ：获取状态

   2）dispatch(action)：分发动作

   3）subscribe(listener)：监测redux中状态的改变，如redux的状态发生改变，那么重新渲染App组件

   备注：使用了react-redux后也不用再自己检测redux中状态的改变了，容器组件可以自动完成这个工作

4. 具体编码

   1）store.getState()

   2）store.dispatch({type:INCREMENT, nubmer})

   3）这一步在react-redux中会自动完成

   ```js
   //放在index.js中
   store.subscribe(() => {
       ReactDOM.render(<App/>,document.getElementById('root'))
   })
   ```

## 3.3 applyMiddleware()

作用：应用上基于redux的中间件(插件库)

Middleware 最常见的使用场景是无需引用大量代码或依赖类似 Rx 的第三方库实现异步 actions。这种方式可以让你像 dispatch 一般的 actions 那样 dispatch 异步 actions。

```js
import {createStore,applyMiddleware} from 'redux';
//引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk';
//引入redux-devtools-extension
import {composeWithDevTools} from 'redux-devtools-extension'
//暴露store
export default createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)))
```

## 3.4 combineReducer()

作用：合并多个reducer函数

```js
//引入combineReducer， 用于整合多个reducer
import {combineReducers} from 'redux';
//引入为Count组件服务的reducer
import count from './count';
//引入为Person组件服务的reducer
import persons from './person';


//汇总所有的reducer变为一个总的reducer
export default  combineReducers({
    count,
    persons
})
```

# 4 redux异步编程

## 4.1 理解

1. redux默认是不能进行异步处理的,

2. 某些时候应用中需要在==redux中执行异步任务==(ajax, 定时器)

```js
//异步的action ，返回值为函数,异步action中一般都会调用同步action，异步action不是必须要用的
export const incrementAsync = (data,time) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(increment(data))
        }, time);
    }
    
}
```

## 4.2 说明

   1. 何时用：延迟的动作不想交给组件自身，想交给action

   2. 何时需要异步action：想要对状态进行操作，但是具体的数据靠异步任务返回

   3. 具体编码：

      1）yarn add redux-thunk，并配置在store中

      ```js
      export default createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)))
      ```

      2）创建action的函数不再返回一般对象，而是一个函数，该函数中写异步任务。

      3）异步任务有结果后，分发一个同步的action去真正操作数据。

4. 备注：异步action不是必须要写的，完全可以自己等待异步任务的结果了再去分发同步action。

# 5 react-redux

##  5.1 理解

1. 一个react插件库
2. 专门用来简化react应用使用的redux
3. 备注：redux并非是专门用于react的，也不是Facebook出的，而react-redux是Facebook出的

## 5.2 原理图

![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/react-redux模型图.3i7jeiz21hg0.png)

## 5.2 react-Redux两大类组件

1. UI组件

   1）只负责UI的呈现，不带有任何业务逻辑

   2）通过props接收数据(一般数据和函数)

   3）不使用Redux中的任何API

   4）一般保存在component文件夹中

2. 容器组件

   1）负责数据和业务逻辑，不负责UI的呈现，负责和redux通信，将结果交给UI组件

   2）使用Redux的API

   3）一般保存在container文件夹中

3. 一个组件要和redux打交道要经过哪几步？

   1）定义好UI组件 ——不暴露

   2）引入connect生成要给容器组件，并暴露，写法如下

   ```js
   connect(state =>({key:value}),//映射状态
           {key:xxxAction}  //映射操作状态的方法
          )(UI组件)
   ```

   3）在UI组件中通过this.props.xxx读取和操作状态

## 5.3 相关API

1. Provider：让所有的组件都得到state数据

   ```js
       <Provider store={store}>
           <App/>
       </Provider>,document.getElementById('root'))
   
   ```

   

2. connect：用于包装UI组件生成容器组件

   ```js
   import { connect } from 'react-redux'
     connect(
       mapStateToprops,//映射状态，返回值是一个对象
       mapDispatchToProps//映射操作状态的方法，返回值是一个对象
     )(Counter)
   ```

   

3. mapStateToprops：将外部的数据（即state对象）转换为UI组件的标签组件

   1）mapStateToProps函数返回的是一个对象

   2）返回对象中的key就作为传递给UI组件props的key，value就作为传递给UI组件的props的value

    3）mapStateToProps用于传递状态

   ```js
   const mapStateToprops = function (state) {
     return {
       value: state
     }
   }
   ```

   

4. mapDispatchToProps：将分发action的函数转换为UI组件的标签属性

    1）mapDispatchToProps函数返回的是一个对象

    2）返回对象中的key就作为传递给UI组件props的key，value就作为传递给UI组件的props的value

    3）mapDispatchToProps用于传递操作对象的方法

   备注：mapDispatchToProps，也可以是一个对象

5. combindeReducers：用于合并多个reducer，使其可以数据共享，合并后的总状态是一个对象！！！

   ```js
   //引入combineReducer， 用于整合多个reducer
   import {combineReducers} from 'redux';
   //引入为Count组件服务的reducer
   import count from './count';
   //引入为Person组件服务的reducer
   import persons from './person';
   //汇总所有的reducer变为一个总的reducer
   export default  combineReducers({
       count,
       persons
   })
   
   ```

   ==备注==：交给store的是总reducer，最后注意在组件中取出状态的时候，记得“取到位”，要明确到是哪个状态（state.xxx）。

# 6 redux调试工具

1. 安装chrome浏览器插件

   ![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/image.3z9ut9aoibi0.png)

2. 下载工具依赖包

```
npm install --save-dev redux-devtools-extension
```

3. store中进行配置

```react
import {composeWithDevTools} from 'redux-devtools-extension'
					const store = createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))
```



# 7 纯函数和高阶函数

## 7.1 纯函数

1. 一类特别的函数：只要是同样的输入（实参），必定得到同样的输出（返回）

2. 必须遵守以下一些约束

   1）不得改写参数数据

   2）不会产生任何副作用，例如网络请求，输入和输出设备

   3）不能调用Date.now()，或者Math.random()等不纯的方法

3. redux的reducer函数必须要是一个函数

## 7.2 高阶函数

1. 理解：一类特别的函数

   1）情况1：参数是函数

   2）情况2：返回是函数

2. 常见的高阶函数：

   1）定时器设置函数

   2）数组的forEach()/ map()/ filter()/ reduce()/ find()/ bind()

   3）promise

   4）reactr-reduc中的connect函数

3. 作用：能实现更加动态，更加可扩展的功能
