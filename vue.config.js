const path = require("path");
module.exports = {
  filenameHashing: false,
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/")
      }
    }
  }
};
