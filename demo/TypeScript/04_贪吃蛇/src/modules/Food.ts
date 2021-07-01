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