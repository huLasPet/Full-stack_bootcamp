const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Addition calculator part
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => {
  let num1 = Number(req.body.num1);
  let num2 = Number(req.body.num2);
  let resultAddition = num1 + num2;
  res.send("Result is " + resultAddition);
});

//BMI part
app.get("/bmi", (req, res) => {
  res.sendFile(__dirname + "/bmiCalculator.html");
});
app.post("/bmi", (req, res) => {
  let weight = parseFloat(req.body.weight);
  let height = parseFloat(req.body.height);
  let bmi = (weight / height / height) * 10000;
  res.send("Your BMI is " + bmi.toFixed(2));
});

app.listen(3000);
