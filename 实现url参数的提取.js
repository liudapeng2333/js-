/**
 * 实现一个函数，可以对 url 中的 query 部分做拆解，返回一个 key: value 形式的 object  
 * 
 * 例子：
 * 输入：url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled&age=22'
 * 输出：
 * {
 *  user:'anonymous', // 字符串
 *  id:[123,456],// 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
 *  city:'北京',// 中文需解码
 *  enabled: true, // 未指定值的 key 与约定为 true
 *  age: 22 // 数字
 * }
 */
let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled&age=22'
 function parseQuery(url) {
  // eat, sleep, show me the code ヽ(*^ｰ^)人(^ｰ^*)ノ
  let target = {}
  let params = url.split('?')[1].split('&')
  for (let i = 0; i < params.length; i++) {
    let key = params[i].split('=')[0]
    let value = params[i].split('=')[1]
    if (!value) {
      value = true
    }
    value = decodeURIComponent(value)
    if (!Number.isNaN(Number(value))) {
      value = Number(value)
    }
    if (!Reflect.has(target, key)) {
      target[key] = value
    } else {
      if (!Array.isArray(target[key])) {
        target[key] = [target[key]]
      }
      target[key].push(value)
    }
  }
  console.log(target)
}
parseQuery(url)

