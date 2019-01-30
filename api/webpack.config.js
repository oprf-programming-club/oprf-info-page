const common = require("webpack-config");

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

module.exports = common(config);
