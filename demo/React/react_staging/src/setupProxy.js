const proxy = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        proxy('/api-1',{//遇见/api-1前缀的请求，就会触发该代理配置
            target:"http://localhost:5000", //请求转发给谁
            // changeOrigin:true, //控制服务器收到的请求头中Host字段的值
            pathRewrite:{'^/api-1':''} //重写请求路径，必须写
        }),
        proxy('/api-2',{
            target:"http://localhost:9001",
            changeOrigin:true,
            pathRewrite:{'^/api-2':''}
        })
    )
}