[TOC]



# 前言

这个项目是参考尚硅谷TypeScript教程写的，自己做了一些改进，目的是为了练习TypeScript的写法，学会用TS的思维去写代码。

# 1 项目界面搭建

![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/image-20210630200735453.11bcz3c2oe0g.png)

- html结构

  ```html
  <body>
      <!--创建游戏的主容器  -->
      <div id="main">
          <!-- 设置游戏的舞台 -->
          <div id="stage">
              <!-- 设置蛇 -->
              <div id="snake">
                  <!-- snake内部的div 表示蛇的各部分-->
                  <div></div>
              </div>
              <!-- 设置食物 -->
              <div id="food">
                  <!-- 设置四个小div来设置食物的样式 -->
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
              </div>
          </div>
          <!-- 设置计分盘 -->
          <div id="score-panel">
              <div> 
                  SCORE:<span id="score">0</span>
              </div>
              <div>
                  level:<span id="level">1</span>
              </div>
          </div>
      </div>
  </body
  ```

- less结构

  ```less
  //设置变量
  @bg-color:#b7d4a8;
  
  //清除默认样式
  *{
      padding: 0;
      margin: 0;
      //改变盒子模型的计算方法
      box-sizing: border-box;
  }
  body{
      font:bold 20px "Courier"
  }
  //设置主窗口的样式
  #main{
      width: 360px;
      height: 420px;
      //设置背景颜色
      background-color: @bg-color;
      //设置居中
      margin:100px auto;
      border:10px solid black;
      //设置圆角
      border-radius:20px;
      //开启弹性盒模式
      display: flex;
      //设置主轴方向，自上而下
      flex-flow: column;
      //设置主轴的对齐方向
      justify-content: space-around;
      //设置侧轴的对齐方式
      align-items: center;
      
      //游戏的舞台
      #stage{
          width:304px;
          height:304px;
          border: 2px solid black;
          //开启相对定位
          position: relative;
          //设置蛇的样式 注意这里设置的是snake里面的div的样式
          #snake{
              &>div{
              width: 10px;
              height: 10px;
              background-color: black;
              // margin-right: 2px;
              //这里为蛇的身体设置一个边框，目的是为了让蛇的每一段分开，
              //由于边框的背景颜色和舞台的背景颜色一样，所以我们看到的蛇是一段段的
              border: 1px solid @bg-color;
              //开启绝对定位,因为蛇的移动要有参照物
              position: absolute;
              }
              //蛇头是红色的，便于区分
  			 &>div:first-child{
                  background-color: red;
              }
          }
         #food{
              width: 10px;
              height: 10px;
              //background-color: rgb(167, 37, 37);
              // border: 1px solid @bg-color;
              position: absolute;
              left: 40px;
              top:100px;
              display: flex;
              //设置横轴为主轴，warp表示自动换行
              flex-flow: row wrap;
              justify-content: space-between;
              align-content: space-between;
              
              &>div{
                  width: 4px;
                  height: 4px;
                  background-color: rgb(167, 37, 37);
                  //使四个div旋转45°
                  transform: rotate(45deg);
              }
  
          }
      }
      //积分盘
      #score-panel{
      width: 300px;
      display: flex;
      //设置主轴的对齐方法
      flex-flow: row;
      justify-content: space-between;
      align-items: center;
  
      }
  }
  ```

# 2 完成Food类

首先要明确类中有哪些属性和方法

1. 因为是食物，所以要获取食物对应的元素
2. 因为食物的位置是变化的，所以需要获取食物的坐标，以及需要有改变食物位置的方法

```typescript
class Food{
    //定义一个属性表示食物对应的元素
    element:HTMLElement;
    constructor(){
        //获取页面中的food元素并赋值给element元素
        //注意可能会提示为空，这时候只需要在语句后面加一个！即可
        this.element = document.getElementById('food')!;
    }

    // 定义一个方法获取食物X轴坐标的方法
    get X(){
        return this.element.offsetLeft;
    }

    //定义一个方法获取食物Y轴坐标的方法
    get Y(){
        return this.element.offsetTop;
    }
    //修改食物的位置
    change(){
        //生成一个随机位置
        //蛇移动一次使一格，一格的大小使10，所以要求食物的坐标必须是整十
        //因为食物的宽度是10，而舞台的宽度为304，所以食物的位置最小为0，最大为290,

        //Math.random(),生成0-1之间的随机数，区间为[0,1)
        //Math.random()*29表示生成[0,29)之间的随机数
        //Math.round() 方法可把一个数字舍入为最接近的整数。
        let top = Math.round(Math.random()*29)*10
        let left = Math.round(Math.random()*29)*10
        this.element.style.left = left +'px';
        this.element.style.top = top + 'px'
      

    }
}
export default Food;
```

# 3 计分盘（ScorePanel）类

