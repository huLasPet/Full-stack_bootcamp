const express = require("express");
const https = require("node:https");
const app = express();
const apiKey = "&appid=1234";
const units = "&units=metric";
const weatherEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
let city = "q=Budapest";
let url = weatherEndpoint + city + apiKey + units;
let weather;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  https.get(url, (response) => {
    response.on("data", (d) => {
      weather = JSON.parse(d);
      let weatherIcon = "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@4x.png";
      console.log(weatherIcon);
      res.write("<h1>It is currently " + weather.main.temp + " C in " + city.slice(2) + ".</h1>");
      res.write("<p>The weather description currently: " + weather.weather[0].description + "</p>");
      res.write("<img src=" + weatherIcon + ">");
      res.send();
    });
  });
});

app.listen(3000, () => console.log("Server started on port 3000."));
