// 封装防抖函数
function debounce(func, delay, immediate) {
  // timer为计时器
  let timer = null;
  return function (...args) {
    let context = this
    if (timer) {
      // 将前一个事件的定时器给销毁
      clearTimeout(timer);
    }
    let callNow = immediate && !timer;
    if (callNow) func.call(context, ...args);

    timer = setTimeout(() => {
      func.call(context, ...args);
    }, delay);
  };
}

// 封装节流函数
function throttle1(func, delay) {
  let timer = null;
  return function (...args) {
    let context = this
    // 每过一个delay进行一次func的调用
    if (timer === null) {
      timer = setTimeout(() => {
        func.call(context, ...args);
        timer = null;
      }, delay);
    }
  };
}
function throttle2(fn, data) {
  let timer = +new Date()  // 声明初始时间
  return function (...arg) { // 获取参数
    let newTimer = +new Date()  // 获取触发事件的时间
    if (newTimer - timer >= data) {  // 时间判断,是否满足条件
      fn.apply(this, arg)  // 调用需要执行的函数,修改this值,并且传入参数
      timer = +new Date() // 重置初始时间
    }
  }
}

let func = debounce(() => console.log("1"), 2000);

setInterval(func, 200)