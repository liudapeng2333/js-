class Watcher {
  constructor(vm, exp, cb) {
    this.cb = cb
    this.vm = vm
    this.exp = exp
    // 执行this.get，在watcher初始化的时候将订阅者添加进去
    this.value = this.get()
  }

  update() {
    this.run()
  }
  run() {
    let value = this.vm.data[this.exp]
    let oldVal = this.value
    if (value !== oldVal) {
      this.value = value
      this.cb.call(this.vm, value, oldVal)
    }
  }
  get() {
    Dep.target = this // 缓存自己
    let value = this.vm.data[this.exp] // 执行监听器里面的get函数
    Dep.target = null // 释放自己
    return value
  }
}
