[TOC]

# 1 为什么要使用React
1. **开发迅速**。React组件化的特性使得React可以在项目中大量复用封装好的组件，提高代码的复用率，减少了重复写相同代码的繁琐而无聊的工作

> - 原生的JavaScript操作DOM繁琐，效率低（DOM-API操作UI）
> - 使用JavaScript，包括jQuery直接操作DOM，浏览器会进行大量的重绘和重排（虽然jQuery简化了操作DOM的步骤，但依然效率低下）
> - 原生的JavaScript没有组件化编码方案，代码复用率低

2. **生态相对完善**。React 起源于 Facebook 的内部项目，具有相对稳定的维护，周边生态相对完善，像各种的UI库，路由库等，可以在更少的时间内完成更多的工作。
3. **有大公司作为背书**。除了React的开发公司Faceboook大量使用React外，国内外还有很多大公司也广泛应用React，在国外有Paypal，Airbnb等，在国内有阿里，腾讯，字节跳动等。
4. **有强大的开源社区**。开源项目的社区非常重要，在社区开发者的贡献下会让一些开源项目变得越来越好，项目的issue的解决速度也会得到提升，同时还会提供大量的周边技术工具和技术博客。

# 2 React的定义
React的定义：用于==构建用户界面==的==JavaScript库==。
**关键字**：
1. **构建用户界面**:说明React专注于视图的构建，既不是一个请求库，也不是一个打包工具，而是主要提供UI层面的解决方案。
2. **JavaScript库**：这说明React并不是一个框架，并不能解决项目中的所有问题，为了在项目中使用它，需要结合其他的库，例如Redux/React-router等来协助提供完整的解决方案。在这些周边生态的配合下才能组合成一个框架
> 换句话来说，React所做的有三步
>
> 1. 发送请求获得数据
> 2. 处理数据（过滤，整理格式等）
> 3. 操作DOM呈现页面
>
> 也就是说React也可以定义为一个将数据渲染为HTML视图的开源JavaScript库。

# 3 React的三大特性
1. **声明式编程**：
>命令式编程 VS 声明式编程：<br>
>
>简单来说，命令式编程就是通过代码来告诉计算机去做什么。<br>
>
>而声明式编程是通过代码来告诉计算机你想要做什么，让计算机想出如何去做。<br>
>
>举个生活中的例子就是：
>**命令式编程**：我想喝一个冰可乐，然后我就会对身边的XXX说：“XXX，你去厨房，打开冰箱，拿出一瓶冰可乐，打开之后送过来给我。”
>**声明式编程**：我想喝一个冰可乐，然后我就会对身边的XXX说：“XXX，我想喝冰可乐。”而具体他是怎么拿到的冰可乐，怎么送过来的，是下楼买的还是在冰箱里拿的，我并不关心，我只关心我喝冰可乐的需求是否得到了满足。<br>
>
>用代码来举个例子：
>如果我要在界面上展示一个按钮，并且点击按钮后会改变该按钮的class。<br>
>用DOM编程写的代码就是命令式编程：首先你要指挥浏览器，第一步先要找到id为container的节点，然后创建一个button element，接着给这个button添加一个class name，然后添加一个点击事件，最后将button添加到container节点里。这整个过程每一步操作都是命令式的，一步一步告诉浏览器要做什么。

```javascript
const container = document. getElementById ( "container" );
const btn = document.createElement ("button");

btn.className = "btn red " ;
btn.textContent = "Demo" ;

btn.onclick = function ( ) {
    if ( this.classList.contains ( "red" ) ) {
		this.classList.remove( "red" );
		this.classList.add ( "blue" );
	}else {
	this.classList.remove( "blue" );
	this.classList.add ( "red" );
	}
};
container.appendChild( btn);

```
>而要实现相同功能，采用声明式编程的React就简单得多了。
>首先我们定义一个Button组件，在render函数里通过返回一个类似HTML的数据结构，告诉React我要渲染一个Button，它是id为container的子节点。Button上的ClassName是动态变化的，当点击按钮时class要改变，这样就可以了。至于render什么时候被执行，是如何渲染到页面上的，点击按钮之后classname是如何更新的，这些都不需要你关心，你只需要告诉React你希望当前的UI应该是一个什么样的状态就可以了。
```javascript
class Button extends React. Component {
    state = { color: "red" };
    handleChange =()=> {
        const color = this.state.color == "red" ? "blue" : "red" ;this.setState({ color });
    };
    render( ) {
        return (
        <div id="container">
            <button
                className={ `btn ${this.state.color}` }
                onclick={this.handleChange}
            >
                Demo
            </button>
        </div>
     );
    }
}


```

