const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: { filename: 'bundle.js', path: path.resolve(__dirname, 'public') },
  devServer: {
    static: path.resolve(__dirname, 'public'),
    port: 3001,
    historyApiFallback: true,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    ]
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader','css-loader'] }
    ]
  },
  resolve: { extensions: ['.js','.jsx'] }
};
