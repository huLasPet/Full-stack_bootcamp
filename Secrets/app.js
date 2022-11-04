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
const SecretsModel = mongoose.model("Secrets", SecretsSchema);

function main() {
  app.get("/", (req, res) => {
    res.render("home");
  });

  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.get("/register", (req, res) => {
    res.render("register");
  });

  app.listen(3000);
}

if (require.main === module) {
  main();
}
