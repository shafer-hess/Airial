var colors = {
	"green": "rgb(108,223,67)",
	"yellow": "rgb(255,254,85)",
	"orange": "rgb(236,134,51)",
	"red": "rgb(231,51,35)",
	"purple": "rgb(138,27,75)",
	"maroon": "rgb(114,20,39)"
}

var range = {
	"green": {"min": 0, "max": 50},
	"yellow": {"min": 51, "max": 100},
	"orange": {"min": 101, "max": 150},
	"red": {"min": 151, "max": 200},
	"purple": {"min": 201, "max": 300},
	"maroon": {"min": 301, "max": 500}
}

function getColor(aqi) {
	if(aqi >= range.green.min && aqi <= range.green.max) { return colors.green; }
	else if(aqi >= range.yellow.min && aqi <= range.yellow.max) { return colors.yellow; }
	else if(aqi >= range.orange.min && aqi <= range.orange.max) { return colors.orange; }
	else if(aqi >= range.red.min && aqi <= range.red.max) { return colors.red; }
	else if(aqi >= range.purple.min && aqi <= range.purple.max) { return colors.purple; }
	else { return colors.maroon; }
}
