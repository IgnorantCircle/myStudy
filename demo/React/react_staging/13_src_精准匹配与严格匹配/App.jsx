import React, { Component } from 'react'
import {Route,Switch} from 'react-router-dom';
import About from './pages/About';//About是路由组件
import Home from './pages/Home';//Home是路由组件
import Header from './component/header'; //Header是一般组件
import MyNavLink from './component/MyNavLink';
export default class App extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-offset-2 col-xs-8">
                       <Header a={1}/>
                    </div>
                </div>
                    <div className="row">
                        <div className="col-xs-2 col-xs-offset-2">
                            <div className="list-group">
                                <MyNavLink to="/study/about">About</MyNavLink>
                                <MyNavLink to="/study/home/a/b" >Home</MyNavLink>
                            </div>
                        </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                               {/* 注册路由 */}
                               <Switch> 
                                    <Route  path="/study/about" component={About}/>
                                    {/* <Route exact={true} path="/study/home" component={Home}/>  //开启严格匹配 */}
                                    <Route  path="/study/home" component={Home}/>
                                    
                               </Switch>
                            </div>
                         </div>
                    </div>
                 </div>
          </div>
        )
    }
}
