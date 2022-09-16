
// JSON实现

let obj1 = {
  a: 1,
  b: {
      c: 2
  },
  abc() {
    console.log('我是王者')
  }
}


let obj2 = JSON.parse(JSON.stringify(obj1))


obj2.b.c = '3'
console.log(obj1.b.c) // 2

// 但是JSON存在弊端
// 1、会忽略undefined
// 2、会忽略symbol
// 3、不能序列化函数
// 4、不能解决循环引用的对象

// 递归 遍历对象、数组，直到里边都是基本数据结构，然后再复制
function deepClone(obj) {
  let target = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if(typeof obj[key] === 'object') {
        target[key] = deepClone(obj[key])
      } else {
        target[key] = obj[key]
      }
    }
  }
  return target
}


let obj3 = deepClone(obj1)

obj3.b.c = 1

console.log(obj2);
console.log(obj3);



