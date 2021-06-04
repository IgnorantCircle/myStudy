import React,{Component} from 'react'
//这样写就把样式存进hello这个对象里了
import hello from'./Hello.module.css'

export default class Hello extends Component{
    render() {
        return (
            <div>
                <h2 className={hello.title}>Hello React</h2>
            </div>
        );
    }
}