```typescript
class ScorePanel{
    //score 和level分别用来记录分数和等级
    score = 0;
    level = 1;

    //分数和等级所在的元素，在构造函数中初始化
    scoreEle:HTMLElement;
    levelEle:HTMLElement;
    
    //设置一个变量来限制等级
    maxLevel:number;
    //设置一个变量来表示多少分时升级
    upScore:number
    
    //如果没有传参就使用默认值
    constructor(maxLevel:number=10,upScore:number = 10){
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    //设置加分方式
    addScore(){
        //使分数自增,加上''可以转换成字符串
        this.scoreEle.innerHTML = ++this.score+'';
        //判断分数使多少
        if(this.score%this.upScore===0){
            this.levelUp()
        }
    }
    levelUp(){
        if(this.level < this.maxLevel){
            this.levelEle.innerHTML = ++this.level + '';
        }
    }
}
export default ScorePanel;
```

# 4 Snake类的编写

1. 首先要明确蛇头和蛇的身体，操作蛇并不是操做id为snake的这个div，而是操作id为snake这个div下的div

2. 设置属性，包括蛇头，蛇的身体和蛇的容器

   ```typescript
   //表示蛇头的元素
       head:HTMLElement;
       //蛇的身体（包括蛇头）
       //HTMLCollection:HTML 元素的集合。
       //getElementsByTagName() 方法返回的就是一个 HTMLCollection 对象。
       bodies:HTMLCollection;
       //获取蛇的容器
       element:HTMLElement;
       constructor(){
           this.element = document.getElementById('snake')!;
           //获取snake里的第一个div，同时标记获取的元素类型HTMLElement
           this.head = document.querySelector('#snake > div') as HTMLElement;
           //获取了snake下的所有div
           this.bodies = this.element.getElementsByTagName('div')
       }
   ```

3. 获取蛇的坐标（蛇头的坐标）

   ```typescript
   //获取蛇的坐标（蛇头的坐标）
       //X轴坐标
       get X(){
           return this.head.offsetLeft;
       }
       //Y轴坐标
       get Y(){
           return this.head.offsetTop
       }
   ```

4. 设置蛇头的坐标，这里需要考虑

   - 新值和旧值是否相同，如果相同，就不进行修改，直接返回
   - 设置的值是否再合法范围，如果不是合法范围，则证明蛇撞墙了，转到异常处理
   - 修改坐标时，要考虑蛇移动的方向
   - 蛇头移动了，蛇的身体也要移动，同时要检查是否撞到自己

   ```typescript
   // 设置蛇头的坐标
       set X(value){
           //如果新值和旧值相同，则直接返回不进行修改
           if(this.X === value){
               return;
           }
   
           //X值的合法范围在[0,290]之间
           if(value < 0 || value > 290){
               //进入判断，证明蛇撞墙了
               throw new Error('蛇撞墙了!');
           }
           //修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
           if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
               console.log("水平方向发生了掉头");
               //如果发生调用，让蛇反方向继续移动
               if(value > this.X){
                   // 如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
                   value = this.X - 10;
               }else{
                    // 向左走
                    value = this.X + 10;
               }
               
           }
           //移动身体
           this.moveBody();
   
           this.head.style.left = value + 'px';
           // 检查有没有撞到自己
           this.checkHeadBody();
   
       }
       set Y(value){
            // 如果新值和旧值相同，则直接返回不再修改
            if(this.Y === value){
               return;
           }
            // Y的值的合法范围0-290之间
            if(value < 0 || value > 290){
               // 进入判断说明蛇撞墙了，抛出一个异常
               throw new Error('蛇撞墙了！');
           }
           //修改y时，是在修改垂直坐标，蛇在上下移动，蛇在向上移动时，不能向下掉头，反之亦然
           if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
           if(value > this.Y){
               value = this.Y - 10;
           }else{
               value = this.Y + 10;
           }
       }
           //移动身体
           this.moveBody();
           this.head.style.top = value + 'px';
           //检查有没有撞到自己
           this.checkHeadBody();
       }
   ```

5. 增加蛇的身体

   直接向element中添加div

   ```typescript
      //insertAdjacentHTML() 方法将一个给定的元素节点插入到相对于被调用的元素的给定的一个位置
       // 'beforebegin'：元素自身的前面。
       // 'afterbegin'：插入元素内部的第一个子节点之前。
       // 'beforeend'：插入元素内部的最后一个子节点之后。
       // 'afterend'：元素自身的后面。
       addBody(){
           //向element中添加div
           this.element.insertAdjacentHTML("beforeend", "<div></div>");
       }
   ```

6. 蛇身体移动的方法

   将后边的身体设置为前边身体的位置

   ​      举例子：

   -  第4节 = 第3节的位置
   -  第3节 = 第2节的位置
   -  第2节 = 蛇头的位置

   因此需要遍历获取所有的身体，然后设置身体的位置

   ```typescript
     //添加一个蛇身体移动的方法
       moveBody(){
           /*
           *   将后边的身体设置为前边身体的位置
           *       举例子：
           *           第4节 = 第3节的位置
           *           第3节 = 第2节的位置
           *           第2节 = 蛇头的位置
           * */
          //遍历获取所有的身体
          for(let i = this.bodies.length-1;i>0;i--){
               //获取前面身体的位置
          let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
          let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
   
          //将值设置到当前的身体上
          (this.bodies[i] as HTMLElement).style.left = X + 'px';
          (this.bodies[i] as HTMLElement).style.top = Y + 'px';
   
          }
         
       }
   ```

