var lat;
var lon;
var currentWeather;
var tempF;
var tempC;
var trueF = true;

function conversion(){
	tempC =  Math.round((tempF - 32) * 5 / 9);
	trueF = false;
};

// var googleKey = config.GOOGLE_API_KEY;

// function getCity(){
// 	var geocoding = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "%2C" + lon + "&language=en&result_type=locality&key=" + googleKey;
//     $.getJSON(geocoding).done(function(location) {
//         $("#city").html(location.results[0].formatted_address);
//     });
// };

function getCity2(lati, long) {

	let locationData = { latitude: lati, longitude: long };

	$.ajax({
		url: "/geocoding",
		dataType: "json",
		type: "GET",
		data: locationData,
		success: function(location) {
			$("#city").html(location.results[0].formatted_address);
		},
		error: function() {
			console.log("Onoes an error.");
		}
	});
}

// function getCity2 (lati, longi) {
// 	$.post('/geocoding',
// 	 	{
// 			latitude: lati,
// 			longitude : longi
// 		},
//     function(returnedData){
//          console.log(returnedData);
// });
// }


// var darkskyKey = config.DARK_SKY_API_KEY;

// function getWeather(){
// 	$.ajax({
// 	    headers: {"Access-Control-Allow-Origin": "true"},
// 	    type: "GET",
// 	    contentType: "application/json",
// 	    dataType: "jsonp",
// 	    url: "https://api.darksky.net/forecast/" + darkskyKey + "/" + lat + "," + lon,
// 	    success: function(forecast){
// 	        currentWeather = forecast.currently.icon;
// 	        tempF = Math.round(forecast.currently.temperature);
// 	        $("#tempDisplay").html(tempF);
// 	        $("canvas").removeClass("show");
// 	        $("canvas").addClass("hide");

// 	        for(var i = 0; i < weather.length; i++){
// 	          if(currentWeather === weather[i].icon){
// 	            $("#weatherDisplay").html(weather[i].text);
// 	            $("#" + weather[i].icon).addClass("show");
// 	            $("body").addClass(weather[i].icon);
// 	          	}
// 	        }
//       	}
//     });
// };

function getWeather2(lati, long) {
	let locationData = { latitude: lati, longitude: long };

	$.ajax({
		url: "/weather",
		dataType: "json",
		type: "GET",
		data: locationData,
		success: function(forecast){
			console.log(forecast);
			currentWeather = forecast.currently.icon;
			tempF = Math.round(forecast.currently.temperature);
			$("#tempDisplay").html(tempF);
			$("canvas").removeClass("show");
			$("canvas").addClass("hide");

			for(var i = 0; i < weather.length; i++){
				if(currentWeather === weather[i].icon){
					$("#weatherDisplay").html(weather[i].text);
					$("#" + weather[i].icon).addClass("show");
					$("body").addClass(weather[i].icon);
					}
			}
		},
		error: function() {
			console.log("Onoes an error.");
		}
	});
}

$("#convert").on("click", function(){
	if(trueF === true){
		conversion();
		$("#tempDisplay").html(tempC);
		$("#convert").html("C");
	} else {
		$("#tempDisplay").html(tempF);
		$("#convert").html("F");
		trueF = true;
	}
});

if (navigator.geolocation) {
  	navigator.geolocation.getCurrentPosition(function(position) {
	    lat = position.coords.latitude.toFixed(4);
	    lon = position.coords.longitude.toFixed(4);
	    getCity2(lat, lon);
	    getWeather2(lat, lon);
  	});
};

var weather = [
	a = {
		icon: "clear-day",
		text: "Clear",
		skycon: "CLEAR_DAY"
	},
	b = {
		icon: "clear-night",
		text: "Clear",
		skycon: "CLEAR_NIGHT"
	},
	c = {
		icon: "rain",
		text: "Rainy",
		skycon: "RAIN"
	},
	d = {
		icon: "snow",
		text: "Snowy",
		skycon: "SNOW"
	},
	e = {
		icon: "sleet",
		text: "Sleet",
		skycon: "SLEET"
	},
	f = {
		icon: "wind",
		text: "Windy",
		skycon: "WIND"
	},
	g = {
		icon: "fog",
		text: "Foggy",
		skycon: "FOG"

	},
	h = {
		icon: "cloudy",
		text: "Cloudy",
		skycon: "CLOUDY"
	},
	i = {
		icon: "partly-cloudy-day",
		text: "Partly Cloudy",
		skycon: "PARTLY_CLOUDY_DAY"
	},
	j = {
		icon: "partly-cloudy-night",
		text: "Partly Cloudy",
		skycon: "PARTLY_CLOUDY_NIGHT"
	}
];

var icons = new Skycons({"color": "white"});

icons.set("clear-day", Skycons.CLEAR_DAY);
icons.set("clear-night", Skycons.CLEAR_NIGHT);
icons.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
icons.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
icons.set("cloudy", Skycons.CLOUDY);
icons.set("rain", Skycons.RAIN);
icons.set("sleet", Skycons.SLEET);
icons.set("snow", Skycons.SNOW);
icons.set("wind", Skycons.WIND);
icons.set("fog", Skycons.FOG);

icons.play();