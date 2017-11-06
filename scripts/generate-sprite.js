/**
*	Generate image sprite.
*
*	$ yarn sprite multiple && yarn sprite solid
*/

import generator from 'node-sprite-generator'
import rimraf from 'rimraf'
import path from 'path'

if (process.argv.length >= 3) {
	const types = [ 'multiple', 'solid' ]
	const type = process.argv[2]

	if (types.indexOf(type) !== -1) {
		rimraf(path.resolve(__dirname, './dist/sprite'), err => {
			generator({
				src: [
					path.resolve(__dirname, `../assets/${type}/*.png`)
				],
				spritePath: path.resolve(__dirname, `../dist/sprites/${type}.png`),
				stylesheetPath: path.resolve(__dirname, `../dist/sprites/${type}.scss`),
				compositor: require('node-sprite-generator-jimp'),
				layout: 'packed'
			}, err => {
				if (err) throw err
				else console.log(`${type} Colored Sprite Generated!`)
			})	
		})
	} else {
		throw new Error('Type은 \'mutiple\'과 \'solid\' 둘 중 하나여야 합니다.')
	}
} else {
	throw new Error('Type은 반드시 정의되어야 합니다 : ex) yarn sprite multiple')
}