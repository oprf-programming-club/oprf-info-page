const common = require("webpack-config");
const { isDev } = common;

const NodemonPlugin = require("nodemon-webpack-plugin");
const webpack = require("webpack");

const config = {
  context: __dirname,
  entry: "./src/index.ts",
  target: "node",
  output: {
    libraryTarget: "commonjs2"
  },
  plugins: [new webpack.ContextReplacementPlugin(/.*$/, /a^/)]
};
if (isDev) {
  config.plugins.push(
    new NodemonPlugin({
      script: "./runner.js"
    })
  );
}

module.exports = common(config);
