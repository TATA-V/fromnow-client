const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(__dirname, './public/index.html'),
  filename: 'index.html',
  inject: 'body',
});
// tsx 파일 로더
const tsxLoader = {
  test: /\.(js|jsx|ts|tsx)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-react'],
    },
  },
};
// 이미지 파일 로더
const imgLoader = {
  test: /\.(gif|jpe?g|png)$/,
  use: {
    loader: 'url-loader',
    options: {
      useRelativePath: false,
      name: '[sha512:hash:base62:5].[ext]',
      limit: 4096,
      outputPath: 'img/',
      publicPath: '/',
    },
  },
};
// svg 파일 로더
const svgLoader = {
  test: /\.svg$/,
  use: ['@svgr/webpack'],
};
// css 파일 로더
const cssLoader = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader', 'postcss-loader'],
  include: path.resolve(__dirname, 'src'),
};
module.exports = {
  entry: path.join(__dirname, 'index.web.js'),
  output: {
    filename: 'bundle.web.js',
    path: path.join(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.js', '.js', '.ts', 'jsx', '.tsx', 'json', '.css'],
  },
  module: {
    rules: [tsxLoader, imgLoader, svgLoader, cssLoader],
  },
  plugins: [HTMLWebpackPluginConfig],
  devServer: {
    open: true,
    historyApiFallback: true,
    hot: true,
    port: 3000,
  },
};
