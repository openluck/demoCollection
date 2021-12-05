/*
 * @Descripttion: 
 * @version: 
 * @Author: OpenLcuk
 * @Date: 2021-10-21 14:40:45
 * @LastEditors: OpenLcuk
 * @LastEditTime: 2021-10-21 14:43:49
 */
const request = require('request')
const cheerio = require('cheerio')
let url = 'https://news.hao123.com/wangzhi'

let arr = []
request(url, (err, response, body) => {
  let $ = cheerio.load(body, { decodeEntities: false })
  // let arr1 = $('.content-title').text()
  $('.mod-content .content-link a').each((index, item) => {
    var $item = $(item)
    arr.push({
      name: $item.text(),
      href: $item.attr('href')
    })
  })
  console.log('arr', arr);
})

