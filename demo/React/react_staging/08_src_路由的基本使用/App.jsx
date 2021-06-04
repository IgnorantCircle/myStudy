import React, { Component } from 'react'
import {Link,Route} from 'react-router-dom';
import About from './component/About';
import Home from './component/Home';
export default class App extends Component {

  
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-offset-2 col-xs-8">
                        <div className="page-header"><h2>React Router Demo</h2></div>
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
                                <Link  className="list-group-item" to="/about">About</Link>
                                <Link  className="list-group-item" to="/home">Home</Link>
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
