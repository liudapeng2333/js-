
Promise._race = function (iterators) {
  return new Promise((resolve, reject) => {
    for(const iter of iterators) {
      Promise.resolve(iter).then((res) => {
        resolve(res)
      }).catch((e) => {reject(e)})
    }
  })
}

let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {resolve('done1')}, 1000)
})

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {reject('p2 no')}, 500)
})

Promise._race([p1, p2]).then(data => console.log(data), error => console.log(error))




