const path = require("path");
const distPath = path.resolve(__dirname, "app/dist");
const srcPath = path.resolve(__dirname, "app/src");

const glob = require("glob");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    index: path.resolve(srcPath, "js/index.js"),
    bootstrap: path.resolve(srcPath, "js/style.js"),
  },
  output: {
    filename: "asset/js/[name].bundle.js",
    path: distPath,
    clean: true,
  },
  devServer: {
    static: distPath,
    port: 8080,
    hot: true,
    open: true,
    watchFiles: glob.sync(`${srcPath}/**/*`, { nodir: true }),
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
    new HtmlWebpackPlugin({ template: path.resolve(srcPath,'index.html'), hash: true }),
    new MiniCssExtractPlugin({ filename: "asset/css/bundle.css" }),
    new CssMinimizerWebpackPlugin(),
    new PurgeCSSPlugin({
      paths: glob.sync(`${srcPath}/**/*`, { nodir: true }),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(srcPath,'audio'), to: path.resolve(distPath,'asset/audio') },
      ],
    }),
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
