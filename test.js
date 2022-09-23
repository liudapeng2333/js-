var p = {
  a: 1,
};
var proxy = new Proxy(p, {
  ownKeys(target) {
    return Reflect.ownKeys(...arguments);
  },
});

console.log(Object.keys(proxy));


