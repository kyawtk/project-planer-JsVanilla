const path  = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports= {
    mode: "development",
    entry:{
        path: path.resolve(__dirname, 'src/index.js')

    },
    output:{
        path : path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    devtool: 'inline-source-map',
    devServer:{
        static:{
            directory: path.resolve(__dirname, 'dist'),
           
        }
      },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Finish it up!', // The title of the generated HTML file
          template: path.resolve(__dirname,'src/template.html')
        })
      ],
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test:/\.(png|svg|jpg|jpeg|gif)$/,
            type: "asset/resource"
          }
        ]
      }
}