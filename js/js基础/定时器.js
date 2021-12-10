/*
 * @Descripttion: 
 * @version: 
 * @Author: OpenLcuk
 * @Date: 2021-12-10 10:14:48
 * @LastEditors: OpenLcuk
 * @LastEditTime: 2021-12-10 10:17:39
 */
// let period = 60 * 1000 * 60 * 2
// let startTime = new Date().getTime()
// let count = 0
// let end = new Date().getTime() + period
// let interval = 1000
// let currentInterval = interval

// function loop() {
//   count++
//   // 代码执行所消耗的时间
//   let offset = new Date().getTime() - (startTime + count * interval);
//   let diff = end - new Date().getTime()
//   let h = Math.floor(diff / (60 * 1000 * 60))
//   let hdiff = diff % (60 * 1000 * 60)
//   let m = Math.floor(hdiff / (60 * 1000))
//   let mdiff = hdiff % (60 * 1000)
//   let s = mdiff / (1000)
//   let sCeil = Math.ceil(s)
//   let sFloor = Math.floor(s)
//   // 得到下一次循环所消耗的时间
//   currentInterval = interval - offset
//   console.log('时：' + h, '分：' + m, '毫秒：' + s, '秒向上取整：' + sCeil, '代码执行时间：' + offset, '下次循环间隔' + currentInterval)

//   setTimeout(loop, currentInterval)
// }

// setTimeout(loop, currentInterval)

function setInterval(callback, interval) {
  let timer
  const now = Date.now
  let startTime = now()
  let endTime = startTime
  const loop = () => {
    timer = window.requestAnimationFrame(loop)
    endTime = now()
    if (endTime - startTime >= interval) {
      startTime = endTime = now()
      callback(timer)
    }
  }
  timer = window.requestAnimationFrame(loop)
  return timer
}

let a = 0
setInterval(timer => {
  console.log(1)
  a++
  if (a === 3) cancelAnimationFrame(timer)
}, 1000)