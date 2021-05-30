//1. 引入express
const { json, request, response } = require('express');
const express = require('express');

//2. 创建应用对象
const app = express();

//3.创建路由规则
//request 是对请求报文的封装
//respond 是对响应报文的封装
app.get('/server',(request,response) =>{
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');

    //设置响应体
    response.send("Hello,AJAX GET")
   
});

app.get('/json-server',(request,response) =>{
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    //响应数据
    const data = {
        name:'test',
        
    }
    //对对象进行字符串的转换
    let str = JSON.stringify(data)
    //设置响应体,send只能接受字符串或者buffer
   // response.send("Hello,AJAX GET json")
    response.send(data)
   
});

app.post('/server',(request,response) =>{
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    //设置响应体
    response.send("Hello,AJAX POST")

}); 
/*
    //all 可以接受任何类型的请求
    app.all('/server',(request,response) =>{
        //设置响应头  设置允许跨域
        response.setHeader('Access-Control-Allow-Origin','*');
        //响应头,设置允许设置名字
        response.setHeader('Access-Control-Allow-Headers','*')
        //设置响应体
        response.send("Hello,AJAX POST")
    
    }); 
    */

//针对IE缓存的规则   
app.get('/IE-server',(request,response) =>{
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    //设置响应体
    response.send(' Hello,IE');
   
});


//针对延时响应  
app.get('/delay',(request,response) =>{
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    setTimeout(() => {
         //设置响应体
    response.send('延时响应');
    }, 3000);
   
   
});

//jQuery服务
app.all('/jQuery-server',(request,response) =>{
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    //响应头,设置允许设置头信息
    response.setHeader('Access-Control-Allow-Headers','*')
    const data = {
        name:'test',  
    }
    response.send(JSON.stringify(data));
})
   
  //axios-server服务
app.all('/axios-server',(request,response) =>{
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    //响应头,设置允许设置头信息
    response.setHeader('Access-Control-Allow-Headers','*')
    const data = {
        name:'test',  
    }
    response.send(JSON.stringify(data));
}) 

//fetch 服务
app.all('/fetch-server', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    // response.send('Hello jQuery AJAX');
    const data = {name:'test'};
    response.send(JSON.stringify(data));
});

//jsonp 服务
app.all('/jsonp-server',(require,response) => {
    //要返回一个js代码
    //response.send('console.log("hello jsonp")');
    const data = {
        name:'test'
    };

    //将数据转换为字符串
    let str = JSON.stringify(data);

    //返回结果 ，写end 不会加特殊响应头,写send也可以
    response.end(`handle(${str})`);
})

//check-username , 检测用户名是否存在
app.all('/check-username',(request,response) => {
    const data = {
        exist : 1.,
        msg: '用户名已存在'
    };
    //将数据转换为字符串
    let str = JSON.stringify(data);
    //返回结果 回调函数
    response.end(`handle(${str})`);
})

//jquery-jsonp-server
app.all('/jquery-jsonp-server',(request, response) => {
    const data = {
        name: '天启集团',
        city:['北京','上海','广州']
    };

    let str = JSON.stringify(data);

    //接受callback参数
    let cb = request.query.callback;

    //返回结果
    response.end(`${cb}(${str})`)
})

//cors-server
app.all('/cors-server',(request,response)=>{
    //设置响应头
    response.setHeader('Access-Control-Allow-Origin',"*");
    response.setHeader('Access-Control-Allow-Header',"*");
    response.setHeader("Access-Control-Allow-Method","*");
    response.send('Hello CORS');
})
//4.监听端口启动服务
app.listen(8000,() => {
    console.log("服务已经启动，8000端口监听中...");
    
})