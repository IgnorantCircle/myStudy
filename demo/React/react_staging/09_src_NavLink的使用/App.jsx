import React, { Component } from 'react'
import {NavLink,Route} from 'react-router-dom';
import About from './pages/About';//About是路由组件
import Home from './pages/Home';//Home是路由组件
import Header from './component/header'; //Header是一般组件
export default class App extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-offset-2 col-xs-8">
                       <Header a={1}/>
                    </div>
                </div>
                {/* <BrowserRouter>  //不一定要在这里包，万一下面还有组件就很麻烦，可以直接包APP*/}
                    <div className="row">
                        <div className="col-xs-2 col-xs-offset-2">
                            <div className="list-group">
                                {/* 原生Html中，靠<a>跳转不同的页面 */}
                          {/*   <a className="list-group-item " href="./about.html">About</a>
                            <a className="list-group-item active" href="./home.html">Home</a> */}
                            {/* 在React中靠路由链接是按切换组件 */}
                                <NavLink activeClassName='demo' className="list-group-item" to="/about">About</NavLink>
                                <NavLink activeClassName='demo' className="list-group-item" to="/home">Home</NavLink>
                            </div>
                        </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                               {/* 注册路由 */}
                                    <Route path="/about" component={About}/>
                                    <Route path="/home" component={Home}/>
                            </div>
                         </div>
                    </div>
                 </div>
                {/* </BrowserRouter> */}
          </div>
        )
    }
}
