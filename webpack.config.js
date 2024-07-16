const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')

// Load environment variables from .env file
dotenv.config()

module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true', // Enable hot module replacement
    './app/src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/', // Ensure proper routing
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS into separate files
          'css-loader',
          'postcss-loader', // Use PostCSS loader to process Tailwind CSS
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/public/index.html', // Source of your index.html
      filename: 'index.html', // Output filename in the dist directory
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'app/public/logo.png', to: 'logo.png' }, // Copy logo to the dist directory
        { from: 'app/public/favicon.ico', to: 'favicon.ico' }, // Example of copying another static file
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new webpack.HotModuleReplacementPlugin(), // Enable hot module replacement
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: process.env.WEBPACK_PORT || 3000, // Use the environment variable
    historyApiFallback: true,
    hot: true, // Enable hot module replacement
  },
}
