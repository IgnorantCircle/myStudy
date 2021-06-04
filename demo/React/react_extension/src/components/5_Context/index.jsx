import React, { Component } from 'react'
import  './index.css'

//创建Context对象
const UsernameContext = React.createContext();
export default class A extends Component {
    state = {username:'tom'}
    
    render() {
        const {username}  = this.state
        return (
            <div className ="parent">
                <h3>我是A组件</h3>
				<h4>我的用户名是:{username}</h4>
                <UsernameContext.Provider value = {username}>
                    <B />
                </UsernameContext.Provider>
                
            </div>
        )
    }
}

class B extends Component {
    render() {
        return (
            <div className="child">
               <h3>我是B组件</h3>
				{/* <h4>我从A组件接收到的用户名是:{this.props.username}</h4> */}
                {/* <C username={this.props.username}/> */}
                <C/>
            </div>
        )
    }
}


/* class C extends Component {
    static contextType = UsernameContext; //声明要拿到context
    render() {
       
        console.log(this);
        
        return (
           
            <div className="grand">
                <h3>我是C组件</h3>
				<h4>我从A组件接收到的用户名是:{this.context}</h4>
            </div>
        )
    }
} */

function C(){
   return (
           
        <div className="grand">
            <h3>我是C组件</h3>
            <h4>我从A组件接收到的用户名是:
            <UsernameContext.Consumer>
                  {
                      value => `${value},年龄是${value}`
                  }  
             </UsernameContext.Consumer>  
             </h4>      
        </div>
    )
}