7. 检查蛇头是否撞到身体

   获取所有的身体，检查其是否与蛇头的坐标发生重叠，如果重叠则证明蛇头撞到了身体，进入异常处理

   ```typescript
   //检查蛇头是否撞到身体的方法
       checkHeadBody(){
           //获取所有的身体，检查其是否和蛇头的坐标发生重叠
           for(let i =1 ;i<this.bodies.length;i++){
               let bd = this.bodies[i] as HTMLElement;
               if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
                   //进入判断说明蛇头撞到了身体，游戏结束
                   throw new Error('撞到自己了！')
               }
               console.log(this.X);
           }
       }
   ```

   

# 5 游戏控制器类（GameControl）

1. GameControl控制整个游戏的核心类，所以要引入之前写好的Food类，Snake类和ScorePanel类

```typescript
// 引入其他的类
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel"
```

然后定义属性以及在构造函数中声明

```
    //定义三个属性
    snake:Snake;
    food:Food;
    scorePanel:ScorePanel;
    //创建一个属性来记录游戏是否结束
    isLive:boolean= true;
    constructor(){
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10,10)
    }
```

2. 绑定按键事件

   首先创建一个属性来存储蛇的移动方向（也就是控制方向）

   ```
    // 初始化方向
     direction: string = 'Right';
   ```

   再定义两个字符串数组，用来记录合法的按键的方向，这里包含了两种情况，chrome和IE

   ```typescript
    /*
           chrome	IE
       *   ArrowUp  Up
           ArrowDown Down
           ArrowLeft Left
           ArrowRight Right
       * */
   private XDirectionEvents:string[] = ['ArrowLeft', 'Left', 'ArrowRight', "Right"];
   private YDirectionEvents:string[] = ['ArrowUp', 'Up', 'ArrowDown', "Down"];
   ```

   然后绑定键盘按键按下的事件，在初始化的时候就绑定

   ```typescript
   document.addEventListener('keydown',this.keydownHandler.bind(this))
   ```

   ```typescript
     keydownHandler(event:KeyboardEvent){
           if (this.direction === event.key) return;
           //需要检查event.key上是否合法（用户是否按下了正确的按键）
           switch(event.key){
               case 'Up':
                   case 'ArrowUp':
                   case 'Down':
                   case 'ArrowDown':
                     if (this.YDirectionEvents.includes(this.direction))  return;
                     this.direction = event.key
                     break;
                   case 'Left':
                   case 'ArrowLeft':
                   case 'Right':
                   case 'ArrowRight':
                     if (this.XDirectionEvents.includes(this.direction)) return;
                     this.direction = event.key
                     break;
           } 
           
       }
   ```

3. 创建一个控制蛇移动的方法

   ```typescript
   //创建一个控制蛇移动的方法
       run(){
            /*
           *   根据方向（this.direction）来使蛇的位置改变
           *       向上 top 减少
           *       向下 top 增加
           *       向左  left 减少
           *       向右  left 增加
           * */
           // 获取蛇现在坐标
           let X = this.snake.X;
           let Y = this.snake.Y;
   
           //根据按键方向来修改X值和Y值
           switch(this.direction){
               case "ArrowUp":
               case "Up":
                   //向上移动top减少
                   Y -=10;
                   break;
               case "ArrowDown":
               case "Down":
                   // 向下移动 top 增加
                   Y += 10;
                   break;
               case "ArrowLeft":
               case "Left":
                   // 向左移动 left 减少
                   X -= 10;
                   break;
               case "ArrowRight":
               case "Right":
                   // 向右移动 left 增加
                   X += 10;
                   break;
   
           }
   
       this.checkEat(X,Y);
   
       //修改蛇的X和Y值
       try{
           this.snake.X =X;
           this.snake.Y = Y;
       }catch(e){
           // 进入到catch，说明出现了异常，游戏结束，弹出一个提示信息
           alert(e.message+' GAME OVER!');
           // 将isLive设置为false
           this.isLive = false;
       }
        // 开启一个定时调用
        //蛇移动的事件是根据等级而定的
      this.isLive && setTimeout(this.run.bind(this), 300 -(this.scorePanel.level-1)*30);
       }
   
   ```

4. 定义一个方法，用来检查蛇是否吃到食物

   ```typescript
    checkEat(X:number,Y:number){
           //如果吃到了食物
           if(X === this.food.X && Y===this.food.Y){
               // 食物的位置要进行重置
               this.food.change()
               //分数增加
               this.scorePanel.addScore();
               // 蛇要增加一节
               this.snake.addBody()
           }
   
       }
   ```

5. 初始化游戏

   ```typescript
    //游戏的初始化，调用后游戏开始
       init(){
           //绑定键盘按键按下的事件
           document.addEventListener('keydown',this.keydownHandler.bind(this));
           // 调用run方法，使蛇移动
           this.run();
       }
   ```

   然后再构造函数中调用，这样一创建对象就进行游戏的初始化

#  项目效果

![](https://cdn.jsdelivr.net/gh/Ignorant-Cirle/images@master/blog/image.198bcjsq47mo.png)

