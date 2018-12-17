const express = require("express");
const app = express();
const fs = require("fs");
const { JSDOM } = require('jsdom');
const request = require("request");
const PORT = process.env.PORT || 5000

app.use("/assets", express.static("assets"));

// request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }, (err, res, body) => {
//   if (err) { return console.log(err); }
//   console.log(body.url);
//   console.log(body.explanation);
// });

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

  // let googleURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "%2C" + lon + "&language=en&result_type=locality&key=AIzaSyCYWInciWRsAfcd49UlboD0gj9id7KjYSc";

  let options = {
    url: googleURL
  }

  let payload = "Dunno";

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