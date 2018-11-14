/**
 * String.js
 * @authors liming.liu (liming.liu@71bird.com)
 * @date    2018-11-14 13:36:30
 * @version $Id$
 */

export default {
  /**
   * [mixStr 字符串混入]
   * @param  {[String]} str    [原始字符串]
   * @param  {Number} len    [处理后的长度]
   * @param  {Number} mixlen [混入的*的长度]
   * @return {[type]}        [description]
   */
  mixStr (str, len = 15, mixlen = 5) {
    if (typeof str === 'string') {
      if (str.length < len) {
        return str
      } else {
        let start = str.substr(0, Math.ceil((len - mixlen) / 2))
        let end = str.substring(str.length - Math.ceil((len - mixlen) / 2), str.length)
        let mix = new Array(mixlen).fill('*').join('')
        return start + mix + end
      }
    } else {
      return ''
    }
  },
  /**
   * [isSameString 判断字符串是否相同]
   * @param  {[type]}  str1   [字符串1]
   * @param  {[type]}  str2   [字符串2]
   * @param  {Boolean} strict [是否是严格相等]
   * @return {Boolean}        [description]
   */
  isSameString (str1, str2, strict = false) {
    if (strict) {
      return str1 === str2
    } else {
      return str1.toLowerCase() === str2.toLowerCase()
    }
  }
}