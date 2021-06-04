import React, { Component } from 'react'
import Searcher from './component/Search/index'
import List from './component/List/index';
export default class App extends Component {
 
  
    render() {
        return (
            <div className="container">
             <Searcher/>
             <List/>
          </div>
        )
    }
}
