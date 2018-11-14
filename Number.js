/**
 * Number.js
 * @authors liming.liu (liming.liu@71bird.com)
 * @date    2018-11-14 11:28:19
 * @version $Id$
 */

export default {
  /**
   * [Round 四舍五入]
   * @param {[type]} num        [原始数据]
   * @param {Number} decimals [保留的小数位数]
   */
  Round (num, decimals = 0) {
    return Number(`${Math.round(`${num}e${decimals}`)}e-${decimals}`)
  }
  /**
   * [addZero 补位]
   * @param {[type]} num [原始数据]
   * @param {Number} len [数据总长度]
   * @param {String} pad [补位符号]
   */
  addZero (num, len = 2, pad = '0') {
    return (`${num}`).padStart( len, pad)
  }
}
