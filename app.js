//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { forEach, lowerCase } = require("lodash");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
res = app.get;

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017/blog";
mongoose.connect("mongodb://localhost:27017/blog");


const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const post = {
  title: String,
  text: String,
  link: String,
};

const postModel = mongoose.model("posts", post);

const postDemo1 = new postModel({
  title: "Demo",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fug",
  link: "demo",
});
const postDemo2 = new postModel({
  title: "Demo2",
  text: "Demo",
  link: "demo",
});

let postData = [postDemo1, postDemo2];
app.get("/", function (req, res) {
  postModel.find({}).then(function (foundPost) {
    if (foundPost.length === 0){
      postModel.insertMany(postData).then(function(){
        console.log("Successfully");
      }).catch(function(err){
        console.log(err);
      });
      res.redirect("/");
    };
    res.render("home", {post: foundPost});
  });
  
});

app.get("/post/:posting", function (req, res) {
  const name = req.params.posting;
  postModel.findOne({link: name }).then(function(result){
    res.render("post", {post: result});
    console.log(result);
  });
});
app.post("/compose", function (req, res) {
  const link = lowerCase(req.body.postTitle);
  const post = {
    title: req.body.postTitle,
    text: req.body.postText,
    link: link,
  };
  posting = new postModel(post);
  posting.save()
  res.redirect("/");
});
app.get("/about", function (req, res) {
  res.render("about", { content: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { content: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});



app.listen(3000, function () {
  console.log("Server started on port 3000");
});
