const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.ts',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [{
        test: /\.html$/,
        use: {loader: 'html-loader'},
    }, {
        test: /\.tsx?$/,
        use: 'ts-loader',
    }]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
