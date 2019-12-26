const path = require('path')
const env = process.env.VUE_APP_ENV
const outputDir = `releases-${env}`
module.exports = {
  outputDir: outputDir,
  assetsDir: 'dist',
  css: {
    // 提取至独立CSS文件中
    extract: env === 'production',
    loaderOptions: {
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        prependData: `@import "@/style/common.scss";`
      }
    }
  },
  chainWebpack: config => {
    // 关闭文件过大时产生的警告
    config.performance.set('hints', false)

    // 压缩代码
    config.optimization.minimize(true)
    // 分割代码
    config.optimization.splitChunks({
      chunks: 'all'
    })

    // 设置别名
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('@view', path.resolve(__dirname, 'src/views'))
      .set('@img', path.resolve(__dirname, 'src/assets'))
      .set('@utils', path.resolve(__dirname, 'src/utils'))
      .set('@comp', path.resolve(__dirname, 'src/components'))
      .set('@request', path.resolve(__dirname, 'src/request'))
  },
  // 第三方插件配置
  pluginOptions: {
    vconsole: {
      enable: env !== 'production'
    }
  },
  devServer: {
    open: process.platform === 'darwin',
    // https: false,
    hotOnly: true,
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
    proxy: {
      '/api': {
        target: 'http://localhost:7100', // 后台接口域名
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
