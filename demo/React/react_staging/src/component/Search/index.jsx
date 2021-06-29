import React, { Component } from 'react'
import axios from 'axios'
export default class Seacher extends Component {
    search = () => {
         //获取用户的输入(连续解构赋值+重命名为keyWord)
         // const {value} = this.keyWordElement;//普通解构赋值
         const {keyWordElement:{value:keyWord}}=this; //解构赋值的连续写法
         //console.log(keyWord);
         //   console.log(keyWordElement); 出错，keyWordElement没有赋值

         //发送请求前通知App更新状态
         this.props.updateAppState({isFirst:false,isLoading:true})
 
        //发送网络请求
        axios.get(`http://localhost:3000/api-1/search/users?q=${keyWord}`).then(
            response =>{
                //请求成功后通知App更新状态
                this.props.updateAppState({isLoading:false,users:response.data.items})
            },
            //请求失败后通知App更新状态
            error =>{
                 this.props.updateAppState({isLoading:false,err:error.message});//不要直接存错误对象error
                }
        )
           
            
        


    }
    render() {
        return ( 
            <section className="jumbotron">
                <h3 className="jumbotron-heading">搜索GitHub用户</h3>
                <div>
                    <input ref={c =>this.keyWordElement = c }type="text" placeholder="输入关键词点击搜索"/>&nbsp;
                    <button onClick = {this.search}>搜索</button>
                   
                </div>
            </section>
        )
    }
}
