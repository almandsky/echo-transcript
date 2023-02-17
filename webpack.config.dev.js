const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { GenerateSW } = require('workbox-webpack-plugin');

process.env.NODE_ENV = "development";

module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    open: false,
    stats: "minimal",
    overlay: true,
    historyApiFallback: true,
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico"
    }),
    new CopyPlugin({
      patterns: [
        { from: "robots.txt", to: "robots.txt" },
        { from: "sitemap.xml", to: "sitemap.xml" },
        { from: "src/images", to: "images" },
        { from: "src/manifest.json", to: "manifest.json" },
        // { from: "sw.js", to: "sw.js" },
      ],
    }),
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      swDest: 'sw.js',
      runtimeCaching: [
        {
          urlPattern: /.*\.css/,
          handler: 'NetworkOnly',
          options: {
            cacheName: 'css-cache',
          },
        },
        {
          urlPattern: /\.(png|jpg|jpeg|svg|gif|ico)$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'image-cache',
          },
        },
        {
          urlPattern: /.*\.js/,
          handler: 'NetworkOnly',
          options: {
            cacheName: 'js-cache',
          },
        },
        {
          urlPattern: /index\.html/,
          handler: 'NetworkOnly',
          options: {
            cacheName: 'html-cache',
          },
        },
      ],
    }),
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
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
