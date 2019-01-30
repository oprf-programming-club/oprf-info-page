const isDev = process.env.NODE_ENV !== "production";
const mode = isDev ? "development" : "production";
process.env.NODE_ENV = mode;

const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = exports = otherConfig =>
  merge.smart(config, otherConfig, {
    output: { path: path.join(otherConfig.context, "dist") }
  });

exports.isDev = isDev;
exports.mode = mode;

const OPRF_API_DEFAULT_PORT = 60302;

const config = {
  output: {
    filename: "index.js",
    path: "dist"
  },
  mode,
  plugins: [
    new webpack.EnvironmentPlugin({
      OPRF_API_DEFAULT_PORT,
      OPRF_API_URL: isDev
        ? `http://localhost:${OPRF_API_DEFAULT_PORT}`
        : "/api",
      OPRF_API_CORS: isDev
    })
  ],
  resolve: {
    modules: [path.resolve(__dirname, ".."), "node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  optimization: {
    minimizer: [new TerserPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"]
      }
    ]
  }
};
console.log;
exports.config = config;
