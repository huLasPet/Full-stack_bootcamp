const express = require("express");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let toDoList = ["Food", "More food", "Fooooood"];

function getTheDay() {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let whatDay = today.toLocaleDateString("en-GB", options);
  return whatDay;
}

app.get("/", (req, res) => {
  res.render("list", { day: getTheDay(), toDoList: toDoList });
});

app.post("/", (req, res) => {
  toDoList.push(req.body.newToDo);
  res.redirect("/");
});

app.listen(3000);