2. **组件化**：React提供了一种全新的语法扩展，JSX。JSX创造性地将渲染逻辑和UI逻辑结合在了一起，而这个结合体在React中就被称为组件。一个页面由多个组件组成，甚至整个应用都可以视为一个组件，只不过是最大的组件。组件可以层层嵌套，一个组件可以由多个组件组成，一个大的组件由很多个小组件组成，这些小组件也有可能由更小的组件组成。同一个组件可能会被使用在不同的地方。<br>
组件化的出现大幅度地提升了代码地复用率，同时也改变了前端开发人员的一个编程思维
3. **一次学会，随处编写**：这句话的意思不是学会了想写什么就可以写什么，也不是说写一次想在哪里跑就在哪里跑，而是说学会后可以在很多地方使用React的语法来写代码，比如配合React DOM来编写web端的页面，配合React Native来写手机客户端APP，配合React 360开发VR界面等。
<br>React的灵活性是由于它自身的定位决定的。React是一个用于构建用户界面的JS库，对于React来说，这里的用户界面是一个抽象的虚拟的用户界面，其实就是一个描述页面状态的数据结构。web页面，移动客户端页面，VR界面都是用户界面，只要配合相应的渲染器就能在不同的平台中展示正确的UI界面。
<br>通俗来说，我们可以把React的执行结果想象成一个视频文件数据，在不同的播放器设备，我们通过转换器将视频编译成不同的格式来让他们在不同的播放器上正常地播放。所以在写web端React时我们要额外引入React DOM来做渲染。

> 此外，React使用虚拟DOM+优秀的Diffing算法，尽量减少与真实DOM的交互，最小化页面重绘

# 4 React入门

## 4.1 hello_react

