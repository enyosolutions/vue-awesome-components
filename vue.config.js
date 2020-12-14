const path = require('path');
const webpack = require('webpack');
const version = require('./package.json').version;
// const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const banner = `
/**
 * vue-aw-components ${version}
 * https://github.com/enyosolutions-team/vue-aw-components/
 * Released under the MIT License.
 */
`;


let plugins = [];
let optimization = {};

// comment line  to disable analyzer
// plugins.push(new BundleAnalyzerPlugin());


module.exports = {
  lintOnSave: false,
  filenameHashing: false,
  runtimeCompiler: false,
  transpileDependencies: [],
  productionSourceMap: false,
  configureWebpack: {
    plugins,
    optimization,

    resolve: {
      alias: {
        'vue-aw-components': path.resolve(__dirname, 'src')
      }
    }
  },

  devServer: {
    proxy: 'http://localhost:3000',
  },

  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // config.externals = {
      //   'vue-multiselect': 'vue-multiselect',
      //   'sweetalert2': 'sweetalert2',
      //   'sweetalert2/dist': 'sweetalert2/dist',
      //   'vue2-daterange-picker': 'vue2-daterange-picker',
      //   'vue-form-generator': 'vue-form-generator',
      //   'vue-good-table': 'vue-good-table',
      //   'core-js': 'core-js',
      //   // 'axios': 'axios',
      //   'lodash': 'lodash',
      //   'qs': 'qs',
      // };
      config.plugin('banner').use(webpack.BannerPlugin, [
        {
          banner,
          raw: true,
          entryOnly: true
        }
      ]);
      // config.plugin("lodash").use(LodashModuleReplacementPlugin, [
      //   {
      //     cloning: true,
      //     caching: true,
      //     collections: true,
      //     guards: true,
      //     deburring: true,
      //     unicode: true,
      //     chaining: true,
      //     coercions: true,
      //     flattening: true,
      //     paths: true,
      //     placeholders: true,
      //     shorthands: false,
      //     currying: false,
      //     metadata: false,
      //     exotics: false,
      //     memoizing: false,
      //   }
      // ]);
    }
    else {
      config.resolve.alias.set('vue-aw-components', path.resolve(__dirname, 'src'));
    }
  }
};
