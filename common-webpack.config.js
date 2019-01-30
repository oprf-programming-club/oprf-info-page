const isDev = process.env.NODE_ENV !== "production";
const mode = isDev ? "development" : "production";
process.env.NODE_ENV = mode;

const webpack = require("webpack");

exports.isDev = isDev;
exports.mode = mode;

const OPRF_API_DEFAULT_PORT = 60302;

exports.envPlugin = new webpack.EnvironmentPlugin({
  OPRF_API_DEFAULT_PORT,
  OPRF_API_URL: isDev ? `http://localhost:${OPRF_API_DEFAULT_PORT}` : "/api",
  OPRF_API_CORS: isDev
});
