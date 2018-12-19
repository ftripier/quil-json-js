const path = require('path');

const baseConfig = {
  entry: './src/quilToJSON.js',
  module: {
    rules: [
      { exclude: [path.resolve(__dirname, 'node_modules')], loader: 'babel-loader', test: /\.js$/ },
      { loader: 'raw-loader', test: /\.ohm$/ }
    ]
  }
};

const browserConfig = {
  ...baseConfig,
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'browser-main.js'
  }
};

const nodeConfig = {
  ...baseConfig,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'node-main.js'
  }
};

module.exports = [browserConfig, nodeConfig];
