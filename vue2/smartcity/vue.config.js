const path = require('path')
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}
module.exports = {
  publicPath: './',
  // 关闭eslint
  devServer: {
  },
  // 关闭eslint
  //   lintOnSave: true,

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: config => {
    config.module.rules.delete('svg') // 重点:删除默认配置中处理svg,
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icon')) // 处理svg目录
      .add(resolve('src'))
      .add(resolve('test'))
      .add(resolve('node_modules/webpack-dev-server/client'))
      .add(resolve('node_modules'))
      .end()
      .use('svg-sprite-loader', 'babel')
      .loader('svg-sprite-loader', 'babel-loader')
      .options({
        symbolId: 'icon-[name]',
        presets: [
          ['@babel/preset-env', {
            modules: false
          }]
        ]
      })
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
  }
}