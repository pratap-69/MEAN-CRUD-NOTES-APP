const express = require("express");
const Post = require("../models/post");
const router = express.Router();

const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "images/jpg": "jpg",
};

//Multer Configuration
//Multer adds a body object and a file or files object to the request object.
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    //Extra Security Layer -> Invalid MIME Type
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    callback(error, "backend/images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE_MAP[file.mimetype];
    callback(null, name + "-" + Date.now() + "." + extension);
  },
});

router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    //const post = req.body;
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename,
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
        post: {
          id: response._id,
          // ...response
          title: response.title,
          content: response.content,
          imagePath: response.imagePath,
        },
      });
    });
  }
);

router.get("", (req, res, next) => {
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

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Id not found" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  //console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Post Deleted!",
    });
  });
});

router.put(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    console.log(req.file);
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const post = new Post({
      _id: req.body._id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath
    });
    console.log(post);
    Post.updateOne({ _id: req.body.id }, post).then((result) => {
      //console.log(result);
      res.status(200).json({
        message: "Post Updated Successfully",
        data: result,
      });
    });
  }
);

module.exports = router;
