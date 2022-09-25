class Compile {
  constructor(el, vm) {
    this.el = document.querySelector(el);
    this.vm = vm;
    this.fragment = null;
    this.init();
  }
  init() {
    if (this.el) {
      this.fragment = this.nodeToFragment(this.el)
      this.compileElement(this.fragment)
      this.el.appendChild(this.fragment)
    } else {
      console.error('Dom元素不存在');
    }
  }
  // 将dom元素下面的子元素全部都存入fragment下
  nodeToFragment(el) {
    let fragment = document.createDocumentFragment()
    let child = el.firstChild
    while(child) {
      fragment.appendChild(child)
      child = el.firstChild
    }
    return fragment
  }
  // 编译匹配上{{}}形式的文本
  compileElement(el) {
    let childNodes = el.childNodes
    let self = this;
    [].slice.call(childNodes).forEach((node) => {
      let reg = /\{\{\s*(.*?)\s*\}\}/
      let text = node.textContent
      if (self.isTextNode(node) && reg.test(text)) {
        self.compileText(node, reg.exec(text)[1])
      }
      if (node.childNodes && node.childNodes.length) {
        self.compileElement(node)
      }
    })
  }
  compileText(node, exp) {
    let self = this
    let initText = this.vm[exp]
    this.updateText(node, initText)
    new Watcher(this.vm, exp, (val) => {
      self.updateText(node, val)
    })
  }
  updateText(node, value) {
    node.textContent = typeof value === 'undefined' ? '' : value
  }
  isTextNode(node) {
    return node.nodeType === 3
  }
}
