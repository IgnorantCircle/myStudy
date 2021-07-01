//引入一个包
const path = require('path')
//引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
//引入clean插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

//配置信息
module.exports= {
    //指定入口文件
    entry:"./src/index.ts",
    output:{
        //指定打包文件的目录
        path:path.resolve(__dirname,'dist'),
        //打包后文件名
        filename:"bundle.js",
        //告诉webpack不要用箭头和const，以便兼容IE
        environment:{
            arrowFunction:false,
            const:false
        }
    },
    //指定webpack打包时要使用的模块
    module:{
        //指定要加载的规则
        rules:[
            {
                //test指定的是规则生效的文件
                test:/\.ts$/,
                //要使用的loader
                use:[
                    //配置babel
                    {
                       //指定加载器
                       loader:"babel-loader",
                       //设置babel
                       options:{
                           //设置预定义环境
                           presets:[
                               [
                                   //指定环境的插件
                                   "@babel/preset-env",
                                   //配置信息
                                   {
                                       //要兼容的目标浏览器
                                       targets:{
                                           "chrome":"58",
                                           "ie":"11"
                                       },
                                       //指定corejs的版本
                                       "corejs":"3",
                                       //使用corejs的方法：按需加载
                                       "useBuiltIns":"usage"

                                   }
                               ]
                           ]
                       }
                      
                    },
                    'ts-loader'
                ],
            //要排除的文件
            exclude:/node-modules/
            },
            //设置less文件的处理
            {
                test:/\.less$/,
                use:[
                    "style-loader","css-loader",
                    //引入postcss
                    {
                        loader:"postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers:'last 2 version'
                                        }
                                    ]
                                ]
                            }
                        }

                    },
                    "less-loader"
                ]
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template:"./src/index.html"
        })
    ],
    //用来设置引用模块
    resolve:{
        extensions:['.ts','.js']
    },
    mode:'development',//开发模式
};