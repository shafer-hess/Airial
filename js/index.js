
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

	loc.innerHTML = response.data.city;
	winfo.innerHTML = weather.image;
	temp.innerHTML = weather.temp + "ºF";
	humidity.innerHTML = "Humidity:<br>" + weather.humid + "%";
	pressure.innerHTML = "Pressure:<br>" + weather.pressure + "hPa";
	wspeed.innerHTML = "Wind Speed:<br>" + weather.wspeed + "mph";



	city.innerHTML = weather.image + "<p>" + response.data.city + "<p>";
});
