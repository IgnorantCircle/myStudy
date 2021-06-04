import React, { Component } from 'react'
import Detail from './Detail';
import {Link,Route} from 'react-router-dom';
export default class Message extends Component {
    state = {
        messageArr:[
            {id:'01',title:'消息1'},
            {id:'02',title:'消息2'},
            {id:'03',title:'消息3'},
        ]
    }

    pushShow = (id,title) => {
        //编写一段代码，让其实现跳转到Detail组件，且为push跳转
        //push跳转+params参数
        // this.props.history.push(`/home/message/detail/${id}/${title}`)

         //push跳转+search参数
        //  this.props.history.push(`/home/message/detail/?id=${id}&title=${title}`)

        //push跳转+state参数
        this.props.history.push("/home/message/detail/",{id,title})

    }
    replaceShow = (id,title) => {
        //replace跳转+params参数
        //编写一段代码，让其实现跳转到Detail组件，且为replace跳转
        // this.props.history.replace(`/home/message/detail/${id}/${title}`)

        //replace跳转+search参数
        // this.props.history.push(`/home/message/detail/?id=${id}&title=${title}`)

         //replace跳转+state参数
        this.props.history.replace("/home/message/detail/",{id,title})
        
    }
    goBack = () => {
        this.props.history.goBack()
        
    }

    goForward = () => {
        this.props.history.goForward()
        
    }
    go = () => {
        this.props.history.go(-2)
        
    }
    render() {
        const {messageArr} =this.state
        return (
           <div>
                <ul>
                   {
                       messageArr.map((msgObj) => {
                           return(
                            <li key={msgObj.id}>
                                 {/* 向路由组件传递params参数 */}
                                {/* <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link> */}
                                
                                {/*  向路由组件传递search参数*/}
                                {/* <Link to={`/home/message/detail/?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link> */}

                                {/* 向路由组件传递state参数 */}
                                <Link  to={{pathname:'/home/message/detail',state:{id:msgObj.id,title:msgObj.title}}}>{msgObj.title}</Link>

                                &nbsp;&nbsp;&nbsp;
                                <button onClick={() => {
                                    this.pushShow(msgObj.id,msgObj.title)
                                    
                                }}>push查看</button>&nbsp;&nbsp;&nbsp;
                                <button onClick={() => {
                                    this.replaceShow(msgObj.id,msgObj.title)
                                    
                                }}>replace查看</button>
                            </li>
                      
                           )
                       })
                   }
                </ul>
                <button onClick={this.goBack}>后退</button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={this.goForward}>前进</button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={this.go}>go</button>
                <hr/>

               {/* 声明接受params参数 */}         
                {/* <Route path="/home/message/detail/:id/:title" component={Detail}></Route> */}

                {/* search无需声明接收，正常注册路由即可 */}
                {/* <Route path="/home/message/detail" component={Detail}></Route> */}

                {/* state无需声明接收，正常注册路由即可 */}
                <Route path="/home/message/detail" component={Detail}></Route>
           </div>
        )
    }
}
