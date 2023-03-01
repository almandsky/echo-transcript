const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const DotenvWebpackPlugin = require('dotenv-webpack');

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
    https: false,
    proxy: {
      '/completions': 'http://localhost:3001',
      '/query': 'http://localhost:3001'
  }
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
      ],
    }),
    new webpack.DefinePlugin({
      // This global makes sure React is built in prod mode.
      "process.env.OPENAI_API_KEY": JSON.stringify(process.env.OPENAI_API_KEY)
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
