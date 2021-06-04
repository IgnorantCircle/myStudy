//创建“外壳”组件App
import React,{Component} from 'react'
import Hello from './components/Hello/Hello'
import Welcome from './components/Welcome/Welcome.jsx';
//创建并暴露APP组件
export default class App extends Component{
    render() {
        return (
            <div>
               <Hello/>
               <Welcome/>
            </div>
        );
    }
    
}

