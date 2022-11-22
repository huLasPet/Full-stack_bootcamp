require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Creating the Schema and Model for Mongoose, adding plugins
const SecretsSchema = new mongoose.Schema({
  secret: String,
});
const secretsModel = mongoose.model("Secret", SecretsSchema);

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  googleId: String,
});
UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);
const userModel = mongoose.model("User", UserSchema);

//Local passport strategy
passport.use(userModel.createStrategy());

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
      userModel.findOrCreate({ username: profile.emails[0].value, googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

//Function to add a new user to the DB if Google login is not used
async function addToUserDB(username, password) {
  if (mongoose.connection.readyState != 1) {
    await mongoose.connect("mongodb://localhost:27017/userDB");
  }
  let result = await userModel
    .register(new userModel({ username: username }), password)
    .then(() => {
      return "True";
    })
    .catch((err) => {
      return err;
    });
  return result;
}

//Function to add a Secret to the DB
async function addToSecretsDB(secret) {
  if (mongoose.connection.readyState != 1) {
    await mongoose.connect("mongodb://localhost:27017/secretDB");
  }
  let newSecret = new secretsModel({ secret: secret });
  let result = await newSecret
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
      res.redirect("/secrets");
    });

  //Logout route
  app.route("/logout").get((req, res) => {
    req.logout((err) => {
      if (!err) {
        req.session.destroy();
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
      addToUserDB((username = req.body.username), (password = req.body.password)).then((saveResult) => {
        if (saveResult != "True") {
          res.send(saveResult.message);
        } else {
          res.redirect("/secrets");
        }
      });
    });

  //Secrets route
  app.route("/secrets").get(async (req, res) => {
    if (req.isAuthenticated()) {
      let secretsList = [];
      let secretsTemp = await secretsModel.find();
      secretsTemp.forEach((element) => {
        secretsList.push(element.secret);
      });
      res.render("secrets", { secrets: secretsList });
    } else {
      res.redirect("/login");
    }
  });

  //Submit a secret route
  app
    .route("/submit")
    .get((req, res) => {
      if (req.isAuthenticated()) {
        res.render("submit");
      } else {
        res.redirect("/login");
      }
    })
    .post((req, res) => {
      addToSecretsDB(req.body.secret).then((result) => {
        if (result != "True") {
          res.send(result);
        } else {
          res.redirect("/secrets");
        }
      });
    });

  //Google OAuth2
  app.route("/auth/google").get(passport.authenticate("google", { scope: ["profile", "email"] }));
  app
    .route("/auth/google/callback")
    .get(passport.authenticate("google", { failureRedirect: "/login" }), function (req, res) {
      res.redirect("/secrets");
    });

  app.listen(3000);
}

if (require.main === module) {
  mongoose.connect("mongodb://localhost:27017/userDB");
  main();
}
