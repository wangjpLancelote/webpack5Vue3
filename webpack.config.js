const path = require('path');
const { VueLoaderPlugin } = require('vue-loader'); // vue3 webpack loader[通过vue-loader@next安装vue3版本，默认是vue2版本]
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports = {
  /** 打包入口函数 */
  entry: {
    path: './src/main.ts'
  },
  /** 打包目录 */
  output: {
      filename: 'assets/js/[name].[contenthash:6].js',
      path: path.resolve(__dirname, './dist')
  },
  devServer: {
    port: 3000,
    compress: true,
  },
  module: { // loaders
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader', // 解析.vue文件
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // 解析css文件

      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'] // 解析sass/scss文件
      },
      {
        test: /\.less$/i,
        use: [ 'style-loader', 'css-loader', 'less-loader' ], // 解析less 文件
      },
      {
        test: /\.styl$/,
        loader: 'stylus-loader' // vue stylus样式 
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        type: 'asset/resource', // webpack5 内置了针对图片资源文件的loader(asset/resource)
        generator: {
          filename: 'assets/img/[hash][ext]'
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/, // 针对tsx, .vue文件的lang=ts 的情况进行解析
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      // {
      //   test: /\.(js|mjs|jsx|ts|tsx)$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env']
      //     }
      //   },
      // },
    ]
  },
  plugins: [
    new VueLoaderPlugin(), // vue3loader plugins 注册
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './webpackIndex.html'), // 给打包后的js指定模板文件, 这里和vite 的模板区分一下, vite使用index.html
    }),
    new DefinePlugin({
      __VUE_PROD_DEVTOOLS: false, // vue全局变量,是否生产包支持devTools插件, vue工程构建完成后会出现此warning
      __VUE_OPTIONS_API: false, // vue 的全局变量, 是否使用options API,即vue2的写法, vue工程构建完成后会出现此warning
    })
  ]
}