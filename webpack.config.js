var rucksack = require('rucksack-css')
var webpack = require('webpack')
var path = require('path')


var entryFile =  process.env.ENTRY_FILE ? process.env.ENTRY_FILE : './index.js'

module.exports = {
  context: path.join(__dirname, './client'),
  entry: {
    jsx: entryFile,
    html: './index.html',
    vendor: ['react', 'two-way-rest', 'redux', 'immutable']
  },
  output: {
    path: path.join(__dirname, './static'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        include: /client/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: /client/,
        loader: 'style!css'
      },

      { 
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
          loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      { 
          test: /\.(ttf|eot|svg)/, 
          loader: "file-loader" 
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel"
      },
      {
        test: /\.less$/,
        exclude: /client/,
        loader: 'style!css!less'
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    })
  ],
  devServer: {
    contentBase: './client',
    hot: true
  }
}
