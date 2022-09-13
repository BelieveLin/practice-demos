(function flexible(window, document) {
  var docEl = document.documentElement
  // 物理像素比
  var dpr = window.devicePixelRatio || 1

  // adjust body font size  设置body的字体大小
  function setBodyFontSize() {
    // 页面中有body元素
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
    else {
      // 页面中没有body元素
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10  设置html的文字元素大小
  function setRemUnit() {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize  页面尺寸大小发生变化时，重新设置rem的大小
  window.addEventListener('resize', setRemUnit)
  // pageshow是重新加载页面时触发的事件
  window.addEventListener('pageshow', function (e) {
    // 从缓存中取过来的页面，也需要重新设置rem的大小
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports  兼容不支持.5px写法
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))
