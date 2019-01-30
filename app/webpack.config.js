const common = require("../webpack-config");

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const config = {
  context: __dirname,
  entry: "./src/index.tsx",
  plugins: [
    new HTMLWebpackPlugin({
      inject: false,
      template: require("html-webpack-template"),
      title: "OPRF Info",
      appMountId: "app",
      favicon: "assets/favicon.ico"
    })
  ],
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"]
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

module.exports = common(config);
