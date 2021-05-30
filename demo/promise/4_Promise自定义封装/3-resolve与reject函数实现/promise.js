//声明构造函数
function Promise(executor){
    //添加属性
    this.PromiseState = 'pending';//默认值为pending
    this.PromiseResult = null; //默认为空
    //保存实例对象的 this 的值
    const self = this;// self _this that
    //resolve 函数
    function resolve(data){
        //不能用this，因为this指向window，而不是Promise
        //console.log(this);
        //1. 修改对象的状态 (promiseState)
        self.PromiseState = 'fulfilled';// resolved
        //2. 设置对象结果值 (promiseResult)
        self.PromiseResult = data;
    }
    //reject 函数
    function reject(data){
        //不能用this，因为this指向window，而不是Promise
        //console.log(this);
        //1. 修改对象的状态 (promiseState)
        self.PromiseState = 'rejected';// rejected
        //2. 设置对象结果值 (promiseResult)
        self.PromiseResult = data;
    }

    //同步调用『执行器函数』
    executor(resolve, reject);
}

//添加 then 方法
Promise.prototype.then = function(onResolved, onRejected){

}