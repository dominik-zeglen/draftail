const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const sass = require("sass");
const autoprefixer = require("autoprefixer");

const pkg = require("../package.json");

const examplesPath = path.join(__dirname, "..", "examples");
const SVG_ICONS = fs.readFileSync(
  path.join(examplesPath, "constants", "icons.svg"),
  "utf-8",
);

module.exports = (baseConfig, env, defaultConfig) => {
  // See http://webpack.github.io/docs/configuration.html#devtool
  defaultConfig.devtool = "source-map";

  defaultConfig.module.rules.push({
    test: /\.(scss|css)$/,
    loaders: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
          minimize: true,
        },
      },
      {
        loader: "postcss-loader",
        options: {
          sourceMap: true,
          plugins: () => [autoprefixer()],
        },
      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
          implementation: sass,
        },
      },
    ],
    include: path.resolve(__dirname, "../"),
  });
  defaultConfig.plugins.push(
    new webpack.DefinePlugin({
      EMBEDLY_API_KEY: JSON.stringify("d23c29a928fe4d89bda46b0291914c9c"),
      PKG_VERSION: JSON.stringify(pkg.version),
      SVG_ICONS: JSON.stringify(SVG_ICONS),
    }),
  );

  return defaultConfig;
};