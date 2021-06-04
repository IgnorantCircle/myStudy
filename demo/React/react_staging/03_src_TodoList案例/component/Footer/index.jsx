import React, { Component } from 'react'
import './index.css'
export default class Footer extends Component {
    //全选checkbox的回调
    handleCheckAll = (event) => {
        this.props.checkAllTodo(event.target.checked);
    }
    done(){
        console.log('this');
        
    }
    //清除所有已经完成任务的回调
    handleClearAllDone = () => {
        const {todos} = this.props;
        //已完成的个数
        const doneCountNumber = todos.reduce((pre,todo) =>  pre + (todo.done?1:0),0);
        if(doneCountNumber ===0 )
            alert("当前没有已完成的任务")
        else(window.confirm('是否清除所有已完成的任务'))
                this.props.clearAllDone();
    }
    render() {
        const {todos} = this.props;
        //已完成的个数
        const doneCount = todos.reduce((pre,todo) =>  pre + (todo.done?1:0),0);
        

        //已完成的总数
        const total = todos.length;
        return (
            <div>
                <div className="todo-footer">
                        <label>
                            <input type="checkbox" onChange= {this.handleCheckAll} checked={doneCount===total&&total!=0 ? true:false}/>
                        </label>
                        <span>
                            <span>已完成{doneCount}</span>/全部{total}
                        </span>
                        <button onClick={this.handleClearAllDone} className="btn btn-danger">
                            清除已完成任务
                        </button>
                    </div>
            </div>
        )
    }
}
