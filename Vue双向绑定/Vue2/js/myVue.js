class MyVue {
  constructor(options) {
    let self = this
    this.vm = this
    this.data = options.data;
    Object.keys(this.data).forEach(key => {
      return self.proxyKeys(key)
    })
    observe(this.data);
    new Compile(options.el, this.vm)
    return this;
  }
  proxyKeys(key) {
    let self = this
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get: function() {
        return self.data[key]
      },
      set: function(newVal) {
        self.data[key] = newVal
      }
    })
  }
}
