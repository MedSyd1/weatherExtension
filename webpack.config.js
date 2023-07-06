const path = require("path");
const copywebpackplugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    popup: "./src/popup.js",
    weather: "./src/weather.js",
    iconMap: "./src/iconMap.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new copywebpackplugin({
      patterns: [{ from: "static" }],
    }),
  ],
  watch: true,
};
