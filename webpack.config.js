var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js', // this is the compiled final javascript file which we will include in the index.html
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      // the url-loader uses DataUrls.
      // the file-loader emits files.
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
    ],
  },
  devtool: 'cheap-module-eval-source-map', // this helps to browser to point to the exact file in the console, helps in debug
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true, // this prevents the default browser full page refresh on form submission and link change
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        /*pathRewrite: {
        '^/api': ''
        }*/
      },
    },
    // It suppress error shown in console, so it has to be set to false.
    quiet: false,
    // It suppress everything except error, so it has to be set to false as well
    // to see success build.
    noInfo: false,
    stats: {
      // Config for minimal console.log mess.
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    },
  },
  resolve: {
    alias: {
      'slate-drop-or-paste-images': path.resolve(__dirname, 'packages/slate-drop-or-paste-images'),
    },
  },
};
