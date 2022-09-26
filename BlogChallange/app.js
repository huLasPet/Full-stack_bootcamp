const express = require("express");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const homeStartingText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis arcu non enim placerat luctus a a sapien. Pellentesque suscipit, magna id efficitur varius, justo neque aliquam sem, sit amet sollicitudin ipsum mauris ut erat. Nam tempor nisl nulla, ac vulputate odio feugiat eu. Pellentesque sodales justo nec tellus aliquam feugiat. Pellentesque molestie metus feugiat arcu sodales viverra. Praesent posuere, elit at vestibulum volutpat, metus mi condimentum nibh, ac posuere nunc magna sed nisl. Sed sagittis dignissim laoreet. Aenean commodo non libero nec congue. Cras sed volutpat augue, ac semper metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum.";
const aboutText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis facilisis tortor. Duis fermentum cursus convallis. Phasellus et eleifend libero. In at tortor vehicula, porta libero et, rutrum risus. Aliquam ultrices, mauris hendrerit fringilla scelerisque, massa nulla posuere urna, sit amet condimentum est lorem quis dolor. Vestibulum venenatis at ante et porta. Nam fermentum eros id ex pellentesque facilisis. Morbi sed varius dui. Nullam mattis nulla et turpis vestibulum, eget cursus felis mattis. Proin nisi enim, ornare eget eleifend quis, malesuada in neque. Sed faucibus iaculis cursus. Etiam hendrerit pharetra arcu non sagittis. Sed sit amet felis ornare, semper risus.";
const contactText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu nulla egestas, efficitur mi vitae, porttitor ex. Vivamus consequat erat aliquam faucibus elementum. Nunc congue quis lectus nec finibus.";
let blogText = [];
app.get("/", (req, res) => {
  res.render("index", { indexText: homeStartingText, blogText: blogText });
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
  blogText.push(req.body.blogPost);
  res.redirect("/");
});
app.listen(3000);
