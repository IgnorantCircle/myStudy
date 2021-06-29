import React, { Component } from 'react'
import Searcher from './component/Search/index'
import List from './component/List/index';
export default class App extends Component {
    state = {
        users:[],//初始化状态，初始值为数组
        isFirst:true,//是否为第一次打开页面
        isLoading:false,//标识是否处于加载中
        err:'',//存储请求相关的错误信息
    } 
    //更新App的state
   updateAppState = (stateObj)=> {
        this.setState(stateObj);
    }
  
    render() {
        return (
            <div className="container">
             <Searcher updateAppState={this.updateAppState}/>
             <List {...this.state}/>
          </div>
        )
    }
}
