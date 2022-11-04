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

async function addToDB(post) {
  let date = customDate.getTheDay(null, 0);
  await mongoose.connect("mongodb://localhost:27017/blogDB");
  let blogPost = new BlogModel({ post: post, date: date });
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

async function getOneFromDB(id) {
  await mongoose.connect("mongodb://localhost:27017/blogDB");
  let onePost = await BlogModel.find({ _id: id });
  mongoose.connection.close();
  return onePost;
}

async function deleteOneFromDB(id) {
  await mongoose.connect("mongodb://localhost:27017/blogDB");
  let deletePost = BlogModel.deleteOne({ _id: id });
  let result = ("Deleted count:", await deletePost);
  mongoose.connection.close();
  return result;
}

async function patchOneInDB(id, post) {
  await mongoose.connect("mongodb://localhost:27017/blogDB");
  let patchPost = await BlogModel.findOneAndUpdate({ _id: id }, { post: post });
  mongoose.connection.close();
}

async function putOneInDB(id, post) {
  await mongoose.connect("mongodb://localhost:27017/blogDB");
  let date = customDate.getTheDay(null, 0);
  let putPost = await BlogModel.findOneAndReplace({ _id: id }, { post: post, date: date });
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
    let post = req.body.blogPost.replace(/<p>|<\/p>/g, "");
    addToDB(post).then(() => {
      res.redirect("/");
    });
  });

  app.get("/blog/:blogid", (req, res) => {
    let blogNumber = req.params.blogid;
    res.render("blogpost", { blogExpanded: blogItems[blogNumber] });
  });

  app.post("/delete/:id", (req, res) => {
    deleteOneFromDB(req.params.id)
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        res.send(err);
      });
  });

  //Can use app.route to specify get/post/put/etc without having to type out the path every time
  app
    .route("/api/posts")
    .get((req, res) => {
      //Get all posts
      getAllFromDB()
        .then(() => {
          res.send(blogItems);
        })
        .catch((err) => {
          console.log(err);
          res.send("Something went wrong.");
        });
    })
    .post((req, res) => {
      //Add a new post
      addToDB(req.query.post).then(() => {
        res.send("Got it.");
      });
    });

  //Can use app.route to specify get/post/put/etc without having to type out the path every time
  app
    .route("/api/one-post")
    .get((req, res) => {
      //Get 1 post with the specified ID
      getOneFromDB(req.query.id)
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          console.log(err);
          res.send("Something went wrong.");
        });
    })
    .delete((req, res) => {
      //Delete 1 post with the specified ID
      deleteOneFromDB(req.query.id)
        .then((result) => {
          if (result.deletedCount === 0) {
            res.send("No item with that id.");
          } else {
            res.send("Done.");
          }
        })
        .catch((err) => {
          res.send(err);
        });
    })
    .patch((req, res) => {
      //Patch or update post
      patchOneInDB(req.query.id, req.query.post).then(() => {
        res.send("Got it.");
      });
    })
    .put((req, res) => {
      //Put or replace post
      putOneInDB(req.query.id, req.query.post).then(() => {
        res.send("Got it.");
      });
    });

  app.listen(3000);
}

if (require.main === module) {
  main();
}
