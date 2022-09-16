function solve (str) {
  // 将空白字符替换为空
  str = str.replace(/\s/g, '')
  if ("" === str) {
    console.log(1);
    return false
  }
  // 以运算符开头，返回FALSE
  if (/^[\+\-\*\/]/.test(str)) {
    console.log(2);
    return false
  }
  // 以运算符结尾
  if (/[\+\-\*\/]$/.test(str)) {
    console.log(3);
    return false
  }
  // （后面是运算符
  if (/\([\+\-\*\/]/.test(str)) {
    console.log(4);
    return false
  }
  // )前面是运算符
  if (/[\+\-\*\/]\)/.test(str)) {
    console.log(5);
    return false
  }
  // (前面不是运算符
  if (/[^\+\-\*\/]\(/.test(str)) {
    console.log(6);
    return false
  }
  // )后面不是运算符
  if (/\)[^\+\-\*\/]/.test(str)) {
    console.log(7);
    return false
  }
  // 多个运算符连续
  if (/[\+\-\*\/]{2,}/.test(str)) {
    console.log(8);
    return false
  }
  // 空括号
  if (/\(\)/.test(str)) {
    console.log(9);
    return false
  }

  // 括号不匹配
  let stack = []
  for (let i = 0; i < str.length; i++) {
    let char = str.charAt(i)
    if (char === '(') {
      stack.push(i)
    } else if (char === ')') {
      if (stack.length) {
        stack.pop()
      } else {
        console.log(10);
        return false
      }
    }
  }
  if (stack.length) {
    console.log(11);
    return false
  }

  return true
}



let str = '1+2+3(4)'

console.log(solve(str))
