import React, { Component } from 'react'
import { Button } from 'antd';
import 'antd/dist/antd.css'
//引入connect用于连接UI组件与redux
import {connect} from 'react-redux'
//引入action
import {
    createIncrementAction,
    createDecrementAction,
    createIncrementAsyncAction
} from '../../redux/action/count'

//定义UI组件
class Count extends Component {
    //加法
    increment = () => {
        const {value} = this.selectNumber; //value是字符串，所以下文要*1，将其转换为数字
        this.props.increment(value*1)
   
    }
    //减法
    decrement = () => {
        const {value} = this.selectNumber; //value是字符串，所以下文要*1，将其转换为数字
        this.props.decrement(value*1)
        
    }
    incrementIfOdd = () => {
        const {value} = this.selectNumber; //value是字符串，所以下文要*1，将其转换为数字
        if(this.props.count % 2 !== 0){
            this.props.increment(value*1)
        }
    }
    incrementAsync = () => {
        const {value} = this.selectNumber;
		this.props.incrementAsync(value*1,500)
       
    }
    render() {
        //console.log('UI组件接收到的props是',this.props);
        return (
            <div>
                <h1>我是Count组件,下方组件总人数为{this.props.personCount}</h1>
                <h2>当前求和为：{this.props.count}</h2>&nbsp;
                <select style={{ width: 120 }} ref={c => this.selectNumber = c}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>&nbsp;
                &nbsp;&nbsp;
                <Button onClick={this.increment} type="primary">+</Button>&nbsp;&nbsp;
                <Button onClick={this.decrement} type="primary">-</Button>&nbsp;&nbsp;
                <Button onClick={this.incrementIfOdd} type="primary" danger>当前求和为奇数再加</Button>&nbsp;&nbsp;
                <Button onClick={this.incrementAsync} type="primary" danger>异步加</Button>
            </div>
        )
    }
}

//使用connect()()创建并暴露一个Count的容器组件
export default  connect(
    state => ({count:state.he,personCount:state.ren.length}),


   //mapDispatchToProps的简写
   {
       increment:createIncrementAction,
       decrement:createDecrementAction,
       incrementAsync:createIncrementAsyncAction
   }
    )
    (Count)


