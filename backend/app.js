const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const routes = require("./routes/posts");

//Node Package to construct Path to backend Images
const path = require("path");


//Connect to MongoDB Database
mongoose
  .connect(
    // "Paste you MongoDB Connection String",
    "mongodb+srv://guru:FJlIXNHRBpVb8iM8@cluster0.b7qnq.mongodb.net/test?retryWrites=true&w=majority",
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
//const Product = require("./models/post");

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

//To Access Local Images
app.use("/images", express.static(path.join("backend/images")));

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

app.use("/api/posts", routes);

module.exports = app;
