const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise(executor) {
    const _this = this
    this.state = PENDING; //状态
    this.value = undefined; //成功结果
    this.reason = undefined; //失败原因
    this.onFulfilled = [];
    this.onRejected = [];

    // 只能是pending状态的时候才能更改状态
    function resolve(value) {
        if(_this.state === PENDING){
            _this.state = FULFILLED
            _this.value = value
            _this.onFulfilled.forEach(fn => fn(value))
        }
    }
    function reject(reason) {
        if(_this.state === PENDING){
            _this.state = REJECTED
            _this.reason = reason
            _this.onRejected.forEach(fn => fn(reason))
        }
    }

    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }

    Promise.prototype.then = (onFulfilled, onRejected) => {
        if(this.state === FULFILLED){
            typeof onFulfilled === 'function' && onFulfilled(this.value)
        }
        if(this.state === REJECTED){
            typeof onRejected === 'function' && onRejected(this.reason)
        }
        if(this.state === PENDING){
            typeof onFulfilled === 'function' && this.onFulfilled.push(onFulfilled)
            typeof onRejected === 'function' && this.onRejected.push(onRejected)
        }
    }
}



module.exports = Promise;
