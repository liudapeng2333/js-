Function.prototype._bind = function(context) {
  if (typeof this !== 'function') {
    throw new Error('不是函数调用')
  }
  // 将this指向self
  let self = this
  // args指向参数
  let args = [...arguments].slice(1)
  
  let fNOP = function(){}
  // 返回一个函数
  function Fn() {
    // 返回函数的参数
    let bindArgs = [...arguments].slice()
    // 将this向下文绑定
    return self.apply(this instanceof Fn ? this : context, args.concat(bindArgs))
  }

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

let bindFoo = bar._bind(foo, 'Jack');
let obj = new bindFoo(20);
// undefined
// Jack
// 20

console.log(obj.habit)
// shopping

console.log(obj.friend)
// kevin
