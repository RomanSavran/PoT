import Config from 'webpack-config';
import webpack from 'webpack';
import path from 'path';

const output = path.join(process.cwd(), 'src/static');

export default new Config().extend('bin/webpack.base.config.js').merge({
    output: {
        filename: '[name].js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: output,
        watchContentBase: true,
        compress: true,
        historyApiFallback: true,
        port: 7777,
        watchOptions: {
            aggregateTimeout: 500
        }
    }
});