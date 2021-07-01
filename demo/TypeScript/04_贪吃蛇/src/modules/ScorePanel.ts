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