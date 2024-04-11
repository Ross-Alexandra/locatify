const path = require('path');

module.exports = {
  entry: './src/scripts/index.ts',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
