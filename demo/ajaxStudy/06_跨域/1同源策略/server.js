const { response } = require('express');
const express = require('express');

const app = express();

app.get('/home',(request,response)  => {
    //响应一个页面
    response.sendFile(__dirname + '/index.html')
    
});

app.get('/data',(request,response) => {
    response.send('用户数据')
});

app.listen(8000,()=>{
    console.log('8000端口服务已启动...');
    
})

