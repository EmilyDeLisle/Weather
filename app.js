const express = require("express");
const app = express();
const fs = require("fs");
const { JSDOM } = require('jsdom');
const request = require("request");

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

// var myURL = "https://api.github.com/users/jim-parry/repos";

// app.get('/', function(req, res){

//     let payload = "didn't change!";
//     let options = {
//       url: myURL,
//       headers: {
//         'User-Agent': 'request',
//         'Content-Type': 'application/json',
//       }
//     }
//     request(options, function(err, re, body) {
//         if(err) {
//           console.log(err);
//         }
//         payload = body;
//         //console.log(res.header);
//         res.setHeader("Content-Type", "application/json");
//         res.send(payload);
//     });

// });



let port = 8000;

app.listen(port, function() {
  console.log("App listening on port " + port);
});