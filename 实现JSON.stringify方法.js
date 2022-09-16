function jsonStringify(data) {
  let type = typeof data
  // 基本数据类型
  if (type !== 'object') {
    let result = data
    // 对NaN、和Infinity返回"null"
    if (Number.isNaN(data) || data === Infinity) {
      return "null"
      // 对function，undefined和symbol返回undefined
    } else if (type === 'function' || type === 'undefined' || type === 'symbol') {
      return undefined
    } else if (type === 'string') {
      result = '"'+ data +'"'
      return String(result)
    }
  } else {
    // 如果是引用类型
    // 需要先判断是不是null
    if (data === null) {
      return "null"
    } else if (data.toJSON && typeof data.toJSON === 'function') {
      // 如果对象有自定义的toJSON方法就使用
      return jsonStringify(data.toJSON())
    } else if (data instanceof Array) {
      let result = []
      data.forEach((item, index) => {
        if (typeof item === 'undefined' || typeof item === 'function' || typeof item === 'symbol') {
          result[index] = "null"
        } else {
          result[index] = jsonStringify(item)
        }
      })
      result = "[" + result + "]"
      // 将所有的单引号转换为双引号
      return result.replace(/'/g, '"')
    } else {
      // 处理普通对象
      let result = []
      Object.keys(data).forEach(key => {
        if (key !== 'symbol') {
          // key 是symbol对象，忽略
          if (data[key] !== undefined && typeof data[key] !== 'function' || typeof data[key] !== 'symbol') {
            // 如果键值是undefined、function、symbol，则忽略
            result.push(`"${key}":` + jsonStringify(data[key]))
          }
        }
      })
      return ('{' + result + '}').replace(/'/g, '"')
    }
  }
}