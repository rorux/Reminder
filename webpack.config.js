const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === "development";
const IS_PROD = NODE_ENV === "production";

function setupDevtool() {
  if (IS_DEV) return "eval";
  if (IS_PROD) return false;
}

module.exports = {
  mode: NODE_ENV ? NODE_ENV : "development",
  entry: {
    main: path.resolve(__dirname, "src", "index.jsx"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: path.join("index.js"),
  },
  target: "web",
  plugins: [
    new MiniCssExtractPlugin({
      filename: path.join("style", "[name].css"),
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.[jt]sx?$/i,
        use: ["ts-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "@component": path.resolve(__dirname, "src", "component"),
    },
  },
  devServer: {
    port: 3000,
    hot: IS_DEV,
    open: false,
  },
  devtool: setupDevtool(),
};
