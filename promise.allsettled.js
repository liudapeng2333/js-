Promise._allSettled = function (promises) {
    return new Promise((resolve, reject) => {
      promises = Array.isArray(promises) ? promises : []
      let len = promises.length
      const argslen = len
      // 如果传入的是一个空数组，那么就直接返回一个resolved的空数组promise对象
      if (len === 0) return resolve([])
      // 将传入的参数转化为数组，赋给args变量
      let args = Array.prototype.slice.call(promises)
      // 计算当前是否所有的 promise 执行完成，执行完毕则resolve
      const compute = () => {
        if(--len === 0) { 
          resolve(args)
        }
      }
      function resolvePromise(index, value) {
        // 判断传入的是否是 promise 类型
        if(value instanceof Promise) { 
          const then = value.then
          then.call(value, function(val) {
            args[index] = { status: 'fulfilled', value: val}
            compute()
          }, function(e) {
            args[index] = { status: 'rejected', reason: e }
            compute()
          })
        } else {
          args[index] = { status: 'fulfilled', value: value}
          compute()
        }
      }

      for(let i = 0; i < argslen; i++){
        resolvePromise(i, args[i])
      }
    })
  }
Promise.__allSettled = function(promises) {
  let args = Array.prototype.slice.call(promises, 0)
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises) || promises.length === 0) {
      resolve([])
    }
    let len = promises.length
    function compute() {
      if (--len === 0) {
        resolve(args)
      }
    }
    function resolvePromise (idx, val) {
      // 在Promise内部调用在args的状态全部改变之后，在调用resolve
      if (val instanceof Promise) {
        const then = val.then
        then.call(val, function(val) {
          args[idx] = {status: 'fulfilled', value: val}
          compute()
        }, function(e) {
          args[idx] = {status: 'rejected', value: e}
          compute()
        })
      } else {
        args[idx] = {status: 'fulfilled', value: val}
        compute()
      }
    }
    for (let i = 0; i < args.length; i++) {
      resolvePromise(i, args[i])
    }
  })
}


const p1 = Promise.resolve(1)
const p2 = Promise.resolve(2)
const p3 = new Promise((resolve, reject) => {
  setTimeout(reject, 3000, 'three');
});

Promise.__allSettled([p1, p2, p3, 4])
.then(values => {
    console.log('resolve: ', values)
}).catch(err => {
    console.log('reject: ', err)
})  
