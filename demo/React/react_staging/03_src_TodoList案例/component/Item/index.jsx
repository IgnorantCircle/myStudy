import React, { Component } from 'react'
import './index.css'
export default class Item extends Component {

    state = {mouse:false} //标识鼠标移入移出
    //鼠标移入移出的回调
    handleMouse = (flag) => {
        //必须要写成高阶，否则this.handleMouse(false)带小括号表示立即调用
        return () => {
              this.setState({mouse:flag})
        }
        
    }
    //勾选、取消勾选某一个todo的回调
    handleCheck = (id) => {
        return (event) => {
            this.props.updateTodo(id,event.target.checked)
        }
    }

    //删除某一个todo的回调
    handleDelete = (id) => {
        if(window.confirm('确定删除吗？') ) {
            this.props.deleteTodo(id)
        }
       
        
    }


    render() {
        const{ id,name,done} =this.props;
        const{mouse} = this.state
        return (
            <div>
                 <li style={{backgroundColor:mouse?'#ddd':'#fff'}}  onMouseLeave={this.handleMouse(false)} onMouseEnter={this.handleMouse(true)} >
                    <label>
                        <input type="checkbox" checked={done} onChange={this.handleCheck(id)}/>
                        <span>{name}</span>
                    </label>
                    <button onClick={() => this.handleDelete(id)} className="btn btn-danger" style={{display:mouse?'block':'none'}} >删除</button>
                </li>
                        
            </div>
        )
    }
}