![image-20210424154725197](https://gitee.com/the-circle-of-ignorance/images/raw/master/images%5Creact/image-01-2.png)

## 4.2 虚拟DOM的创建

1. 创建虚拟DOM的两种方式

   - 纯JS方式（一般不用,过于繁琐）
   - JSX方式（简单方便，最终由babel翻译成js的形式，与用js写的结果一样）

2. 虚拟DOM和真实DOM

   - React提供一些API来创建一种“特别”的==一般js对象==

     > ```javascript
     > const VDOM = React.createElement('xx',{id:'xx'},'xx')///依次为标签名，标签属性和标签内容
     > ```

     上面创建的就是一个简单的虚拟DOM对象

     ![image-20210424164734063](https://gitee.com/the-circle-of-ignorance/images/raw/master/images%5Creact/image-20210424164734063.png)

     ![image-20210424164842135](https://i.loli.net/2021/04/25/qwd6egtIJMapLmA.png)

   - 我们编码时基本只需要操作react的虚拟DOM相关数据，react就会转换为真实的DOM

   >关于虚拟DOM总结：
   >
   >1. 本质是Object类型的对象（一般对象）
   >2. 虚拟DOM比较“轻”，真实DOM比较“重”，因为虚拟DOM是React内部在用，无需真实DOM上那么多的属性
   >3. 虚拟DOM对象最终都会被React转换为真实DOM，呈现在页面上

## 4.3 JSX

> 链接：[JSX基本语法规则](https://www.runoob.com/react/react-jsx.html)

>1. 全称: JavaScript XML
>
>2. react定义的一种类似于XML的JS扩展语法: JS + XML，本质上还是JavaScript
>
>3. 是**React.createElement(component, props, ...children)**方法的语法糖
>
>4. 作用：用来简化创建虚拟DOM
>
>  - 写法：var ele =<h1>Hello JSX!</h1>
>  - 它不是字符串（不要加引号），也不是HTML/XML标签
>  - 它最终产生的就是一个js对象
>
>5. 标签名任意：HTML标签或其他标签
>
>6. 标签属性随意：HTML标签属性或其它
>
>7. 基本语法规则
>
>  - 标签首字母
>
>    ​    	（1）若小写字母开头，则将该标签转为HTML中同名元素，若HTML中无该标签对应的同名元素，则报错。
>
>    ​		 （2）若大写字母开头，则react就去渲染对用的组件，若组件没有定义，则报错
>
>  - 标签中的==js表达式==必须用{ }包含
>
>    > 一定要区分：【JS语句（代码）】与【js表达式】
>    >
>    > 1. 表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方
>    >
>    >    下面这些都是表达式：
>    >
>    >    - a
>    >    - a+b
>    >    - demo(1) //函数调用表达式
>    >    - arr.map()
>    >    - function test() { }
>    >
>    > 2. 语句（代码）：不产生值
>    >
>    >    ​	下面这些都是语句（代码）：
>    >
>    >    - if(){}
>    >    - for(){}
>    >    - switch(){case:xxx}
>
>  - 注释需要写在花括号{}中
>
>  - 样式的类名指定不要写class，要写className
>
>  - 内联样式要用style={{key:value}}的形式写第一个{}表示里面是一个js表达式，第二个{}表示里面是一个键值对，里面要写小驼峰的形式， 比如font-size要写成fontSize
>
>    ><span style={{color:'#e0e0e0', fontSize:18} }> myData</span>
>
>  - 虚拟DOM只能有一个根标签，有多个标签时，可用一个div包起来
>
>  - 标签必须闭合
>
>8.   babel.js的作用
>
>  - 浏览器不能直接解析JSX代码, 需要babel转译为纯JS的代码才能运行
>  - 只要用了JSX，都要加上type="text/babel", 声明需要babel来处理

## 4.4 模块与组件，模块化与组件化的理解

> 1. 模块
>
> - 理解：向外提供特定功能的js程序，一般就是一个js文件
> - 为什么要拆成模块：因为随着业务逻辑增加，代码越来越多且复杂
> - 作用：服用js，简化js的编写，提高js运行效率

> 2. 组件
>
> - 理解：用来实现局部功能的代码和资源的集合（html/css/js/image等等）
> - 为什么一个界面的功能很复杂，不可能写成一整块，要分成一块块写，然后拼起来
> - 作用：复用编码，简化项目编码，提高运行效率

>3. 模块化
>
>   当一个应用的js都是以模块来编写，这个应用就是一个模块化的应用
>
>4. 组件化
>
>   当应用是以多组件的方式实现，这个应用就是一个组件化的应用
>
>   ![image-20210425114123063](https://gitee.com/the-circle-of-ignorance/images/raw/master/images%5Creact/image-20210425114123063.png)

# 5 React面向组件编程

## 5.1 基本理解和使用

组件的类型

1. 函数式组件：用函数定义的组件，适用于简单组件的定义（没有实例，this=undefined）

![image-20210425170027082](https://gitee.com/the-circle-of-ignorance/images/raw/master/images%5Creact/image-20210425170027082.png)

​			注意：

​						(1)组件名必须首字母大写

​					   (2)虚拟DOM元素只能有一个根元素

​					    (3)虚拟DOM元素必须有结束标签



2. 类式组件：用类定义的组件，适用于复杂组件的定义（有实例）

> 简单组件：无状态的组件
>
> 复杂组件：有状态(state)的组件
>
> 
>
> 状态：举例子说
>
> - 人是有状态的，比如今天的精神如何，人的状态会影响人的行为
> - 组件也是有状态的，组件的状态驱动页面，数据放在状态里
>
> 

## 5.2 组件实例的三大核心属性

### 5.2.1 state

1. 理解：

- state是组件对象最重要的属性, 值是==对象(==可以包含多个key-value的组合),用{}包裹
-  组件被称为"状态机", 通过更新组件的state来更新对应的页面显示(重新渲染组件)

2. 注意：

- 组件中render方法中的this为组件实例对象
- 组件自定义的方法中this为undefined(作为事件的回调使用)，如何解决？
  - a)   强制绑定this: 通过函数对象的bind()
  - b)   箭头函数【要写成赋值语句+箭头函数的形式，类里面不支持function(){   }这种形式】
-  状态数据，不能直接修改或更新，要用setState



###  5.2.2 props

1. 理解：

-  每个组件对象都会有props(properties的简写)属性
-  组件标签的所有属性都保存在props中

2. 作用

- 通过标签属性从组件外向组件内传递变化的数据
- 注意: 组件内部不要修改props数据

3. 编码操作

-  内部读取某个属性值： this.props.name

-  对props中的属性值进行类型限制和必要性限制

  - 第一种方式（React v15.5 开始已弃用）：

    ```javascript
    Person.propTypes = {
     name: React.PropTypes.string.isRequired,
     age: React.PropTypes.number
    }
    ```

  - 第二种方式（新）：使用prop-types库进限制（需要引入prop-types库）

    ```javascript
    Person.propTypes = {
      name: PropTypes.string.isRequired,
      age: PropTypes.number. 
    }
    ```

- 扩展属性：将对象的所有属性通过props传递：<**Person** {...person}/>

-   默认属性值：

  ```javascript
  Person.defaultProps = {
    age: 18,
    sex:'男'
  }
  ```

- 组件类的构造函数              

  ```javascript
  constructor(props){
    super(props)
    console.log(props)//打印所有属性
  }
  ```

###        5.2.3 ref

1. 理解：组件内的标签可以定义ref属性来标识自己

2. 编码

- 字符串形式的ref：（已经不被react推荐使用）[官方说明](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs)

  ```react
  <input ref = 'input1'/>
  ```

- 回调形式的ref

  ```react
  <input ref={(c)=>{this.input1 = c}}
  ```

-  createRef创建ref容器

  ```react
  myRef = React.createRef() ;
  <input ref={this.myRef}/>
  ```

## 5.3 React中的事件处理

1. 通过onXxx属性指定处理函数（注意大小写，与原生的js区分开）

   ​	a)   React使用的是自定义(合成)事件, 而不是使用的原生DOM事件  ——目的是为了更好的兼容性

   ​	b)   React中的事件是通过事件委托方式处理的(委托给组件最外层的元素)  ——目的是为了高效

2.  通过event.target得到发生事件的DOM元素对象 ——为了避免过度使用ref

   不要过度使用ref，当发生事件的DOM正好是要操作的DOM元素时可以用event.target的形式



## 5.4 React中收集表单数据

### 5.4.1 非受控组件与非受控组件

非受控组件：现用现取（ref）

受控组件：随着输入维护状态为受控组件（onChange ， setState）

## 5.5 组件的 生命周期

### 5.5.1 效果

需求：定义组件实现以下功能：

1.  让指定的文本做显示 / 隐藏的渐变动画
  2. 从完全可见，到彻底消失，耗时2S
  3. 点击“不活了”按钮从界面中卸载组件

![component    生命周期](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/react-study/component    生命周期.leec827w2xc.gif)

### 5.5.2. 挂载与卸载

挂载：mount。当 组件第一次被渲染到 DOM 中的时候，就为其[设置一个计时器](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval)。这在 React 中被称为“挂载（mount）”。

卸载：unmount。同时，当 DOM 中  组件被删除的时候，应该[清除计时器](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval)。这在 React 中被称为“卸载（unmount）”



### 5.5.3 理解

1. 组件从创建到死亡它会经历一些特定的阶段。
2. React组件中包含一系列勾子函数(生命周期回调函数), 会在特定的时刻调用。
3. 我们在定义组件时，会在特定的生命周期回调函数中，做特定的工作。

### 5.5.4 生命周期流程图（旧）

![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/react-study/react生命周期(旧).71zviwretq80.png)

  生命周期的三个阶段（旧）

1. 初始化阶段: 由ReactDOM.render()触发---初次渲染

   ​      1). constructor()

   ​      2). componentWillMount()

   ​      3). render()

   ​      4). componentDidMount()   = = = =>常用，一般在这个钩子中做一些初始化的事，例如开启定时器、               																				发送网络请求、订阅消息、开启监听, 发送ajax请求等

