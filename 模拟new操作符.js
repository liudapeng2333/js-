

function createObject() {
  // 获得构造函数即arguments中的第一个参数，并将其删除
  const Con = Array.prototype.shift.call(arguments)
  let res = null
  // 创建一个空对象连接到构造函数的原型
  let obj = Object.create(Con.prototype)
  // 绑定this，执行构造函数
  res = Con.apply(obj, arguments)
  // 优先返回构造函数返回的对象
  return res instanceof Object ? res : obj
}


function Parent(name, age) {
  this.name = name
  this.age  = age
}

Parent.prototype.sayName = function() {
  return this.name
}

const p1 = createObject(Parent, '刘坤鹏', 18)

console.log(p1.sayName());
console.log(p1.age);
