const path = require('path');
const { VueLoaderPlugin } = require('vue-loader'); // vue3 webpack loader[通过vue-loader@next安装vue3版本，默认是vue2版本]

module.exports = {
  /** 打包入口函数 */
  entry: {
    path: './src/main.js'
  },
  /** 打包目录 */
  output: {
      filename: 'assets/js/[name].[contenthash:6].js',
      path: path.resolve(__dirname, './dist')
  },
  module: { // loaders
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader', // 解析.vue文件
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(), // vue3loader plugins 注册
  ]
}