2. 更新阶段: 由组件内部this.setSate()或父组件重新render触发

   ​      1). shouldComponentUpdate()

   ​      2). componentWillUpdate()

   ​      3). render()    = = = =>必须要使用

   ​      4). componentDidUpdate()

3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发

   ​      1). componentWillUnmount()   = = = =>常用，一般在这个钩子做一些收尾的工作，例如，关闭定时																						器、取消订阅消息

### 5.5.5 生命周期流程图（新）

![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/react-study/react生命周期(新).348vorlsgm80.png)

生命周期的三个阶段（新）

   **1. ** **初始化阶段:** 由ReactDOM.render()触发---初次渲染

​				constructor()

<font color=red>				**getDerivedStateFromProps**</font>(新增，很少用，上官网了解即可)

​																			（此方法适用于[罕见的用例](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state)，即 state 的值在任何时候都取决于 props）

​				render()

​				componentDidMount()

2. **更新阶段:** 由组件内部this.setSate()或父组件重新render触发

   ​	<font color=red>**getDerivedStateFromProps**</font>

   ​	shouldComponentUpdate()

    	render()

    <font color=red>	**getSnapshotBeforeUpdate **</font>                 在更新之前获取快照，有点实用意义

     	componentDidUpdate()

   **3. ** **卸载组件:** 由ReactDOM.unmountComponentAtNode()触发

