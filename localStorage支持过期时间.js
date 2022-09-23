// 使得localStorage支持expires过期时间

var getItem = localStorage.getItem.bind(localStorage);
var setItem = localStorage.setItem.bind(localStorage);
var removeItem = localStorage.removeItem.bind(localStorage);
localStorage.getItem = function (keyName) {
  var expires = getItem(keyName + "_expires");
  if (expires && new Date() > new Date(Number(expires))) {
    removeItem(keyName);
    removeItem(keyName + "_expires");
  }
  return getItem(keyName);
};
localStorage.setItem = function (keyName, keyValue, expires) {
  if (typeof expires !== "undefined") {
    var expiresDate = new Date(expires).valueOf();
    setItem(keyName + "_expires", expiresDate);
  }
  return setItem(keyName, keyValue);
};

localStorage.setItem("key", "value", new Date() + 5000); // 10 秒钟后过期
console.log(localStorage.getItem("key"));
console.log(
  setTimeout(() => {
    console.log(localStorage.getItem("key"));
  }, 10000)
);
