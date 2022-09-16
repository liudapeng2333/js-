
let solve1 = function(arr) {
  let target = []
  for (const item of arr) {
    if (Array.isArray(item)) {
      target = target.concat(solve1(item))
    } else {
      target.push(item)
    }
  }
  return target
}

let solve2 = function(arr) {
  return arr.reduce((cur, next) => {
    return cur.concat(Array.isArray(next) ? solve2(next) : next)
  }, [])
}


const arr = [['a','b'],['c','d'],['e','f']]



// flat(depth) 为es6引入的数组扁平化方法，其中传入的参数depth表示将数组做几次扁平化操作
// newArr = arr.flat()

console.log(solve2(arr));
