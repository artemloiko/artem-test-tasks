const path = require('path');
const argv = require('yargs').argv;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin')
  .default;

const isDevelopment = argv.mode === 'development';
const isProduction = !isDevelopment;
const distPath = path.join(__dirname, '/public');

const config = {
  devtool: isProduction ? '' : 'inline-cheap-source-map',
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: 'bundle.[hash].js',
    path: distPath,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                isProduction ? require('cssnano') : () => {},
                require('autoprefixer')({
                  browsers: ['last 1 versions'],
                }),
              ],
            },
          },
          'sass-loader',
        ],
      },

      {
        test: /(\.(gif|png|jpe?g))|([^_]\.svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /_\.svg$/i,
        use: [
          {
            loader: 'svg-react-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].chunk.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    }),
    new HTMLInlineCSSWebpackPlugin(),
  ],

  optimization: isProduction
    ? {
        minimizer: [
          new UglifyJsPlugin({
            parallel: true,
            cache: true,
            uglifyOptions: {
              compress: {
                inline: false,
                drop_console: true,
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
              },
            },
          }),
        ],
      }
    : {},
  devServer: {
    contentBase: distPath,
    port: 9000,
    compress: true,
    host: '0.0.0.0',
  },
};

module.exports = config;
