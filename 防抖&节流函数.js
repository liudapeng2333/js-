
// 封装防抖函数
 function debounce(func, delay, immediate) {
  // timer为计时器
  let timer = null
  return function(...args) {
    if (timer) {
      // 将前一个事件的定时器给销毁
      clearTimeout(timer)
    }
    let callNow = immediate && !timer
    if (callNow) func.call(this, ...args)
    
    timer = setTimeout(() => {
      func.call(this, ...args)
    }, delay)
  }
}

// 封装节流函数
function throttle(func, delay) {
  let timer = null
  return function(...args) {
    // 每过一个delay进行一次func的调用
    if (timer === null) {
      timer = setTimeout(() => {
        func.call(this, ...args)
        timer = null
      }, delay)
    }
  }
}


