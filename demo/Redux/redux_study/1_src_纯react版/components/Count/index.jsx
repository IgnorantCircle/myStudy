import React, { Component } from 'react'
import { Button,Select } from 'antd';
import 'antd/dist/antd.css'
export default class Count extends Component {
    state = {count:0 }
    //加法
    increment = () => {
        const {value} = this.selectNumber; //value是字符串，所以下文要*1，将其转换为数字
        const {count} = this.state;
        this.setState({count:count+value*1});
    }
    //减法
    decrement = () => {
        const {value} = this.selectNumber; //value是字符串，所以下文要*1，将其转换为数字
        const {count} = this.state;
        this.setState({count:count-value*1});
        
    }
    incrementIfOdd = () => {
        const {value} = this.selectNumber; //value是字符串，所以下文要*1，将其转换为数字
        const {count} = this.state;
        if (count % 2 !==0) {
            this.setState({count:count+value*1});  
        }
       
    }
    incrementAsync = () => {
        const {value} = this.selectNumber
		const {count} = this.state
		setTimeout(()=>{
			this.setState({count:count+value*1})
		},500)
    }
    render() {
        const { Option } = Select;

        
        return (
            <div>
                <h1>当前求和为：{this.state.count}</h1>&nbsp;
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
