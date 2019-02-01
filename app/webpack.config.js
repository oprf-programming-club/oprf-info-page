const common = require("../webpack-config");
const { isDev } = common;

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

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
    }),
    new MiniCssExtractPlugin()
  ],
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          (() => {
            const preloaded = new Set([
              path.join(__dirname, "src/styles/preloaded.ts")
            ]);
            return ({ issuer, realResource }) => {
              if (!isDev && preloaded.has(issuer)) {
                preloaded.add(realResource);
                return MiniCssExtractPlugin.loader;
              } else {
                return "style-loader";
              }
            };
          })(),
          "css-loader"
        ]
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
