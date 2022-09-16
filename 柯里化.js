function curry(fn) {
  const args = [...arguments].slice(1)
  function newCurry() {
    const newArgs = [...arguments].slice()
    const allArgs = [...args, ...newArgs]
    return curry.call(this, fn, ...allArgs)
  }
  newCurry.toString = function() {
    return fn.call(this, ...args)
  }
  return newCurry
}



function add() {
  return [...arguments].reduce((cur, pre) => {
    return cur + pre
  }, 0)
}

const vAdd = curry(add)

console.log(vAdd(1,3)(2)(3) + '')
