

class EventEmit {
  constructor() {
    // 存储所有订阅事件
    this.events = {}
  }
  // 订阅函数
  on (event, fn) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(fn)
  }
  // 触发相关事件的所有回调
  emit (event, ...args) {
    if (!this.events[event] || this.events[event].length === 0){
      console.warn(`this event ${event} don\`t exit`);
      return
    }
    else {
      this.events[event].forEach(fn => fn.call(this, ...args))
    }
    
  }
  // 解绑事件
  off (event, fn = null) {
    if (!this.events[event]) {
      console.warn(`this event ${event} don\`t exit`);
      return
    }
    if (this.events[event].length === 0 || fn === null) {
      delete this.events[event]
      return
    }
    
    this.events[event] = this.events[event].filter(item => item != fn)
  }
  // 订阅一次便解除绑定
  once (event, fn) {
    function one() {
      fn.apply(this, arguments)
      this.off(event)
    }
    this.on(event, one)
  }
}


const bus = new EventEmit()

function cb(value) {
  console.log('订阅click事件' + value)
}

bus.on('click', cb)

// 匿名函数删除不了
bus.on('click', () => {
  console.log('再次订阅click事件');
})



bus.emit('click', 2022)
bus.emit('move')

function one(value) {
  console.log('我只绑定一次 move 事件' + value);
}

bus.once('move', one)

bus.emit('move', 30)
console.log(bus);

bus.off('click', cb)

bus.emit('click')

