// 引入其他的类
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel"

//游戏控制类，控制其他的所有类
export default class GameControl{
    //定义三个属性
    snake:Snake;
    food:Food;
    scorePanel:ScorePanel;

    //定义两个字符串数组，用来记录合法的按键的方向，这里包含了两种情况，chrome和IE
     /*
        chrome	IE
    *   ArrowUp  Up
        ArrowDown Down
        ArrowLeft Left
        ArrowRight Right
    * */
    private XDirectionEvents:string[] = ['ArrowLeft', 'Left', 'ArrowRight', "Right"];
    private YDirectionEvents:string[] = ['ArrowUp', 'Up', 'ArrowDown', "Down"];

    //创建一个属性来存储蛇的移动方向（也就是控制方向）
    // 初始化方向
  direction: string = 'Right';
    //创建一个属性来记录游戏是否结束
    isLive:boolean= true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10,5);
        // 创建完实例，游戏立刻开始
        this.init();
    }

    //游戏的初始化，调用后游戏开始
    init(){
        //绑定键盘按键按下的事件
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        // 调用run方法，使蛇移动
        this.run();
    }

   
    //创建一个键盘按下的相应函数
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

    //创建一个控制蛇移动的方法
    run() {
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
        switch (this.direction){
            case "ArrowUp":
            case "Up":
                //向上移动top减少
                Y -= 10;
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

    // 定义一个方法，用来检查蛇是否吃到食物
    checkEat(X: number,Y: number){
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
}