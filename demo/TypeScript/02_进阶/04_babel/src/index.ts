import {hi} from './m1';

function sum (a:number,b:number):number{
    return a+b;
}
console.log(sum(123,456));
console.log("hello");

console.log(hi);

//ie11不支持Promise语法，所以在打包过程中corejs会自动转换promise
console.log(Promise);



