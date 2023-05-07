const path = require("path");
const srcPath = path.join(__dirname, "app/src");

const glob = require("glob");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");

module.exports = {
  entry: {
    index: "./app/src/js/index.js",
    bootstrap: "./app/src/js/bootstrap.js",
  },
  output: {
    filename: "assets/js/[name].bundle.js",
    path: path.resolve(__dirname, "app/dist"),
    clean: true,
  },
  devServer: {
    static: path.resolve(__dirname, "app/dist"),
    port: 8080,
    hot: true,
    open: true,
    watchFiles: ["./app/src/**/*", "./app/src/*"],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerWebpackPlugin(), "..."],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./app/src/index.html", hash: true }),
    new MiniCssExtractPlugin({ filename: "assets/css/bundle.css" }),
    new CssMinimizerWebpackPlugin(),
    new PurgeCSSPlugin({
      paths: glob.sync(`${srcPath}/**/*`, { nodir: true }),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyPlugin({ patterns: [{ from: "./app/src/audio", to: "assets/audio" }] }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: () => [autoprefixer],
              },
            },
          },
          { loader: "sass-loader" },
        ],
      },
    ],
  },
};
