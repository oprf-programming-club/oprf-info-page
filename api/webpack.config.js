const { envPlugin, mode } = require("../common-webpack.config");

const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  output: {
    filename: "index.js",
    path: path.join(__dirname, "dist"),
    libraryTarget: "commonjs2"
  },
  mode,
  plugins: [envPlugin, new webpack.ContextReplacementPlugin(/.*$/, /a^/)],
  optimization: {
    minimizer: [new TerserPlugin()]
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
        exclude: /node_modules/
      }
    ]
  }
};
