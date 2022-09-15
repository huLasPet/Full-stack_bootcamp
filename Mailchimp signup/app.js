const express = require("express");
const https = require("node:https");
const client = require("@mailchimp/mailchimp_marketing");
const app = express();
const mailchimpID = "a232290777";
const mailchimpDC = "us18";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); //To serve static files, path will be relative to this in the .html

//Mailchimpt client config
client.setConfig({
  apiKey: "",
  server: mailchimpDC,
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/submit", (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;

  //Got this from the Mailchimpt API docs
  const addUser = async () => {
    const response = await client.lists.addListMember(mailchimpID, {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
      skipMergeValidation: false,
    });
    res.sendFile(__dirname + "/success.html");
  };
  //If there is some error, go to the fail site
  addUser().catch(() => {
    res.sendFile(__dirname + "/failure.html");
  });
});

app.listen(3000);
