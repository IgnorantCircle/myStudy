import React, { Component } from 'react'
import Header from './component/Header';
import List from './component/List';
import './App.css';
import Footer from './component/Footer';

export default class App extends Component {
    //状态在哪里，操作状态的方法就是哪里
    //初始化状态
    state = {todos:[
        {id:'001',name:'吃饭',done:true},
        {id:'002',name:'睡觉',done:true},
        {id:'003',name:'写代码',done:false},
        {id:'004',name:'看电影',done:false},
    ]}

    //addTodo用于添加一个todo，接收的参数是todo对象
    addTodo = (todoObj) => {
        //获取原todos
        const {todos} =this.state;
        //追加一个todo
        const newTodos = [todoObj,...todos]
        //更新状态
        this.setState({todos:newTodos})
        
    }

    //updateTodo用于更新一个todo对象
    updateTodo = (id,done) => {
        //获取状态中的todos
        const {todos}=this.state;
        //匹配处理数据
        const newTodos = todos.map((todoObj) => {
            //匹配上，那就修改done的值
            if(todoObj.id===id) return {...todoObj,done}
            //没匹配上，原理是什么就是什么，不更改
            else return todoObj
            
        })

        //更新状态
        this.setState({todos:newTodos})

    }

    //deleteTodo用于删除一个todo对象
    deleteTodo = (id) => {
        //获取原来的todos
        const {todos} =this.state;
        //删除指定id的todo对象
        const newTodos = todos.filter((todoObj) => {
            return todoObj.id !==id
            
        })
        //更新状态
        this.setState({todos:newTodos})
    }

    //checkAllTodo用于全选
    checkAllTodo = (done) => {
        //获取原来的todos
        const {todos} = this.state
        //加工数据
        const newTodos = todos.map((todoObj) => {
            return{...todoObj,done}
        })
        
        //更新状态
        this.setState({todos:newTodos})
    }

    //清除所哟已经完成的任务
    clearAllDone = () => {
       //获取原来的todos
       const {todos} = this.state;
       //过滤数据
        const newTodos = todos.filter((todoObj) => {
           return todoObj.done===false
       }) 
       //更新状态
       this.setState({todos:newTodos})
    }
    render() {
        const {todos} = this.state ;    
        return (     
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header addTodo = {this.addTodo}/>
                    <List todos={todos}  updateTodo = {this.updateTodo} deleteTodo={this.deleteTodo}/>
                    <Footer todos={todos} checkAllTodo={this.checkAllTodo} clearAllDone={this.clearAllDone}/>
                </div> 
            </div>
        )
    }
}
