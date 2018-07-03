const path = require('path');

module.exports = {

  mode: "none",

  // React dev tools
  devtool: "cheap-module-source-map",

  // the entry file for the bundle
  entry: path.join(__dirname, '/client/src/index.js'),

  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '/client/public/dist/js'),
    filename: 'bundle.js',
  },

  module: {
  
    rules: [
      {
        test: /\.(js|jsx)?$/,
        include: path.join(__dirname, '/client/src'),
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, '/client/src/styles'),
        use: ["style-loader", "css-loader"]
      }
    ]
  
  },

  devServer: {
    port: 3000,
    open: true,
    proxy: {
      "/": "http://localhost:3000",
    }
  }

};
