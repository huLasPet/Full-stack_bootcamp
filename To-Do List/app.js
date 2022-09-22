const express = require("express");
const ejs = require("ejs");
const customDate = require("./date");
const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let toDoList = ["Food", "More food", "Fooooood"];

app.get("/", (req, res) => {
  res.render("list", { day: customDate.getTheDay(), toDoList: toDoList });
});

app.post("/", (req, res) => {
  toDoList.push(req.body.newToDo);
  res.redirect("/");
});

app.listen(3000);
