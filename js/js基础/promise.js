/*
 * @Descripttion: 
 * @version: 
 * @Author: OpenLcuk
 * @Date: 2021-12-10 09:52:37
 * @LastEditors: OpenLcuk
 * @LastEditTime: 2021-12-10 09:58:13
 */
// new Promise((resolve, reject) => {
//   resolve('success')
//   // 无效
//   reject('reject')
// }).then(res => {
//   console.log(res);
// })

// new Promise((resolve, reject) => {
//   console.log('new Promise')
//   // resolve('success')
// })
// console.log('finifsh')
// // new Promise -> finifsh

Promise.resolve(1)
  .then(res => {
    console.log(res) // => 1
    return 2 // 包装成 Promise.resolve(2)
  })
  .then(res => {
    console.log(res) // => 2
  })