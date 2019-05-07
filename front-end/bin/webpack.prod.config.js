import Config from 'webpack-config';
import UnminifiedWebpackPlugin from 'unminified-webpack-plugin';

export default new Config().extend('bin/webpack.base.config.js').merge({
    output: {
        filename: '[name].min.js'
    },
    plugins: [
        new UnminifiedWebpackPlugin()
    ]
});