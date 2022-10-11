const express = require("express");
const ejs = require("ejs");
const customDate = require("./date");
const mongoose = require("mongoose");

//Setting up the app
const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Creating the Schema and Model for Mongoose
const toDoSchema = new mongoose.Schema({
  todo: String,
  date: String,
});
const toDoModel = mongoose.model("ToDo", toDoSchema);

//Create the list to hold the items from the DB
let toDoList = [];

//Connect to the DB and add a new ToDo item from req
async function addToDB(req) {
  await mongoose.connect("mongodb://localhost:27017/todoDB");
  let toDoItem = new toDoModel({ todo: req.body.newToDo, date: customDate.getTheDay() });
  await toDoItem.save();
  mongoose.connection.close();
}

//Remove item from the DB
async function removeFromDB(req) {
  await mongoose.connect("mongodb://localhost:27017/todoDB");
  let removeItem = toDoModel.deleteOne({ _id: req.body.remove });
  await removeItem;
  mongoose.connection.close();
}

//Get all ToDos from the DB
async function getFromDB() {
  await mongoose.connect("mongodb://localhost:27017/todoDB");
  toDoList.length = 0;
  let allToDos = await toDoModel.find();
  allToDos.forEach((element) => {
    toDoList.push(element);
  });
  mongoose.connection.close();
}

function main() {
  app.get("/", async (req, res) => {
    //Get data from the DB, if that was successful THEN call the anonym function to render the page
    //.then({success}, {reject}) is the full but there is no reject here
    getFromDB().then(() => {
      res.render("list", { day: customDate.getTheDay(), toDoList: toDoList });
    });
  });

  app.post("/", async (req, res) => {
    //Add the data to the DB and when that is done THEN call the redirect
    //Nothing on reject here either
    if (req.body.remove != undefined) {
      removeFromDB(req)
        .then(() => {
          res.redirect("/");
        })
        .catch(() => {
          res.redirect("/");
        });
    } else {
      addToDB(req).then(() => {
        res.redirect("/");
      });
    }
  });

  app.listen(3000);
}

main();
