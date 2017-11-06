import path from 'path'
import webpack from 'webpack'
import CompressionPlugin from 'compression-webpack-plugin'

module.exports = {
	entry: {
		'multiple': path.resolve(__dirname, '../scripts/webpack-multiple.js'),
		'solid': path.resolve(__dirname, '../scripts/webpack-solid.js'),
		'svg': path.resolve(__dirname, '../scripts/webpack-svg.js')
	},
	output: {
		path: path.resolve(__dirname, '../dist/bundle'),
		filename: '[name].js'	
	},
	module: {
		rules: [
			{ test: /\.js$/, use: 'babel-loader' },
			{ test: /\.png$/, use: 'base64-inline-loader' },
			{ test: /\.svg$/, use: 'svg-inline-loader?classPrefix' }
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new CompressionPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity
		})
	]
}