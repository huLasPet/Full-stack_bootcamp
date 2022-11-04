const express = require("express");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

function main() {
  app.get("/", (req, res) => {
    res.render("home");
  });

  app.listen(3000);
}

if (require.main === module) {
  main();
}
