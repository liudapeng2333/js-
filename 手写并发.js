const timeout = i => new Promise(resolve => setTimeout(() => {
  resolve(i)
  console.log(i)
}, i));

asyncPool(2, [1000, 5000, 3000, 2000], timeout);

// poolLimit 并发任务数量, 
// array任务数组, 
// iteratorFn 迭代函数，对每项任务进行处理，返回Promise对象或者异步函数
async function asyncPool(poolLimit, array, iteratorFn) {
  // 存储所有异步任务
  const ret = []
  // 存储正在执行的异步任务
  const executing = []
  for (const item of array) {
    // 调用iteratorFn函数创建异步任务
    const p = Promise.resolve().then(() => iteratorFn(item))
    // 保存新的异步任务
    ret.push(p)
    // 当poolLimit值小于等于总任务个数时，进行并发控制
    if(poolLimit <= array.length) {
      // 当任务完成后，从正在执行的任务数组中移除已经完成的任务
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      // 保存正在执行的异步任务
      executing.push(e)
      if (executing.length >= poolLimit) {
        // 等待较快的任务执行完成
        await Promise.race(executing)
      }
    }
  }
  return Promise.all(ret)
}