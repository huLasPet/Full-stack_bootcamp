require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

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
UserSchema.plugin(passportLocalMongoose);

const UserModel = mongoose.model("User", UserSchema);
passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

async function addToDB(email, password) {
  if (mongoose.connection.readyState != 1) {
    await mongoose.connect("mongodb://localhost:27017/userDB");
  }
  let result = await UserModel.register(new UserModel({ username: email }), password)
    .then(() => {
      return "True";
    })
    .catch((err) => {
      return err;
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
    .post(passport.authenticate("local", { failureRedirect: "/login" }), function (req, res) {
      res.render("secrets");
    });

  app.route("/logout").get((req, res) => {
    req.logout((err) => {
      if (!err) {
        res.redirect("/");
      } else {
        res.send(err);
      }
    });
  });

  app
    .route("/register")
    .get((req, res) => {
      res.render("register");
    })
    .post((req, res) => {
      addToDB((email = req.body.username), (password = req.body.password)).then((saveResult) => {
        if (saveResult != "True") {
          res.send(saveResult.message);
        } else {
          res.render("secrets");
        }
      });
    });

  app.listen(3000);
}

if (require.main === module) {
  mongoose.connect("mongodb://localhost:27017/userDB");
  main();
}
