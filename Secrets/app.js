require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
//Adding encryption using mongoose-encrypt, only encrypting the password so can still search based on e-mail
UserSchema.plugin(encrypt, { secret: process.env.SECRETS_PROJECT_SECRET, encryptedFields: ["password"] });

const UserModel = mongoose.model("User", UserSchema);

async function getOneFromDB(username) {
  if (mongoose.connection.readyState != 1) {
    console.log("Connecting to DB");
    await mongoose.connect("mongodb://localhost:27017/userDB");
  }
  let oneUser = await UserModel.findOne({ email: username });
  return oneUser;
}

async function addToDB(email, password) {
  if (mongoose.connection.readyState != 1) {
    console.log("Connecting to DB");
    await mongoose.connect("mongodb://localhost:27017/userDB");
  }
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
  return result;
}

function main() {
  app.get("/", (req, res) => {
    res.render("home");
  });

  app
    .route("/login")
    .get((req, res) => {
      res.render("login");
    })
    .post((req, res) => {
      getOneFromDB(req.body.username).then((result) => {
        if (result != null) {
          bcrypt.compare(req.body.password, result.password).then((checkPassed) => {
            if (checkPassed) {
              res.render("secrets");
            }
          });
        } else {
          res.send("No such user");
        }
      });
    });

  app
    .route("/register")
    .get((req, res) => {
      res.render("register");
    })
    .post((req, res) => {
      bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        //saveResult is undefined if the asnyc function does not return anything at the end - returns in the .save() are not enough
        addToDB((email = req.body.username), (password = hash)).then((saveResult) => {
          if (saveResult != "True") {
            res.send("Failed to register: ", saveResult);
          } else {
            res.render("secrets");
          }
        });
      });
    });

  app.listen(3000);
}

if (require.main === module) {
  mongoose.connect("mongodb://localhost:27017/userDB");
  main();
}
