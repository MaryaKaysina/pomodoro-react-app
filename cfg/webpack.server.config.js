const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { DefinePlugin } = require('webpack');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
const GLOBAL_CSS_REGEXP = /\.global\.css$/;
const COMMON_PLUGINS = [ new DefinePlugin({ 'process.env.CLIENT_ID': `'${process.env.CLIENT_ID}'` }) ];

module.exports = {
  target: 'node',
  mode: NODE_ENV ? NODE_ENV : 'development',
  entry: path.resolve(__dirname, '../src/server/server.js'),
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: 'server.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
              onlyLocals: true,
            }
          },
        ],
        exclude: GLOBAL_CSS_REGEXP
      },
      {
        test: GLOBAL_CSS_REGEXP,
        use: ['css-loader']
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/assets/fonts/[name].[ext]",
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|wav)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/assets/[name].[ext]",
              publicPath: '/static/',
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: false,
  },
  devtool: IS_DEV ? 'eval' : false,
  plugins: COMMON_PLUGINS
}
