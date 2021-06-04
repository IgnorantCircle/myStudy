import React, { Component } from 'react'
import ReactDOM from 'react-dom'

//类式组件
/*  export default class Demo extends Component {
    state = {count:0}
    myRef = React.createRef()
    increment  = () => {
        //函数式setState
        this.setState((state) => {
            
            return {count:state.count+1}

        })
        }
        
        unMount = () => {
            ReactDOM.unmountComponentAtNode(document.getElementById('root'))
        }

        show = () => {
            alert(this.myRef.current.value)
        } 
        componentDidMount(){
            this.timer = setInterval(() => {
                this.setState(state =>({count:state.count+1}))
            },1000)
        }
        componentWillUnmount(){
            clearInterval(this.timer)
        }
    render() {
        return (
            <div>
                <input type='text' ref = {this.myRef}></input>
                <h1>当前求和为：{this.state.count} </h1>
                <button onClick ={this.increment} >点我加1</button>
                <button onClick={this.unMount}>卸载组件</button>
                <button onClick={this.show}>点击提示数据</button>
            </div>
        )
    }
} 
 */

//函数式组件
function Demo(){
    //Demo多次执行
    const [count,setCount] = React.useState(0) //初始化只做一次

    const myRef = React.useRef()

    //加的回调
    const increment = () => {
        //setCount(count+1) //参数为非函数值
        setCount(count =>  count+1)
        
    }
    //卸载组件的回调
    const unMount = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    }
    const show = () => {
        alert(myRef.current.value)
    } 
    React.useEffect(() => {
        let timer= setInterval(() => { //设置定时器，相当于componentDidMount()，（componentDidUpdate()）
            setCount(count =>  count+1)
        },1000)
        return () => {
            clearInterval(timer) //componentWillUnmount() 
            
        }
  
    },[]) //不写[],检测所有人
    return (
        <div>
             <input type='text' ref = {myRef}></input>
            <h1>当前求和为：{count} </h1>
            <button onClick ={increment} >点我加1</button>
            <button onClick={unMount}>卸载组件</button>
            <button onClick={show}>点击提示数据</button>
        </div>
    )
}

export default Demo 
