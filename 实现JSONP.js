function jsonp(url, data = {}, callback) {
  let params = []
  for (let key in data) {
    params.push(`${key}=${data[key]}`)
  }
  let script = document.createElement('script')
  script.src = url + '?' + params.join('&')
  document.body.appendChild(script)

  return new Promise((resolve, reject) => {
    window[callback] = function(data) {
      try{
        resolve(data)
      } catch(e){
        reject(e)
      } finally {
        script.parentNode.removeChild(script)
      }
    }
  })
}

jsonp()