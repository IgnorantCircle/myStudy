import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'
export default class List extends Component {
    state = {
        users:[],//初始化状态，初始值为数组
        isFirst:true,//是否为第一次打开页面
        isLoading:false,//标识是否处于加载中
        err:'',//存储请求相关的错误信息
    } 

    componentDidMount(){
        this.token=PubSub.subscribe('test',(msg,stateObj)=>{
           this.setState(stateObj)           
        })
    }

    componentWillUnmount(){
        PubSub.unsubscribe(this.token);
        
    }
    render() {
        const {users, isFirst,isLoading,err} = this.state;
            return (
                <div className="row">  
                    {
                        //不能写if语句，但可以写三元表达式
                        isFirst ? <h2 style={{textAlign:'center'}}>欢迎使用，输入关键字，随后点击搜索</h2>:
                        isLoading? <h2 style={{textAlign:'center'}}>Loading...</h2>:
                        err? <h2 style={{color:'red'}}>{err}</h2>:
                        users.map((userObj)=>{
                            return(
                                <div key={userObj.id}className="card">
                                <a href={userObj.html_url} target="_blank" rel="noreferrer">
                                <img alt="head_portrait" src={userObj.avatar_url} style={{width: 100}}/>
                                </a>
                                <p className="card-text">{userObj.login}</p>
                            </div>
    
                            )
                        })
                    }
                    </div>
            )
        } 
      
    }

