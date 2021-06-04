import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';

 class Header extends Component {
      //  console.log("Header组件收到的props是",this.props);
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
        return (
            <div className="page-header">
                <h2>React Router Demo</h2>
                <button onClick={this.goBack}>后退</button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={this.goForward}>前进</button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={this.go}>go</button>
            </div>
        )
    }
}

//withRouter可以加工一般组件，让一般组件具备路由组件所特有的API
//withRouter 的返回值是一个新组件
export default  withRouter(Header)
