import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

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
    input: 'src/app.js',
    output: {
        file: 'dist/wxcharts-min.js',
        format: 'cjs',
        banner: banner,
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
        uglify()
    ],
};
