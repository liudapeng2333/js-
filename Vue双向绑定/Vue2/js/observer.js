function observe(data) {
  if (!data || typeof data !== 'object') {
    return
  }
  return new Observe(data)
}
class Observe{
  constructor(data) {
    this.data = data
    this.walk(data)
  }
  walk(data) {
    let self = this
    Object.keys(data).forEach(key => {
      self.defineReactive(data, key, data[key])
    })
  }
  defineReactive(data, key, val) {
    observe(val)
    const dep = new Dep()
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function() {
        if (Dep.target) { // 判断当前的watcher是否存在
          dep.addSub(Dep.target)
        }
        return val
      },
      set: function(newVal) {
        if (val === newVal) {
          return
        }
        val = newVal
        console.log(`将属性${key}进行监听成功`);
        dep.notify()
      }
    })
  }
}

class Dep {
  static target
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
Dep.target = null