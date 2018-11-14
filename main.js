/**
 * main.js
 * @authors liming.liu (liming.liu@71bird.com)
 * @date    2018-11-14 13:53:21
 * @version $Id$
 */

export default {
  /**
   * [debounce 函数防抖动]
   * @param  {Function} fn    [description]
   * @param  {Number}   delay [防抖动频率]
   * @return {[type]}         [description]
   */
  debounce (fn, delay) {
    delay = delay || 200
    var timer
    return function () {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(function () {
        timer = null
        fn()
      }, delay)
    }
  },
  /**
   * [scrollToTop 滚动到距离顶部的距离]
   * @param  {Number} distance       [距离顶部距离]
   * @param  {Number} scrollDuration [滚动时间]
   * @return {[type]}                [description]
   */
  scrollToTop (distance = 0, scrollDuration = 1200) {
    var cosParameter = isNaN(distance) ? (window.scrollY / 2) : parseFloat(distance)
    var scrollCount = 0
    var oldTimestamp = performance.now()
    function step (newTimestamp) {
      scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp))
      if (scrollCount >= Math.PI) window.scrollTo(0, 0)
      if (window.scrollY === 0) return
      window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)))
      oldTimestamp = newTimestamp
      window.requestAnimationFrame(step)
    }
    window.requestAnimationFrame(step)
  },
  /**
   * [getOffset 获取节点相对于文档的偏移]
   * @param  {Document} Node   [节点]
   * @param  {Object} offset [相对位置]
   * @return {[type]}        [description]
   */
  getOffset (Node, offset) {
    if (!offset) {
      offset = {}
      offset.top = 0
      offset.left = 0
    }
    if (!Node) {
      return offset
    }
    if (Node === document.body) {
      return offset
    }
    offset.top += Node.offsetTop
    offset.left += Node.offsetLeft
    return getOffset(Node.offsetParent, offset)
  }
}