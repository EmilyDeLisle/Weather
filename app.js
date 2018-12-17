const express = require("express");
const app = express();
const fs = require("fs");
const { JSDOM } = require('jsdom');
const request = require("request");
const PORT = process.env.PORT || 5000

app.use("/assets", express.static("assets"));

app.get("/", function (req, res) {
  let doc = fs.readFileSync("index.html");
  let dom = new JSDOM(doc);
  res.send(dom.serialize());
});

app.get("/geocoding", function(req, res) {

  let lon = req['query']['longitude'];
  let lat = req['query']['latitude'];
  let key = process.env.GOOGLE_API_KEY;

  let googleURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "%2C" + lon + "&language=en&result_type=locality&key=" + key;

  let options = {
    url: googleURL
  }

  let payload = "";

  request(options, function(err, re, body) {
    if(err) {
      console.log(err);
    }
    payload = body;
    res.send(payload);
  });
});

app.get("/weather", function(req, res) {

  let lon = req['query']['longitude'];
  let lat = req['query']['latitude'];
  let key = process.env.DARK_SKY_API_KEY;

  let darkskyURL = "https://api.darksky.net/forecast/" + key + "/" + lat + "," + lon;

  let options = {
    url: darkskyURL,
    headers: {"Access-Control-Allow-Origin": "true"},
    type: "GET",
    contentType: "application/json",
    dataType: "jsonp"
  }

  let payload = "";

  request(options, function(err, re, body) {
    if(err) {
      console.log(err);
    }
    payload = body;
    res.send(payload);
  });
});

app.listen(PORT, function() {
  console.log("App listening on port " + PORT);
});