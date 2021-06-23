// import Promise from 'promise.js';
const Promise = require('./promise.js')

console.log('Promise:', Promise);

var myP = new Promise(function(resolve, reject){
    console.log('执行')
    // setTimeout(function(){
    //     reject(3)
    // }, 1000)
    reject(3)
});

myP.then(function(res){
    console.log(res)
},function(err){
    console.log(err)
});