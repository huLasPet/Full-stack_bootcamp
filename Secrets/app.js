const express = require("express");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Creating the Schema and Model for Mongoose
const SecretsSchema = new mongoose.Schema({
  secret: String,
  user: String,
});
const SecretsModel = mongoose.model("Secret", SecretsSchema);

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const UserModel = mongoose.model("User", UserSchema);

async function getAllFromDB() {
  await mongoose.connect("mongodb://localhost:27017/userDB");
  let allUsers = await UserModel.find();
  mongoose.connection.close();
  return allUsers;
}

async function addToDB(email, password) {
  await mongoose.connect("mongodb://localhost:27017/userDB");
  let newUser = new UserModel({ email: email, password: password });
  //With this it returns true if it saved and returns the error if it didn't - still need to use return result at the end
  let result = await newUser
    .save()
    .then(() => {
      return "True";
    })
    .catch((err) => {
      console.log("Something went wrong: ", err.message);
      return err.message;
    });
  mongoose.connection.close();
  return result;
}

function main() {
  app.get("/", (req, res) => {
    res.render("home");
  });

  app.get("/login", (req, res) => {
    res.render("login");
  });

  app
    .route("/register")
    .get((req, res) => {
      res.render("register");
    })
    .post((req, res) => {
      //saveResult is undefined if the asnyc function does not return anything
      addToDB(req.body.username, req.body.password).then((saveResult) => {
        if (saveResult != "True") {
          res.send("Failed to register: ", saveResult);
        } else {
          res.redirect("/");
        }
      });
    });

  app.listen(3000);
}

if (require.main === module) {
  main();
}
