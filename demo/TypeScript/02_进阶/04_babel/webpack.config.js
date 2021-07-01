//引入一个包
const path = require("path");
//引入html 插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
//引入clean插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

//webpack中的所有配置信息都要写在module.exports中
module.exports = {
    //指定入口文件
    entry:"./src/index.ts",

    //指定打包文件所在目录
    output:{
        //指定打包文件所在的目录
        path:path.resolve(__dirname,'dist'),
        //打包后的文件名
        filename:'bundle.js',

        //告诉webpack不使用箭头函数
        environment:{
            arrowFunction:false
        }
         
    },
    //指定webpack打包时要使用的模块
    module:{
        //指定要加载的规则
        rules:[
            {
                //test指定规则生效的文件,写正则表达式
                test:/\.ts$/,
                // 使用哪些 loader 进行处
                use:[
                    //配置babel
                    {
                        //指定加载器
                        loader:"babel-loader",
                        //设置babel
                        options:{
                            //设置预定义的环境
                            presets:[
                                [
                                    //指定环境的插件
                                    "@babel/preset-env",
                                    //配置信息
                                    {
                                        //要兼容的标准
                                       targets: {
                                           //兼容的版本
                                           "chrome":"58",
                                           "ie":"11" //ie11不支持Promise语法，所以在打包过程中corejs会自动转换promise
                                       },
                                       //指定corejs的版本
                                       "corejs":"3",
                                       //指定corejs的方式，"usage"表示按需加载
                                       "useBuiltIns":"usage"
                                    }
                                ]
                            ]
                        },  
                    },
                    'ts-loader'
                   
                ],
                //要排除的文件
                exclude:/node-modules/
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title:'只是一个自定义题目'
            template:'./src/index.html'
        })
    ],
     //用来设置引用模块
     resolve:{
        extensions:['.ts','.js']
    },
    mode:'development',//开发模式
   
}