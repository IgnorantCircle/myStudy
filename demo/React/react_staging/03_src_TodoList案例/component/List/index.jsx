import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Item from '../Item';
import './index.css'
export default class List extends Component {
     //对接收的props进行类型以及必要性的限制<div className=""></div>
     static propTypes = {
        todos:PropTypes.array.isRequired,
        updateTodo:PropTypes.func.isRequired,
        deleteTodo:PropTypes.func.isRequired,
    }

    render() {
        const{todos,updateTodo,deleteTodo} = this.props
        return (           
                <ul className="todo-main">
                {
                    todos.map( todo =>{
                        return <Item key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
                    })
                }   
                 </ul>          
        )
    }
}
