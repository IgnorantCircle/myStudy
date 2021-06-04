import React, { Component } from 'react'
import { Button } from 'antd';
import 'antd/dist/antd.css'
//引入store，用于获取状态
import store from '../../redux/store'
//引入actionCreator 专门用于创建action对象
import {createIncrementAction,createDecrementAction} from '../../redux/count_action'
export default class Count extends Component {

    /*   这里可以在index.js入口文件写
    componentDidMount(){
        //检测redux中状态的变化，只要变化，就调用render，从而更新状态
        store.subscribe(() => {
            this.setState({}) //更新状态，但不改变任何内容，从而起到调用render的作用
            
        })
    } */
    //加法
    increment = () => {
        const {value} = this.selectNumber; //value是字符串，所以下文要*1，将其转换为数字
       //通知redux加value
         store.dispatch(createIncrementAction(value*1))
      
       
    }
    //减法
    decrement = () => {
        const {value} = this.selectNumber; //value是字符串，所以下文要*1，将其转换为数字
        store.dispatch(createDecrementAction(value*1))
        
    }
    incrementIfOdd = () => {
        const {value} = this.selectNumber; //value是字符串，所以下文要*1，将其转换为数字
        const count = store.getState();
        if (count % 2 !==0) {
            store.dispatch(createIncrementAction(value*1))
        }
       
    }
    incrementAsync = () => {
        const {value} = this.selectNumber;
		setTimeout(()=>{
			store.dispatch(createIncrementAction(value*1))
		},500)
    }
    render() {
        return (
            <div>
                <h1>当前求和为：{store.getState()}</h1>&nbsp;
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
