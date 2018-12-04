const key = 'SunWZiorHPdTniAk2';

var countrySettings = {
	"async": true,
	"crossDomain": true,
	"url": "http://api.airvisual.com/v2/countries?key=" + key,
	"method": "GET",
	"headers": {}
};

$(document).ready(function() {
	//Get valid Countries
	$.ajax(countrySettings).done(function(response) {
		
		var countryList = "";
		for(let country of response.data) {
			let val = "<option value=" + country.country + ">" + country.country + "</option>";
			countryList += val;	
		}
		
		$("#countries").append(countryList);
				

	});

	//State Request
	$("#countries").on("change", function() {
		var selected = $("#countries").val(); 
		if(selected != "") {
			console.log(selected);
		}
	});
	

	//City Request







});





