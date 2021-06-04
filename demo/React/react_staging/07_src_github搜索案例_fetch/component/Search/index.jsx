import React, { Component } from 'react'
// import axios from 'axios'
import PubSub from 'pubsub-js'
export default class Seacher extends Component { 
    search = async() => {      
         const {keyWordElement:{value:keyWord}}=this; //解构赋值的连续写法
         //发送请求前通知Lit更新状态
         PubSub.publish ('test',{isFirst:false,isLoading:true})

         //#region 
        /* //发送网络请求——axios实现
        axios.get(`http://localhost:3000/api-1/search/users?q=${keyWord}`).then(
            response =>{
                //请求成功后通知list更新状态
                PubSub.publish ('test',{isLoading:false,users:response.data.items})
            }, 
            //请求失败后通知list更新状态
            error =>{
                 PubSub.publish ('test',{isLoading:false,err:error.message})//不要直接存错误对象error
                }
        )  */
        //#endregion
         
        /* //发送网络请求————使用fetch(关注分离思想)[未优化]
        fetch(`/api-1/search/users?q=${keyWord}`).then(
            response =>{console.log('联系服务器成功了');//联系成功了也不一定能得到数据
            return response.json()
        },
        error =>{
            console.log('联系服务器失败了',error);
            return new Promise(() => { }) //返回一个初始化状态的Promise实例，终止Promise

        }
        ).then(
            response =>{console.log('获取成功了',response);},
            error =>{console.log('获取数据失败了',error);}
        ) */

   /*       //发送网络请求————使用fetch(关注分离思想)[优化，统一错误处理]
        fetch(`/api-1/search/users?q=${keyWord}`).then(
            response =>{console.log('联系服务器成功了');//联系成功了也不一定能得到数据
            return response.json()
        },
        ).then(
            response =>{console.log('获取成功了',response);},
        ).catch(
            (error) => { console.log('请求出错',error);console.log('请求出错',error)
             
                
            }
        )
 */
        //发送网络请求————使用fetch(关注分离思想)[再优化，await]
        try {
            const response = await fetch(`/api-1/search/users?q=${keyWord}`)
        const data = await response.json();
        PubSub.publish ('test',{isLoading:false,users:data.items})
            
        } catch (error) {
            console.log('请求出错',error);
            PubSub.publish ('test',{isLoading:false,err:error.message})//不要直接存错误对象error
            
        }
        

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
