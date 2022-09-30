// 图片不存在或者图片报错事件
export const imageError = {
  inserted(dom, binding) {
    dom.onerror = function() {
      dom.src = binding.value
    }
    if (!dom.src) {
      dom.src = binding.value
    }
  },
  update(dom, binding) {
    dom.onerror = function() {
      dom.style.src = binding.value
    }
  }
}
