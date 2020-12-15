
const { version } = require('./package');

const banner = `/**
 * vue-aw-components v${version}
 * (c) 2018-present
 * https://github.com/enyosolutions/vue-aw-components
 * Released under the MIT License.
 */
`;

module.exports = {
  banner,
  output: {
    fileName: (context, defaultFileName) => {
      if (context.format === 'umd' || context.format === 'umd-min') {
        return 'vac[min].js';
      }
      return 'vac.[format].js';
    },
    moduleName: 'vfg',
    format: [
      'es',
      'umd',
      'umd-min',
    ],
  },
  plugins: {
    commonjs: true,
    vue: {
      css: true,
    },
  },
  bundleNodeModules: true,
};
