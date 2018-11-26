
const key = 'HpcLCCff9KFeyhHiS';
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

    var image = "<img src=\"" + images + response.data.current.weather.ic + ".png" + "\"/>";
    console.log(image);

    var city = document.getElementById("list1").querySelector("#inner");
    city.innerHTML = image + "<p>" + response.data.city + "<p>";
  });






