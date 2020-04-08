'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

//const port = process.env.port || process.env.npm_config_port || 8080 // 设置端口

module.exports = {
  publicPath: '/',
  outputDir: 'dist', // 输出文件目录
  assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts)
  lintOnSave: process.env.NODE_ENV === 'development', // eslint代码检测
  productionSourceMap: false, //生产环境是否生成 sourceMap 文件
  devServer: {
    port: 8080,
    open: false,  // 打开浏览器
    overlay: { // 是否显示提醒和错误
      warnings: false, 
      errors: true
    },
    before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    resolve: {
      alias: { //别名配置
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
    // 移除 preload 插件
    config.plugins.delete('preload');
    // 压缩代码
    config.optimization.minimize(true);
    // 分割代码
    config.optimization.splitChunks({
        chunks: 'all'
    });
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()    
  }
}
