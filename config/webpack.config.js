/* Path & Webpack */
const path = require('path');
const webpack = require('webpack');

/* Webpack Plugins */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/* Build Process */
const devMode = process.env.NODE_ENV !== 'production';

/* Plugins */
const autoprefixer = require('autoprefixer');
const flexbugs = require('postcss-flexbugs-fixes');

const assets = path.resolve(__dirname, '../html/assets/');
const src = path.resolve(__dirname, '../src/');

module.exports = {
  mode: devMode ? 'development' : 'production',
  context: `${src}/js/`,
  entry: {
    script: ['react-hot-loader/patch', `${src}/js/main`],
  },
  output: {
    path: assets,
    filename: 'js/[name].bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, '../html/'),
    publicPath: '/assets/',
    port: 8000,
    hot: true,
    inline: true,
    historyApiFallback: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/styles.css',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    modules: ['node_modules', `${src}/js`],
    extensions: ['*', '.js', '.jsx', '.css', '.scss'],
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
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: 'inline',
              plugins: () => [
                autoprefixer({
                  browsers: [
                    'last 1 major version',
                    '>= 1%',
                    'Chrome >= 45',
                    'Firefox >= 38',
                    'Edge >= 12',
                    'Explorer >= 10',
                    'iOS >= 9',
                    'Safari >= 9',
                    'Android >= 4.4',
                    'Opera >= 30',
                  ],
                }),
                flexbugs,
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['file-loader?name=images/[name].[ext]', 'image-webpack-loader?bypassOnDebug'],
      },
    ],
  },
};
