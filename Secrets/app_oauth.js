require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Creating the Schema and Model for Mongoose, adding plugins
const SecretsSchema = new mongoose.Schema({
  secret: String,
  user: String,
});
const SecretsModel = mongoose.model("Secret", SecretsSchema);

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
});
UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

const UserModel = mongoose.model("User", UserSchema);

//Passport setup for Google OAuth2 - uses the already created UserModel for Mongo
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      UserModel.findOrCreate({ email: profile.emails[0].value, googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

//Local passport strategy
passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

//Function to add a new user to the DB
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
  //Home route
  app.get("/", (req, res) => {
    res.render("home");
  });
  //Login route
  app
    .route("/login")
    .get((req, res) => {
      res.render("login");
    })
    .post(passport.authenticate("local", { failureRedirect: "/login" }), function (req, res) {
      res.render("secrets");
    });
  //Logout route
  app.route("/logout").get((req, res) => {
    req.logout((err) => {
      if (!err) {
        res.redirect("/");
      } else {
        res.send(err);
      }
    });
  });
  //Registration route
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

  //Google OAuth2
  app.route("/auth/google").get(passport.authenticate("google", { scope: ["profile", "email"] }));
  app.route("/auth/google/callback").get(passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
    res.render("secrets");
  });

  app.listen(3000);
}

if (require.main === module) {
  mongoose.connect("mongodb://localhost:27017/userDB");
  main();
}
