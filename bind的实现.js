Function.prototype._bind = function(context) {
  if (typeof this !== 'function') {
    throw new Error('不是函数调用')
  }
  // 将this指向self
  let self = this
  // args指向参数
  let args = [...arguments].slice(1)
  
  // 返回一个函数
  function Fn() {
    // 返回函数的参数
    let bindArgs = [...arguments].slice()
    // 将this向下文绑定
    return self.apply(this instanceof Fn ? this : context, args.concat(bindArgs))
  }
  let fNOP = function(){}
  fNOP.prototype = this.prototype
  Fn.prototype = new fNOP()
  return Fn
}


let value = 2;
let foo = {
    value: 1
};
function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}
bar.prototype.friend = 'kevin';
// 绑定函数自动适应于使用 new 操作符去构造一个由目标函数创建的新实例。当一个绑定函数是用来构建一个值的，原来提供的 this 就会被忽略。不过提供的参数列表仍然会插入到构造函数调用时的参数列表之前。
let bindFoo = bar._bind(foo, 'Jack');
let obj = new bindFoo(20);
// undefined
// Jack
// 20

console.log(obj.habit)
// shopping

console.log(obj.friend)
// kevin

function tot() {
  console.log(this.value);
}

let bindFoo2 = tot._bind(foo)
bindFoo2()