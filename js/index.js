
const key = 'HpcLCCff9KFeyhHiS';
//const key = 'SunWZiorHPdTniAk2';
const images = 'https://www.airvisual.com/images/';

var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://api.airvisual.com/v2/nearest_city?key=" + key,
        "method": "GET",
        "headers": {}
}

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

$.ajax(settings).done(function (response) {
        console.log(response);

        var parsed = JSON.stringify(response.data.current.pollution.aqius)
        document.getElementById("banner").querySelector("#aqi").innerHTML = parsed;    

        var weather = {
        	image: "<img src=\"" + images + response.data.current.weather.ic + ".png" + "\"/>",
        	temp: (response.data.current.weather.tp * 9/5) + 32,
        	humid: response.data.current.weather.hu,
        	pressure: response.data.current.weather.pr,
		wspeed: (response.data.current.weather.ws * 2.237).toFixed(2)
	};

	console.log(weather);
	var city = document.getElementById("list1").querySelector("#inner");
    
	//Populate Data
	var loc = document.getElementById("city");
	var winfo = document.getElementById("wimage");
	var temp = document.getElementById("tp");
	var humidity = document.getElementById("humidity");
	var pressure = document.getElementById("pressure");
	var wspeed = document.getElementById("speed");
	var color = getColor(response.data.current.pollution.aqius);

	loc.innerHTML = response.data.city;
	winfo.innerHTML = weather.image;
	temp.innerHTML = weather.temp + "ºF";
	humidity.innerHTML = "Humidity:<br>" + weather.humid + "%";
	pressure.innerHTML = "Pressure:<br>" + weather.pressure + "hPa";
	wspeed.innerHTML = "Wind Speed:<br>" + weather.wspeed + "mph";

	$("#aqi-color").css("background-color", color);

	city.innerHTML = weather.image + "<p>" + response.data.city + "<p>";
});
