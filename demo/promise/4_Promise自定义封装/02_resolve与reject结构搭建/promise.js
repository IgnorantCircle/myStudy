function Promise(executor) {
    //resolve函数
    function resolve(data) {
        
    }

    //reject函数
    function reject(data) {
        
    }
    //同步调用执行器函数
    executor(resolve,reject);
}

//添加then方法
Promise.prototype.then = function(onResolved,onRejected){

    
}