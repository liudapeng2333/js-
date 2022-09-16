function getUrl(url) {
	var reg = /([^?=&]*)=([^&]*)/g //构造一个含有目标参数的正则表达式对象
	var r = url.match(reg);  //匹配目标参数
	console.log(r);
}

let url = 'https://www.google.com/search?newwindow=1&client=firefox-b-d&sxsrf=ALiCzsb2WJu0iGavU0rl8wCtBJ5QViWZvw:1660827134142&q=%E8%8E%B7%E5%8F%96url%E5%8F%82%E6%95%B0%E6%AD%A3%E5%88%99&spell=1&sa=X&ved=2ahUKEwi0m_Sat9D5AhWfmlYBHZlDB30QBSgAegQIARA7&biw=1920&bih=927&dpr=1'

getUrl(url)

let searchUrl = '?newwindow=1&client=firefox-b-d&sxsrf=ALiCzsb2WJu0iGavU0rl8wCtBJ5QViWZvw:1660827134142&q=%E8%8E%B7%E5%8F%96url%E5%8F%82%E6%95%B0%E6%AD%A3%E5%88%99&spell=1&sa=X&ved=2ahUKEwi0m_Sat9D5AhWfmlYBHZlDB30QBSgAegQIARA7&biw=1920&bih=927&dpr=1'
function getUrlParam(par, searchUrl){
  var reg = new RegExp("(^|&)" + par + "=([^&]*)(&|$)");
  var result = searchUrl.substr(1).match(reg)[2];
	console.log(result);
  if (result && result[2]) {
    return result[2];
  }
	
  return false;
}

getUrlParam('biw', searchUrl)