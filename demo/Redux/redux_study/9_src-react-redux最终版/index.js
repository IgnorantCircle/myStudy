import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
ReactDOM.render(
    /**
     * 此处需要用Provide包裹App,目的是让App所有的后代容器组件都唔那个接收到store
     */
    <Provider store={store}>
        <App/>
    </Provider>,document.getElementById('root'))
