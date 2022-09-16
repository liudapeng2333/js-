
function ajax(method, url, data) {
  let xhr = new XMLHttpRequest()
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        resolve(xhr.responseText)
      } else {
        reject(xhr.status)
      }
    }
    xhr.open('get', url)
    xhr.send(data)
  })
}