​					componentWillUnmount()



### 5.5.6 重要勾子和即将废弃的勾子

1. 重要勾子
   - render：必须要使用，初始化渲染或更新渲染调用
   -  componentDidMount：一般在这个钩子中做一些初始化的事，例如开启定时器、               													发送网络请求、订阅消息，开启监听, 发送ajax请求等
   - componentWillUnmount：做一些收尾工作, 如: 清理定时器，取消订阅等
2. 即将废弃的勾子
   -   componentWillMount
   -   componentWillReceiveProps
   - componentWillUpdate

16版本能正常使用，17版本使用会出现警告，下一个大版本需要加上UNSAFE_前缀才能使用，以后可能会被彻底废弃，不建议使用。

## 5.6 虚拟DOM与DOM Diffing算法

1. 基本原理图

![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/react-study/1.2kvd04vixaq0.png)

2. 经典面试题:

      1). react/vue中的key有什么作用？（key的内部原理是什么？）

      2). 为什么遍历列表时，key最好不要用index?

> 1. 虚拟DOM中key的作用：
>
>    1). 简单地说: key是虚拟DOM对象的标识, 在更新显示时key起着极其重要的作用。
>
>    2). 详细地·说: 当状态中的数据发生变化时，react会根据【新数据】生成【新的虚拟DOM】,  随后React进行【新虚拟DOM】与【旧虚拟DOM】的diff比较，比较规则如下：
>
> ​				a. 旧虚拟DOM中找到了与新虚拟DOM相同的key：
>
> ​							(1).若虚拟DOM中内容没变, 直接使用之前的真实DOM
>
> ​						   (2).若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM
>
> ​				 b. 旧虚拟DOM中未找到与新虚拟DOM相同的key
>
> ​						根据数据创建新的真实DOM，随后渲染到到页面 

