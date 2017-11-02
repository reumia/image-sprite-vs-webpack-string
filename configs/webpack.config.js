import path from 'path'
import webpack from 'webpack'
import CompressionPlugin from 'compression-webpack-plugin'

module.exports = {
	entry: {
		'multiple': path.resolve(__dirname, '../scripts/webpack-multiple.js'),
		'solid': path.resolve(__dirname, '../scripts/webpack-solid.js')
	},
	output: {
		path: path.resolve(__dirname, '../dist/bundle'),
		filename: '[name].js'	
	},
	module: {
		rules: [
			{ test: /\.png$/, use: 'base64-inline-loader' }
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new CompressionPlugin()
	]
}