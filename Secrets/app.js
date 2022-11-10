require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
//Switching to bcrypt but leaving it here as an example//
//const sha512 = require("crypto-js/sha512");
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

async function getOneFromDB(email) {
  await mongoose.connect("mongodb://localhost:27017/userDB");
  let oneUser = await UserModel.findOne({ email: email });
  mongoose.connection.close();
  return oneUser;
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

  app
    .route("/login")
    .get((req, res) => {
      res.render("login");
    })
    .post((req, res) => {
      //Hashing the login info from the login form so it can be compared to the saved hash from registration
      const username = req.body.username;
      //Commenting out for now due to bcrypt
      //const password = sha512(req.body.password).toString();
      const password = req.body.password;
      getOneFromDB(username).then((result) => {
        bcrypt.compare(password, result.password, function (err, checkPassed) {
          if (result != null && checkPassed) {
            res.render("secrets");
          } else {
            res.send("No such user");
          }
        });
      });
    });

  app
    .route("/register")
    .get((req, res) => {
      res.render("register");
    })
    .post((req, res) => {
      //saveResult is undefined if the asnyc function does not return anything at the end - returns in the .save() are not enough
      //username/password needs to passed in with sha512 to be hashed, but commenting that out for now due to bcrypt ->
      //-> addToDB((email = req.body.username), (password = sha512(req.body.password))).then((saveResult) =>
      bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        addToDB((email = req.body.username), (password = hash)).then((saveResult) => {
          console.log("Register result:", hash);
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
  main();
}
