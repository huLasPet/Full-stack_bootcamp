const express = require("express");
const https = require("node:https");
const app = express();
const apiKey = "&appid=";
const weatherEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
let celsiusOrNot;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/city", (req, res) => {
  let city = "q=" + req.body.city;
  let units = "&units=" + req.body.metric;
  if (req.body.metric == "Metric") {
    celsiusOrNot = "C";
  } else {
    celsiusOrNot = "F";
  }
  let url = weatherEndpoint + city + apiKey + units;
  https.get(url, (response) => {
    response.on("data", (d) => {
      let weather = JSON.parse(d);
      let weatherIcon = "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@4x.png";
      res.write("<h1>It is currently " + weather.main.temp + celsiusOrNot + " in " + city.slice(2) + ".</h1>");
      res.write("<p>The weather description currently: " + weather.weather[0].description + "</p>");
      res.write("<img src=" + weatherIcon + ">");
      res.send();
    });
  });
});

app.listen(3000, () => console.log("Server started on port 3000."));
