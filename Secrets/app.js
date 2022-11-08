const express = require("express");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

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
const secret = "some plain text secret here, very secure";
UserSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });

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
      const username = req.body.username;
      const password = req.body.password;
      getOneFromDB(username).then((result) => {
        if (result != null && result.password === password) {
          res.render("secrets");
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
      //saveResult is undefined if the asnyc function does not return anything at the end - returns in the .save() are not enough
      addToDB(req.body.username, req.body.password).then((saveResult) => {
        if (saveResult != "True") {
          res.send("Failed to register: ", saveResult);
        } else {
          res.render("secrets");
        }
      });
    });

  app.listen(3000);
}

if (require.main === module) {
  main();
}
