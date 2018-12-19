/**
 * Created by Administrator on 2018/12/19.
 */
const path = require('path')
const webpack = require('webpack')
module.exports = {
    entry: './bin/www.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js"
    }
}