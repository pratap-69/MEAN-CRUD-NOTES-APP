const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

//Connect to MongoDB Database
mongoose
  .connect(
    "Paste you MongoDB Connection String",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch(() => {
    console.log("Connection Failed!");
  });

//Mongoose Model
const Post = require("./models/post");
const Product = require("./models/post");

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  //console.log("First Middleware");
  //add CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  //const post = req.body;

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  // const product = new Product({
  //   title: req.body.title,
  //   content: req.body.content
  // });

  console.log(post);
  //console.log(product);
  post.save().then((response) => {
    console.log(response);
    res.status(200).json({
      CreatedPostId: response._id,
      message: "Post Added Successfully!",
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  // const posts = [
  //   {
  //     id: "id1",
  //     title: "harry potter",
  //     content: "fiction",
  //   },
  //   {
  //     id: "id2",
  //     title: "harry potter 2",
  //     content: "fiction",
  //   },
  //   {
  //     id: "id3",
  //     title: "harry potter 3",
  //     content: "fiction",
  //   },
  // ];
  Post.find().then((documents) => {
    //console.log(documents);
    res.status(200).json({
      message: "Posts Fetched Successfully!",
      data: documents,
    });
  });
  //res.send("Hello from Express");
  //next();
});

app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Id not found" });
    }
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  //console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Post Deleted!",
    });
  });
});

app.put("/api/posts", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });

  Post.updateOne({ _id: req.body.id }, post).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Post Updated Successfully",
      data: result,
    });
  });
});



module.exports = app;
