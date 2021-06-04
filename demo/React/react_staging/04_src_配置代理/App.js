//创建“外壳”组件App
import React,{Component} from 'react'
import axios from  'axios'

//创建并暴露APP组件
export default class App extends Component{
     
     
    getStudentData = () => {
        axios.get('http://localhost:3000/api-1/students').then(
            response =>{console.log('success',response.data);
            },
            error =>{console.log('failure',error);
            }        
            
        )
        
    }

    getCarData = () => {
        axios.get('http://localhost:3000/api-2/cars').then(
            response =>{console.log('success',response.data);
            },
            error =>{console.log('failure',error);
            }        
            
        )
        
    }
    render() {

        return (
            <div>
               <button onClick = {this.getStudentData}>点我获取学生数据</button>
               <button onClick = {this.getCarData}>点我获取汽车数据</button>
            </div>
        );
    }
    
}

