const isDev = process.env.NODE_ENV !== "production";
const mode = isDev ? "development" : "production";
process.env.NODE_ENV = mode;

const webpack = require("webpack");

exports.isDev = isDev;
exports.mode = mode;

exports.envPlugin = new webpack.EnvironmentPlugin({
  OPRF_API_URL: isDev ? "http://localhost:3000" : "/api"
});
