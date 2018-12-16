module.exports = {
  module: {
    loaders: [
      { exclude: ['node_modules'], loader: 'babel', test: /\.js$/ },
      { loader: 'raw-loader', test: /\.ohm$/ }
    ]
  },
  resolve: {
    extensions: ['', 'js'],
    modules: ['node_modules']
  }
};
