
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
  env: {
    NODE_ENV: 'production'
  },
  output: {
    dir: 'lib',
    extractCSS: true,
    fileName: (context, defaultFileName) => {
      if (context.format === 'umd' || context.format === 'umd-min') {
        return 'vac[min].js';
      }
      if (context.format === 'cjs') {
        return 'vac.common.js';
      }
      if (context.format === 'es') {
        return 'vac.esm.js';
      }
      return 'vac.[format].js';
    },
    moduleName: 'vueAwesomeComponents',
    format: [
      'cjs',
      'es',
      'umd-min',
    ],
  },
  plugins: {
    commonjs: true,
    'node-resolve': {
      qs: true
    },
    'peer-deps-external': false,
    vue: {
      css: true,
      include: [/\.vue$/, 'qs', 'iziToast'],
    },
    postcss: true,
  },
  bundleNodeModules: true,
  'files': ['lib', 'src']
};
