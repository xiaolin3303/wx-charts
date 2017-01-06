import babel from 'rollup-plugin-babel';

let banner = `/*
 * charts for WeChat small app v1.0
 *
 * https://github.com/xiaolin3303/wx-charts
 * 2016-11-28
 *
 * Designed and built with all the love of Web
 */
`;

export default {
  entry: 'src/app.js',
  format: 'cjs',
  dest: 'dist/wxcharts.js',
  plugins: [
      babel({
          exclude: 'node_modules/**',
      })
  ],
  banner: banner
};
