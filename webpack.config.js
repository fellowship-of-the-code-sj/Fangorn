const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/src/index.jsx',
  output: {
    path: path.join(__dirname, './client/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.join(__dirname, 'client/src'),
        ],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react'],
        },
      },
    ],
  },
};
