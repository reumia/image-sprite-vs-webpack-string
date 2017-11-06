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

import $ from 'jQuery'

$(document).ready(() => {
	const img = $('<img />', {
		src: apple
	})

	$('.webpack-apple').append(img)
})