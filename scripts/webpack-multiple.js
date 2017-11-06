import apple from '../assets/multiple/Apple.png'
import '../assets/multiple/Asparagus.png'
import '../assets/multiple/Avocado.png'
import '../assets/multiple/Baby_Bottle.png'
import '../assets/multiple/Bacon.png'
import '../assets/multiple/Banana.png'
import '../assets/multiple/Banana_Split.png'
import '../assets/multiple/Bar.png'
import '../assets/multiple/Bavarian_Beer_Mug.png'
import '../assets/multiple/Bavarian_Pretzel.png'
import '../assets/multiple/Bavarian_Wheat_Beer.png'
import '../assets/multiple/Beer.png'
import '../assets/multiple/Beer_Bottle.png'
import '../assets/multiple/Beer_Can.png'
import '../assets/multiple/Beet.png'
import '../assets/multiple/Birthday_Cake.png'
import '../assets/multiple/Bottle_of_Water.png'
import '../assets/multiple/Bread.png'
import '../assets/multiple/Broccoli.png'
import '../assets/multiple/Cabbage.png'

import $ from 'jQuery'

$(document).ready(() => {
	const img = $('<img />', {
		src: apple
	})

	$('.webpack-apple').append(img)
})