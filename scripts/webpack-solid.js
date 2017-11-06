import '../assets/solid/add-contact.png'
import '../assets/solid/add.png'
import '../assets/solid/android.png'
import '../assets/solid/bars-1.png'
import '../assets/solid/bars.png'
import '../assets/solid/battery-1.png'
import '../assets/solid/battery.png'
import '../assets/solid/briefcase.png'
import '../assets/solid/calendar.png'
import circularClock from '../assets/solid/circular-clock.png'

import $ from 'jQuery'

$(document).ready(() => {
	const img = $('<img />', {
		src: circularClock
	})

	$('.webpack-circular-clock').append(img)
})