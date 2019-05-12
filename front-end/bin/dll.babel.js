import webpack from 'webpack';
import path from 'path';

const {DefinePlugin, DllPlugin, LoaderOptionsPlugin, optimize: {ModuleConcatenationPlugin}, NoEmitOnErrorsPlugin} = webpack;

export default {
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    context: process.cwd(),
    cache: true,
    performance: {hints: false},
    entry: {
        core: ['react', 'react-dom', 'react-redux', 'babel-polyfill', 'react-router-dom', 'redux', 'redux-thunk'],
        vendor: ['axios', 'react-d3-tree', 'query-string']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../src/static/assets/'),
        library: '[name]',
        libraryTarget: 'umd'
    },
    plugins: [
        new DllPlugin({context: process.cwd(), path: path.resolve(__dirname, '../src/static/dll/[name].json'), name: '[name]'}),
        new DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }),
        new LoaderOptionsPlugin({ minimize: false, debug: true }),
        new NoEmitOnErrorsPlugin,
        new ModuleConcatenationPlugin
    ]
}