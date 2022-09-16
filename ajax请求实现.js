let xhr = new XMLHttpRequest()

xhr.onreadystatechange = function () {
  if (xhr.readyState !== 4) return
  if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
    console.log(xhr.responseText)
  } else {
    new Error(xhr.statusText)
  }
}

xhr.open('get', url, true)

xhr.send(null)

/**
 * 实现AJAX请求步骤
 * 创建XMLHttpRequest对象
 * 设置状态监听函数
 * 规定请求类型、URL以及是否异步处理请求
 * 将请求发送到服务器
 * 
 **/


