const key = 'SunWZiorHPdTniAk2';

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "api.airvisual.com/v2/countries?key=" + key,
	"method": "GET",
	"headers": {}
};

$(document).ready(function() {
	//Get valid Countries
	$.ajax(settings).done(function(response)) {
		var countryList = "";
		for(country in response.data) {
			console.log(country);	
		}
	}
});





