import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';

export default class MyNavLink extends Component {
    render() {
        return (
            <NavLink activeClassName='demo' className="list-group-item" {...this.props}/>// 可以用{children},但children是props的一个属性，直接写...this.props中了
        )
    }
}
