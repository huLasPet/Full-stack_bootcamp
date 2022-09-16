const express = require("express");
const client = require("@mailchimp/mailchimp_marketing");
const app = express();
const mailchimpID = "";
const mailchimpDC = "";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//To serve static files, path will be relative to this in the .html
app.use(express.static("public"));

//Mailchimpt client config
client.setConfig({
  apiKey: "",
  server: mailchimpDC,
});

//Signup page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//Add person to the list with the info from the signup page
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
