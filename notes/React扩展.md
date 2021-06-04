[TOC]



# 1. setState

setState更新状态的2中写法

1. setState(stateChange, [callback])------对象式的setState

   - stateChange为状态改变对象(该对象可以体现出状态的更改)

     ```js
     this.setState({count:count+1})
     ```

   - callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用

2. setState（updater,[callback]  ------函数式的setState

   ```js
   this.setState((state,props) => {
           return {count:state.count+1}
       //    return {count:props.x+1}
       })
   ```

   - updater为返回stateChange对象的==函数==
   - updater可以接收到state和props
   - callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用

3. 总结：

   1）对象式的setState式函数式setState的简写方式（语法糖）

   2）使用原则：(仅建议，非绝对)

   - 如果新状态不依赖于原状态  ===> 使用对象方式
   - 如果新状态依赖于原状态   ===> 使用函数方式
   - 如果需要在setState() 执行后获取最新的状态数据，要在第二个callback函数中读取

4. 备注：setState是同步方法，但是setState引起的React的更新的动作是异步执行,如果需要在setState() 执行后获取最新的状态数据，要在第二个callback函数中读取

# 2 lazyLoad

路由组件的lazyLoad：防止资源一次性加载过多，让用户可以按需加载

```js
//1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
	const Login = lazy(()=>import('@/pages/Login'))
	
	//2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
	<Suspense fallback={<h1>loading.....</h1>}>
        <Switch>
            <Route path="/xxx" component={Xxxx}/>
            <Redirect to="/login"/>
        </Switch>
    </Suspense>
```

# 3 Hooks

## 3.1 React Hook / Hook是什么？

1. Hooks是React 16.8.0 版本增加的新特性/新语法
2. 可以让你在==函数组件==中使用state以及其他React特性
   - 函数式组件：用函数定义的组件，适用于简单组件的定义（没有实例，this=undefined）不能用 state，refs

## 3.2 三个常用的Hook

1. State Hook : React.useState()
2. Effect Hook：React.useEffect()
3. Ref Hook：React.useRef()

## 3.3 State Hook

1. State Hook让函数组件也可以有state状态，并进行状态数据的读写操作

2. 语法：const [xxx, setXxx] = React.useState(initValue)  

3. userState()说明

   参数：第一次初始化指定的值在内部做缓存

   返回值：包含两个元素的数组，第1个位内部当前状态值，第2个位更新状态值的函数

4. setXxx() 2种写法：

   setXxx(newValue)：参数为非函数值，直接指定新的状态值，内部用其覆盖原来的状态值

   setXxx(value => newValue)：参数为函数，接收原来的状态值，返回新的状态值，内部用其覆盖原来的状态值

## 3.4 Effect Hook

1. Effect Hook 可以让你在函数组件种执行副作用操作（用于模拟类组件中的生命周期钩子）

2. React中副作用操作：

   发Ajax请求数据

   设置订阅/启动定时器

   手动更改真实DOM

3. 语法和说明

   ```react
   useEffect (() =>{
   //在此可以执行任何带副作用操作
   return () =>{
   //在组件卸载前执行，在此做一些收尾工作，比如清除定时器/取消订阅等
   }
   },[stateValue]) //如果指定的是[],回调函数只会在第一次render()后执行，之后只检测stateValue
   ```

   ```js
   React.useEffect(() => {
           let timer= setInterval(() => { //设置定时器，相当于componentDidMount()，（componentDidUpdate()）
               setCount(count =>  count+1)
           },1000)
           return () => {
               clearInterval(timer) //componentWillUnmount() 
               
           }
     
       },[]) //不写[],检测所有人
   ```

   

4. 可以把useEffect Hook看作是三个函数的组合

    componentDidMount()
           

   componentDidUpdate()
       	

   componentWillUnmount() 

## 3.5 Ref Hook

1. Ref Hook可以在函数组件中存储/查找组件内的标签或任意其他数据

2. 语法：

   ```react
   const refContainer = useRef()
   ```

3. 作用：保存标签对象，功能与React.createRef() 一样

# 4 Fragment

