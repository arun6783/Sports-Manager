import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import { WebpackManifestPlugin } from 'webpack-manifest-plugin'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'

const paths = {
  appSrc: path.resolve(process.cwd(), 'src/client'),
  appIndexJs: path.resolve(process.cwd(), 'src/client/index.js'),
  appBuild: path.resolve(process.cwd(), 'dist'),
  appHtml: path.resolve(process.cwd(), 'src/client/public/index.html'),
  appNodeModules: path.resolve(process.cwd(), 'node_modules'),
  appPublic: path.resolve(process.cwd(), 'src/client/public'),
  publicUrlOrPath: '/',
}

const isEnvProduction = process.env.NODE_ENV === 'production'

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'

export default {
  mode: isEnvProduction ? 'production' : 'development',
  devtool: isEnvProduction
    ? shouldUseSourceMap
      ? 'source-map'
      : false
    : 'cheap-module-source-map',
  entry: paths.appIndexJs,
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    assetModuleFilename: 'static/media/[name].[hash][ext]',
    publicPath: paths.publicUrlOrPath,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          cacheDirectory: true,
          cacheCompression: false,
          compact: isEnvProduction,
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],
                ],
              },
              sourceMap: isEnvProduction ? shouldUseSourceMap : false,
            },
          },
        ],
        sideEffects: true,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: isEnvProduction
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }
        : undefined,
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    new WebpackManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: paths.publicUrlOrPath,
    }),
    new CaseSensitivePathsPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],
  optimization: {
    minimize: isEnvProduction,
    minimizer: [new CssMinimizerPlugin()],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react-native': 'react-native-web',
    },
  },
  performance: false,
}
