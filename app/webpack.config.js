const { envPlugin, mode } = require("../common-webpack.config");

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "index.js",
    path: path.join(__dirname, "dist")
  },
  mode,
  plugins: [
    new HTMLWebpackPlugin({
      inject: false,
      template: require("html-webpack-template"),
      title: "OPRF Info",
      appMountId: "app",
      favicon: "assets/favicon.ico"
    }),
    envPlugin
  ],
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin(), new TerserPlugin()]
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.(svg|eot|svg|ttf|woff|woff2|png|gif)$/,
        loader: "file-loader",
        options: {
          outputPath: "assets"
        }
      }
    ]
  }
};
