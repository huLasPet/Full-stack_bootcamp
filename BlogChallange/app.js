const express = require("express");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");
const customDate = require("./date");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Creating the Schema and Model for Mongoose
const BlogSchema = new mongoose.Schema({
  post: String,
  date: String,
});
const BlogModel = mongoose.model("Blog", BlogSchema);

//Create the list to hold the items from the DB
let blogItems = [];

const homeStartingText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis arcu non enim placerat luctus a a sapien. Pellentesque suscipit, magna id efficitur varius, justo neque aliquam sem, sit amet sollicitudin ipsum mauris ut erat. Nam tempor nisl nulla, ac vulputate odio feugiat eu. Pellentesque sodales justo nec tellus aliquam feugiat. Pellentesque molestie metus feugiat arcu sodales viverra. Praesent posuere, elit at vestibulum volutpat, metus mi condimentum nibh, ac posuere nunc magna sed nisl. Sed sagittis dignissim laoreet. Aenean commodo non libero nec congue. Cras sed volutpat augue, ac semper metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum.";
const aboutText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis facilisis tortor. Duis fermentum cursus convallis. Phasellus et eleifend libero. In at tortor vehicula, porta libero et, rutrum risus. Aliquam ultrices, mauris hendrerit fringilla scelerisque, massa nulla posuere urna, sit amet condimentum est lorem quis dolor. Vestibulum venenatis at ante et porta. Nam fermentum eros id ex pellentesque facilisis. Morbi sed varius dui. Nullam mattis nulla et turpis vestibulum, eget cursus felis mattis. Proin nisi enim, ornare eget eleifend quis, malesuada in neque. Sed faucibus iaculis cursus. Etiam hendrerit pharetra arcu non sagittis. Sed sit amet felis ornare, semper risus.";
const contactText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu nulla egestas, efficitur mi vitae, porttitor ex. Vivamus consequat erat aliquam faucibus elementum. Nunc congue quis lectus nec finibus.";

async function addToDB(req) {
  let date = customDate.getTheDay(null, 0);
  await mongoose.connect("mongodb://localhost:27017/blogDB");
  let blogPost = new BlogModel({ post: req.body.blogPost.replace(/<p>|<\/p>/g, ""), date: date });
  await blogPost.save();
  mongoose.connection.close();
}

async function getAllFromDB() {
  await mongoose.connect("mongodb://localhost:27017/blogDB");
  blogItems.length = 0;
  let allPosts = await BlogModel.find();
  allPosts.forEach((element) => {
    blogItems.push(element);
  });
  mongoose.connection.close();
}

function main() {
  app.get("/", (req, res) => {
    getAllFromDB().then(() => {
      res.render("index", { indexText: homeStartingText, blogItems: blogItems });
    });
  });

  app.get("/about", (req, res) => {
    res.render("about", { aboutText: aboutText });
  });

  app.get("/contact", (req, res) => {
    res.render("contact", { contactText: contactText });
  });

  app.get("/compose", (req, res) => {
    res.render("newblogpost");
  });

  app.post("/", (req, res) => {
    addToDB(req).then(() => {
      res.redirect("/");
    });
  });

  app.get("/blog/:blogid", (req, res) => {
    let blogNumber = req.params.blogid;
    res.render("blogpost", { blogExpanded: blogItems[blogNumber] });
  });
  app.listen(3000);
}

main();
