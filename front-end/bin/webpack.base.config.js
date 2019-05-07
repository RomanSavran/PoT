import webpack from 'webpack';
import Config from 'webpack-config';
import ExtractTextPlugin  from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const {DllReferencePlugin} = webpack;
const output = path.resolve(__dirname, '../src/static/assets/');
const entry = path.resolve(__dirname, '../src/main.js');
const sharedLess = path.resolve(__dirname, '../src/less/');
const extractLESS =  new ExtractTextPlugin('bundle.css');

export default new Config().merge({
    entry: {
        client: entry
    },
    context: process.cwd(),
    output: {
        path: output,
        filename: '[name].js',
        sourceMapFilename: '[file].map',
        chunkFilename: '[name].js'
        //
        //
        //  filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(es6|js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['env', 'react', 'es2015']
                }
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: extractLESS.extract({
                    fallback: "style-loader",
                    use: [
                        { loader: 'css-loader', options: { sourceMap: true }},
                        { loader: 'postcss-loader'},
                        { loader: 'less-loader', options: { paths: sharedLess }}
                    ]})

            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                exclude: /node_modules/,
                options: {
                    extract: false,
                    esModule: true
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
            template: 'src/static/index.html',
            inject: "body"
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            debug: true,
            sourceMap: true,
            options: {
           
            }
        }),
        new DllReferencePlugin({ context: process.cwd(), manifest: require( path.resolve(__dirname, '../src/static/dll/core.json')) }),
        new DllReferencePlugin({ context: process.cwd(), manifest: require( path.resolve(__dirname, '../src/static/dll/vendor.json')) }),
        extractLESS
    ],
    resolve: {
        extensions: ['.js', '.es6', '.jsx', '.pug', '.less', '.css', '.svg', '.tag', '.png'],
        modules: ['node_modules', 'src'],
        alias: {
          
        }
    }
});

