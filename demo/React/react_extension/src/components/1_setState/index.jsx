import React, { Component } from 'react'

export default class Demo extends Component {
    state = {count:0};
    increment  = () => {
    /*  对象式setState   
        //1. 获取原来的状态
        //const count = this.state.count //一般写法
        const {count} = this.state  //解构赋值
        //2.更新状态
        //this.setState({count:count+1})
        //console.log(this.state.count); //输出的还是前一个，因为是setState是同步方法，但是setState引起的React的更新的动作是异步执行
        //要想看到更新后的状态，这时候就要启动回调函数了

        this.setState({count:count+1},() => {
            console.log(this.state.count);
        })
         */

    //函数式setState
    this.setState((state,props) => {
        
        return {count:state.count+1}
    //    return {count:props.x+1}
    })
    }
    render() {
        return (
            <div>
                <h1>当前求和为：{this.state.count} </h1>
                <button onClick ={this.increment} >点我加1</button>
            </div>
        )
    }
}
