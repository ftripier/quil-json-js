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
    filename: 'browser-main.js',
    library: 'quilToJSON',
    libraryExport: 'default'
  }
};

const nodeConfig = {
  ...baseConfig,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'node-main.js',
    library: 'quilToJSON',
    libraryExport: 'default'
  }
};

module.exports = [browserConfig, nodeConfig];
