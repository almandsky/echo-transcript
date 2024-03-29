const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { GenerateSW } = require('workbox-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');

process.env.NODE_ENV = "production";

module.exports = {
  mode: "production",
  target: "web",
  devtool: "source-map",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    // Display bundle stats
    // new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: "static" }),

    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),
    new webpack.DefinePlugin({
      // This global makes sure React is built in prod mode.
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      // "process.env.OPENAI_API_KEY": JSON.stringify(process.env.OPENAI_API_KEY)
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
      minify: {
        // see https://github.com/kangax/html-minifier#options-quick-reference
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new CopyPlugin({
      patterns: [
        { from: "robots.txt", to: "robots.txt" },
        { from: "sitemap.xml", to: "sitemap.xml" },
        { from: "src/images", to: "images" },
        { from: "src/manifest.json", to: "manifest.json" },
      ],
    }),
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      swDest: 'sw.js',
      maximumFileSizeToCacheInBytes: 15728640,
      runtimeCaching: [
        {
          urlPattern: /.*\.css/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'css-cache',
          },
        },
        {
          urlPattern: /\.(png|jpg|jpeg|svg|gif|ico)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
          },
        },
        {
          urlPattern: /.*\.js/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'js-cache',
          },
        },
        {
          urlPattern: /workgpt/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'html-cache',
          },
        },
        {
          urlPattern: /talkgpt/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'html-cache',
          },
        },
        {
          urlPattern: /about/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'html-cache',
          },
        },
        {
          urlPattern: /index\.html/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'html-cache',
          },
        },
      ],
    }),
    new DotenvWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /(\.css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [() => [require("cssnano")]],
              },
              sourceMap: true,
            },
          }
        ]
      }
    ]
  }
};
