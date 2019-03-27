
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

var htmlwenpack = new HtmlWebpackPlugin({
    template:path.join(__dirname,'./src/index.html'),
    filename:'index.html'
})
module.exports ={
    mode: 'production',
    
    devServer: {
      
     
        proxy: {
            '/api': {
                target: 'http://localhost:3002/', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }

    },




    plugins:[
        htmlwenpack,
        new VueLoaderPlugin()
    ],
    module:{
        rules:[
            {test:/\.vue$/,loader:'vue-loader'},
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, 
            {
                test: /\.(jpg|png)$/,
                use: [
                    {
                      loader: 'url-loader',
                      options: {
                        name: '[name].[ext]',//原名输出
                       
                      }
                    },
                  ]
                // limit图片大小byte   如果参数大于图片得置会转换为bate64  如果小于则不会
                
              },
        ]
    },
    resolve:{//配置vue
        alias:{
          "vue$":"vue/dist/vue.js"
        }
      }
}