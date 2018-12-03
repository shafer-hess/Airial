
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

    var weather = {
        image: "<img src=\"" + images + response.data.current.weather.ic + ".png" + "\"/>",
        temp: (response.data.current.weather.tp * 9/5) + 32,
        humid: response.data.current.weather.hu,
        pressure: response.data.current.weather.pr,
        wspeed: (response.data.current.weather.ws * 2.237).toFixed(2)
    };

    console.log(weather);
    var city = document.getElementById("list1").querySelector("#inner");
    city.innerHTML = weather.image + "<p>" + response.data.city + "<p>";


    var login = document.getElementById('login');
    var sign = document.getElementById('sign-up');
    var name = document.getElementById('current-user');

    $(login).toggle();
    $(sign).toggle();
    $(name).toggle();
});