1. 使用

   ```jsx
   <Fragment><Fragment>
   <></>
   ```

2. 作用

   可以不用必须有一个真实的DOM根标签了，fragment会在解析是去掉，【为了骗过jsx】

# 5 Context

1. 理解： 一种组件间通信的方式，常用于【祖组件】和【后代组件】

2. 使用：

   1）创建Context容器对象

   ```js
   const XxxContext = React.createContecxt()
   ```

   2) 渲染子组件时，外面包裹xxxContext.Provider，通过value属性给后代组件传递数据

   ```jsx
   <xxxContext.Provider value={数据}>
   	子组件
   </xxxContext.Provider>
   ```

   3) 后代组件读取数据

   ```jsx
   //第一种方式：仅适用于类组件
   static contextType = xxxContext  //声明接收context
   this.context //读取context中的value数据
   
   //第二种方式：函数组件与类组件都可以
   <xxxContext.Consumer>
       {
       value => { //value 就是 context中value数据
       要显示的内容
   }
   }
   </xxxContext.Consumer>
   ```

   

3. 注意：在应用开发中一般不用context，一般都用它来封装react插件

# 6 组件优化

1. Component的两个问题

   1）只要执行setState()，即使不改变状态数据，组件也会重新render() ==>效率低

   2）只要当前组件重新render()，就会重新render子组件，纵使子组件没有用到父组件的任何数据 ==>效率低

2. 提高效率的做法

   只有当组件的state或者props数据发生变化时才重新render()

3. 原因

   Component 中的shouldComponentUpdate()总是返回true

4. 解决办法：

   1）方法1：

   - 重写shouldComponentUpdate()方法，比较新旧state或props数据，有变化才返回true，否则返回false

   2）方法2：

   - 使用PureComponent

     PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true

   - 注意：

     只是进行state和props数据的浅比较，如果只是数据对象内部数据变了，返回false

     不要直接修改state数据，而是要产生新数据

   3）项目中一般使用方法2来进行优化

# 7 render props

1. 如何向组件内部动态传入带内容的结构（标签）？

   1）vue中：使用slot技术。也就是通过组件标签体传入结构    <A><B/><A>

   2）React 中：

   - 使用children props：通过组件标签体传入结构
   - 使用render props：通过组件标签属性传入结构，而且可以携带数据，一般用render函数属性

2. children props

   ```jsx
   <A>
     <B>xxxx</B>
   </A>
   {this.props.children}
   问题: 如果B组件需要A组件内的数据, ==> 做不到 
   ```

   

3. render props

   ```jsx
   <A render={(data) => <C data={data}></C>}></A>
   A组件: {this.props.render(内部state数据)}
   C组件: 读取A组件传入的数据显示 {this.props.data} 
   ```

   

# 8 错误边界

1. 理解：

   错误边界（Error boundary）：用来捕获==后代==组件错误，渲染出备用页面

   使用于生产环境

2. 特点

   只能捕获后代组件==生命周期==产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

3. 使用方式：

   getDerivedStateFromError配合componentDidCatch

   ```react
   // 生命周期函数，一旦后台组件报错，就会触发
   static getDerivedStateFromError(error) {
       console.log(error);
       // 在render之前触发
       // 返回新的state
       return {
           hasError: true,
       };
   }
   
   componentDidCatch(error, info) {
       // 统计页面的错误。发送请求发送到后台去
       console.log(error, info);
   }
   ```

   

# 9 组件通信方式总结

## 9.1 组件间的关系

- 父子关系
- 兄弟关系（非嵌套组件）
- 祖孙组件（跨级组件）

## 9.2 几种通信方式：

1. props：

   - children props
   - render props

2. 消息订阅——发布

   pubs -sub、event等等

3. 集中管理

   redux、dav等等

4. ConText：

   生产者——消费者模式

## 9.3 比较好的搭配方式

1. 父子组件：props
2. 兄弟组件：消息订阅——发布、集中管理
3. 祖孙组件（跨级组件）：消息订阅——发布、集中式管理、conText（开发用得少，封装插件用得多）