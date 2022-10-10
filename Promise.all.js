Promise._all = function (iterators) {
  return new Promise((resolve, reject) => {
    if (!iterators || iterators.length === 0) {
      resolve([]);
    } else {
      // 计数器，用于判断所有任务是否完成
      let count = 0;
      // 结果数组
      let resolveult = [];
      for (let i = 0; i < iterators.length; i++) {
        // 考虑到iterators[i]可能是普通对象，则统一包装为Promise对象
        Promise.resolve(iterators[i]).then(
          (data) => {
            // 按照顺序保存对应的结果
            resolveult[i] = data;
            // 当所有的任务都执行完成后，再统一返回结果
            if (++count === iterators.length) {
              resolve(resolveult);
            }
          },
          (err) => {
            // 任何一个Promise对象执行失败，调用reject方法
            reject(err);
            return;
          }
        );
      }
    }
  });
};

let p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("done1"), 1000);
});
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("done2"), 1000);
});
let pall = Promise._all([p1, p2]).then(
  (data) => console.log(data),
  (err) => console.log(err)
);
