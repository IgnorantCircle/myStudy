//
const fs = require('fs');
/* 
  

    fs.readFile('./resource/content.txt',(err,data)=>{
        //如果错误则抛出错误
        if(err) throw err;
        //否则输出文件内容
        console.log(data.toString());
        
    });
 */

//Promise形式
let p = new Promise((resolve,reject) => {
    fs.readFile('./resource/content.txt',(err,data)=>{
        //如果错误则抛出错误
        if(err) reject(err);
       //如果成功
        resolve(data);
        
    });
})

    //调用then方法
    p.then(value=>{console.log(value.toString());
    },reason =>{console.log(reason);
    }
        
    )
    

