import '../assets/solid/add-contact.png'
import '../assets/solid/add.png'
import '../assets/solid/android.png'
import '../assets/solid/bars-1.png'
import '../assets/solid/bars.png'
import '../assets/solid/battery-1.png'
import '../assets/solid/battery.png'
import '../assets/solid/briefcase.png'
import '../assets/solid/calendar.png'
import '../assets/solid/cancel.png'
import circularClock from '../assets/solid/circular-clock.png'
import '../assets/solid/clock.png'
import '../assets/solid/cloud.png'
import '../assets/solid/coins.png'
import '../assets/solid/copy-1.png'
import '../assets/solid/copy.png'
import '../assets/solid/down-arrow.png'
import '../assets/solid/download.png'
import '../assets/solid/edit.png'
import '../assets/solid/expand.png'

import $ from 'jQuery'

$(document).ready(() => {
	const img = $('<img />', {
		src: circularClock
	})

	$('.webpack-circular-clock').append(img)
})