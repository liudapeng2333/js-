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
function throttle(func, delay) {
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
let func = debounce(() => console.log("1"), 2000);

setInterval(func, 200)