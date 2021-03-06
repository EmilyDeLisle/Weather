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

function getCity(lati, long) {
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

function getWeather(lati, long) {
	let locationData = { latitude: lati, longitude: long };
	$.ajax({
		url: "/weather",
		dataType: "json",
		type: "GET",
		data: locationData,
		success: function(forecast){
			// console.log(forecast);
			currentWeather = forecast.currently.icon;
			tempF = Math.round(forecast.currently.temperature);
			$("#temperature").html("<span id='tempDisplay'>" + tempF + "</span> &deg;<span id='convert'>F</span>");
			$("canvas").removeClass("show");
			$("canvas").addClass("hide");

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

			for(var i = 0; i < weather.length; i++){
				if(currentWeather === weather[i].icon){
					$("#weatherDisplay").html(weather[i].text);
					$("#" + weather[i].icon).addClass("show");
					$("body").addClass(weather[i].icon);
					}
			}
		},
		error: function(error) {
			console.log(error);
		}
	});
}

if (navigator.geolocation) {
  	navigator.geolocation.getCurrentPosition(function(position) {
	    lat = position.coords.latitude.toFixed(4);
	    lon = position.coords.longitude.toFixed(4);
	    getCity(lat, lon);
	    getWeather(lat, lon);
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