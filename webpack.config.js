const path = require('path');
const isDevelopment = process.env.NODE_ENV === 'development'
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: ["regenerator-runtime/runtime.js", "./src/index.js"],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
      static: {
      directory: path.join(__dirname, 'dist'),
       },
      port: 8080,
      open:true,
    },
    plugins: [
        new MiniCssExtractPlugin({
                  filename: isDevelopment ? '[name].css' : '[name].[hash].css',
                  chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
               }),
        new HtmlWebpackPlugin(),       
    ],
    module: {
        rules: [
            {
              test: /\.s[ac]ss$/i,
              use: [
                // Creates `style` nodes from JS strings
                "style-loader",
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
              ],
            },
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              },
            }],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss']
    }
}; /**/ 

 