/*
 * @Descripttion: 
 * @version: 
 * @Author: OpenLcuk
 * @Date: 2021-12-10 10:01:00
 * @LastEditors: OpenLcuk
 * @LastEditTime: 2021-12-10 10:10:43
 */
async function test() {
   return "1"
}
console.log(test()) // -> Promise {<resolved>: "1"}

const res =  test()
console.log(res);

// let a = 0
// let b = async () => {
//   a = a + await 10
//   console.log('2', a) // -> '2' 10
// }
// b()
// a++
// console.log('1', a) // -> '1' 1