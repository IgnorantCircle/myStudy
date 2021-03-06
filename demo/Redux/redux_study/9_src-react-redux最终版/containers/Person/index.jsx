import React, { Component } from 'react'
import {nanoid} from 'nanoid'
import {connect} from 'react-redux'
import {addPerson} from '../../redux/action/person'
//定义UI组件
class Person extends Component {
    addPerson = () => {
        const name = this.nameNode.value;
        const age = this.ageNode.value*1;
        const personObj = {id:nanoid(),name,age}
        this.props.addPerson(personObj)
        this.nameNode.value = '';
        this.ageNode.value = '';
        
    }
    render() {  
        return (
            <div>
                <h1>我是Person组件,上方组件的求和为{this.props.count}</h1>
                &nbsp;<input type='text'  placeholder="输入名字" ref={ c => this.nameNode = c} /><br/><br/>
                &nbsp;<input type='text' placeholder="输入年龄" ref = {c => this.ageNode = c}  /><br/><br/>
                &nbsp;<button onClick ={this.addPerson} >添加</button>
                <ul>
                    {
                        this.props.persons.map((p) => {
                            return <li key={p.id}>{p.name} ---- {p.age}</li>
                            
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default  connect(
    state => (
        {
            persons:state.persons,
            count:state.count
        }) ,//映射状态
        { 
            addPerson
        }//映射操作状态的方法
)(Person)