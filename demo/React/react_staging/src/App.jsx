import React, { Component } from 'react'
import { Button,DatePicker } from 'antd';
import {
    WechatOutlined,
    SearchOutlined
   
  } from '@ant-design/icons';
export default class App extends Component {
     onChange(date, dateString) {
        console.log(date, dateString);
      }
    render() {
        return (
            <div>
             APP...
            <button>点我</button>
            <Button type="primary">Primary Button</Button>
            <Button type="link">link</Button>
            <Button type="ghost">link</Button>
            <Button type="dashed">link</Button>
            <WechatOutlined style={{fontSize:100}} />
            <Button type="primary" icon={<SearchOutlined />}>
                Search
            </Button>
            <DatePicker onChange={this.onChange} />
            
               
        </div>
        )
    }
}
