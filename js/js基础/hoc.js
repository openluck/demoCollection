/*
 * @Descripttion: 
 * @version: 
 * @Author: OpenLcuk
 * @Date: 2021-12-10 11:18:21
 * @LastEditors: OpenLcuk
 * @LastEditTime: 2021-12-10 13:52:18
 */
function add(a, b) {
  return a + b
}

function withLog(fn) {
  function wrapper(a, b) {
    const result = fn(a, b)
    console.log(result)
    return result
  }
  return wrapper
}
const withLogAdd = withLog(add)
withLogAdd(1, 2)
