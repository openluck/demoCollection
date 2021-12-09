//  引入模块
let fs = require('fs')
let zlib = require('zlib')

//  压缩 compress.txt 文件为 compress.txt.gz
fs.createReadStream('compress.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('compress.txt.gz'))

console.log('文件压缩完成。')