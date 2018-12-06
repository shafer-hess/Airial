//const key = 'SunWZiorHPdTniAk2';
const key = 'HpcLCCff9KFeyhHiS';

var countrySettings = {
	"async": true,
	"crossDomain": true,
	"url": "http://api.airvisual.com/v2/countries?key=" + key,
	"method": "GET",
	"headers": {}
};

var stateSettings = {
	"async": true,
	"crossDomain": true,
	"url": "",
	"method": "GET",
	"headers": {}
};

var citySettings = {
	"async": true,
	"crossDomain": true,
	"url": "",
	"method": "GET",
	"headers": {}
};

$(document).ready(function() {
	//Get valid Countries
	$.ajax(countrySettings).done(function(response) {
		
		var countryList = "";
		for(let country of response.data) {
			let val = "<option value=\"" + country.country + "\">" + country.country + "</option>";
			countryList += val;	
		}
		
		$("#countries").append(countryList);
				
	});

	//State Request
	$("#countries").on("change", function() {
		let selected = $("#countries").val();
		if(selected != "") {
			//Update url with appropriate country
			stateSettings.url = "https://api.airvisual.com/v2/states?country=" + selected + "&key=" + key;
				
			//Perform AJAX request
			$.ajax(stateSettings).done(function(response) {
				var stateList = "";
				for(let data of response.data) {
					let val = "<option value=\"" + data.state + "\">" + data.state + "</option>";
					stateList += val;
				}	
												
				$("#states").find("option").not(":first").remove();	//delete previously appended states
				$("#cities").find("option").not(":first").remove();	//delete any cities that are in a list
				$("#states").append(stateList);				//add all states to list
			});		
		}
	})	

	//City Request
	$("#states").on("change", function() {
		let country = $("#countries").val();
		let state = $("#states").val();
		if(state != "" && country != "") {
			//Update url with country and state
			citySettings.url = "https://api.airvisual.com/v2/cities?state=" + state + "&country=" + country + "&key=" + key;

			//Perform AJAX request
			$.ajax(citySettings).done(function(response) {
				let cityList = "";			
				for(let data of response.data) {
					let val = "<option value\"" + data.city + "\">" + data.city + "</option>";
					cityList += val;
				}

				$("#cities").find("option").not(":first").remove();
				$("#cities").append(cityList);

			});
		}
	});

});
