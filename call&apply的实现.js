// call的实现
Function.prototype._call = function(context) {
  // 将函数设置为对象的属性
  // 非严格模式下
  //   指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中就是 window 对象)
  //   值为原始值(数字，字符串，布尔值)的 this 会指向该原始值的自动包装对象(用 Object() 转换）   
  context = context ? Object(context) : globalThis
  context.fn = this
  // 执行函数
  let args = [...arguments].slice(1)
  let result = context.fn(...args)
  // 删除函数
  delete context.fn
  // 函数可以是有返回值的
  return result
}
// apply的实现
Function.prototype._apply = function(context, arr) {
  // 绑定this上下文
  context = context ? Object(context) : globalThis
  context.fn = this
  // 执行函数
  let res = null
  if (!arr) {
    res = context.fn()
  } else {
    res = context.fn(...arr)
  }
  delete context.fn
  return res
}

const obj1 = {
  name: '刘坤鹏',
  age: 18,
  sayName() {
    console.log(this.name)
  }
}

const obj2 = {
  name: '溜溜溜',
  age: 17,
  sayName() {
    console.log(this.name)
  }
}

obj1.sayName._call(obj2)