> 2. 用index作为key可能会引发的问题：
>
> ​                1)  若对数据进行：逆序添加、逆序删除等破坏顺序操作:
>
> ​                        会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。
>
> ​                2.)如果结构中还包含输入类的DOM：
>
> ​                        会产生错误DOM更新 ==> 界面有问题。            
>
> ​                3) ==注意！==如果不存在对数据的逆序添加、逆序删除等破坏顺序操作， 仅用于渲染列表用于展   									示，使用index作为key是没有问题的。

​          

> ​      3.  开发中如何选择key?:
>
> ​                1) 最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
>
> ​                2) 如果确定只是简单的展示数据，用index也是可以的。

# 6 React应用(基于React脚手架)

## 6.1 使用create-react-app创建react应用

### 6.1.1 react脚手架

1. xxx脚手架: 用来帮助程序员快速创建一个基于xxx库的模板项目
   1）包含了所有需要的配置（语法检查、jsx编译、devServer…）

   2） 下载好了所有相关的依赖、

   3）可以直接运行一个简单效果

2. react提供了一个用于创建react项目的脚手架库: create-react-app

3. 项目的整体技术架构为: react + webpack + es6 + eslint

4. 使用脚手架开发的项目的特点: 模块化, 组件化, 工程化



### 6.1.2 创建项目并启动

**第一步**，全局安装：npm i -g create-react-app

**第二步**，切换到想创项目的目录，使用命令：create-react-app hello-react

**第三步**，进入项目文件夹：cd hello-react

**第四步**，启动项目：npm start

### 6.1.3 react脚手架项目结构

>public ---- 静态资源文件夹
>
>​           favicon.icon ------ 网站页签图标(一定要是icon格式)
>
>​          <font color=red> **index.html --------** **主页面**</font>（整个项目只有这一个html文件，SPA应用，即单页面应用）
>
>​           logo192.png ------- logo图 
>
>​           logo512.png ------- logo图
>
>​           manifest.json ----- 应用加壳的配置文件
>
>​           robots.txt -------- 爬虫协议文件
>
>src ---- 源码文件夹
>
>​           App.css -------- App组件的样式
>
>​            <font color=red>**App.js --------- App** **组件**</font>
>
>​           App.test.js ---- 用于给App做测试（几乎不用）
>
>​           index.css ------ 样式
>
>​          <font color=red>  **index.js -------** **入口文件**</font>
>
>​           logo.svg ------- logo图
>
>​           reportWebVitals.js
>
>​                 --- 页面性能分析文件(需要web-vitals库的支持)
>
>​           setupTests.js
>
>​                 ---- 组件单元测试的文件(需要jest-dom库的支持)

### 6.1.4 功能界面的组件化编码流程（通用）

1. 拆分组件: 拆分界面,抽取组件

2. 实现静态组件: 使用组件实现静态页面效果

3. 实现动态组件

   ​	3.1 动态显示初始化数据

   ​				3.1.1 数据类型

   ​				3.1.2 数据名称

   ​				3.1.3 保存在哪个组件?

   ​	3.2 交互(从绑定事件监听开始)

## 6.2 react ajax

### 6.2.1 理解

1. 注意

- React本身只关注于界面, 并不包含发送ajax请求的代码

-  前端应用需要通过ajax请求与后台进行交互(json数据)

- react应用中需要集成第三方ajax库(或自己封装)

2. 常用的ajax请求库

-   Query: 比较重, 如果需要另外引入不建议使用

-   axios: 轻量级, 建议使用

  ​		1)   封装XmlHttpRequest对象的ajax

  ​       2)    promise风格

  ​       3)   可以用在浏览器端和node服务器端

### 6.2.2 axios

