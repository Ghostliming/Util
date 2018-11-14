/**
 * Array.js
 * @authors liming.liu (liming.liu@71bird.com)
 * @date    2018-11-14 11:34:58
 * @version $Id$
 */

export default {
  /**
   * [countNumber 计算一个数组中元素出现的次数]
   * @param  {[Array]} arr [数组元素]
   * @return {[Object]}     [元素出现的次数]
   */
  countNumber (arr) {
    arr.reduce((obj, name) => {
      obj[name] = obj[name] ? ++obj[name] : 1
      return obj
    }, {})
  },
  /**
   * [flatten 平铺数组]
   * @param  {[Array]} arr   [数组元素]
   * @param  {Number} depth [平铺的层数]
   * @return {[Array]}       [平铺的数据]
   */
  flatten (arr, depth = 1) {
    return depth != 1 ? arr.reduce((a, v) => a.concat(Array.isArray(v) ? this.flatten(v, depth - 1) : v), []) : arr.reduce((a, v) => a.concat(v), [])
  },
  /**
   * [deDuplicates 去除重复项目]
   * @param  {[Array]} arr [数组元素]
   * @return {[Array]}     [去除重复的元素]
   */
  deDuplicates (arr) {
    return [...new Set(arr)]
  }
}