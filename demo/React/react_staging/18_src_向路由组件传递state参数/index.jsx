//引入react核心库
import React from 'react'
//引入ReactDOM
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
//引入App组件
import App from './App.jsx'
//渲染App组件到页面

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root'));