1. [文档](https://github.com/axios/axios)
2. 相关API

- GET请求

  ```javascript
  axios.get('/user?ID=12345')
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  
  axios.get('/user', {
      params: {
        ID: 12345
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  
  ```

  

- POST请求

  ```js
  axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
  console.log(response);
  })
  .catch(function (error) {
  console.log(error);
  });
  
  ```

  

### 6.2.3 react脚手架配置代理总结

1. 方法1

	​	在package.json中追加如下配置

   ```json
   "proxy":"http://localhost:5000"
   ```
   
   ​	说明：
   
   ​				1）优点：配置简单，前端请求资源时可以不加任何前缀。
   
   ​				2）缺点：不能配置多个代理。
   
   ​				3）工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000					（优先匹配前端资源）
   
2. 方法2：

   ​				1)第一步：创建代理配置文件

   ​								在src下创建配置文件：src/setupProxy.js

   ​				2) 编写setupProxy.js配置具体代理规则：

   ```js
   const proxy = require('http-proxy-middleware')
      
      module.exports = function(app) {
        app.use(
          proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
            target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
            changeOrigin: true, //控制服务器接收到的请求头中host字段的值
            /*
            	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
            	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
            	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
            */
            pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
          }),
          proxy('/api2', { 
            target: 'http://localhost:5001',
            changeOrigin: true,
            pathRewrite: {'^/api2': ''}
          })
        )
      }
   ```

   ​	说明：

   1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
   2. 缺点：配置繁琐，前端请求资源时必须加前缀。

### 6.2.4 消息订阅-发布机制

1. 工具库: PubSubJS

2. 下载: npm install pubsub-js --save

3. 使用: 

   ​	1)   import PubSub from 'pubsub-js' //引入

   ​	2)   PubSub.subscribe('delete', function(data){ }); //订阅

   ​	3)   PubSub.publish('delete', data) //发布消息

4. 理解

   ​	1）先订阅，再发布（理解：有一种隔空对话的感觉）

   ​    2）适用于任意组件间通信

​              3）要在组件的componentWillUnmount中取消订阅

###  6.2.5 扩展：Fetch(关注分离思想)

1. 文档

   1） https://github.github.io/fetch/

   2） https://segmentfault.com/a/1190000003810652

2. 特点

   1）fetch: 原生函数，不再使用XmlHttpRequest对象提交ajax请求（axios和jQuery都是对XmlHttpRequset的封装）

   2）老版本浏览器可能不支持

3. 相关API

   1）GET请求

   ```js
   fetch(url).then(function(response) {
       return response.json()
     }).then(function(data) {
       console.log(data)
     }).catch(function(e) {
       console.log(e)
     });
   
   ```

   2）POST请求

   ```js
   fetch(url, {
       method: "POST",
       body: JSON.stringify(data),
     }).then(function(data) {
       console.log(data)
     }).catch(function(e) {
       console.log(e)
     })
   
   ```

   

# 7 React路由

## 7.1 相关理解

### 7.1.1 SPA 的理解

1. 单页Web应用（single page web application，SPA）。

2. 整个应用只有==**一个完整的页面**==。

3. 点击页面中的链接==**不会刷新**==页面，只会做页面的==**局部更新。**==

4. 数据都需要通过ajax请求获取, 并在前端异步展现。

### 7.1.2 路由的理解

**1.**   **什么是路由?**

- 一个路由就是一个映射关系(key:value)

- key为路径, value可能是function或component

**2.**   **路由分类**

​	1）  后端路由：

-  理解： value是function, 用来处理客户端提交的请求。

-  注册路由： router.get(path, function(req, res))

- 工作过程：当node接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据

​    2）   前端路由：

-  浏览器端路由，value是component，用于展示页面内容。

-  注册路由: <Route path="/test" component={Test}>

-  工作过程：当浏览器的path变为/test时, 当前路由组件就会变为Test组件

### 7.1 .3 react-router-dom的理解

1. react的一个插件库。

2. 专门用来实现一个SPA应用。

3. 基于react的项目基本都会用到此库。



## 7.2 react-router-dom相关API



### 7.2.1 内置组件

1. <BrowserRouter>

2. <HashRouter>

3. <Route>

4. <Redirect>

5. <Link>

6. <NavLink>

7. <Switch>

### 7.2.2. 其它

1. history对象

2. match对象

3. withRouter函数