const express = require("express");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  let today = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let whatDay = days[today.getDay()];
  res.render("list", { day: whatDay });
});

app.listen(3000);
