const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("index"));
app.get("/about", (req, res) => res.send("about"));
app.listen(3000, () => console.log("Server up, listening on port 3000"));
