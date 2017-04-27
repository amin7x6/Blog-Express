const express = require("express");
const router = express.Router({mergeParams: true});

const Models = require('../models/index');
// const {Post} = require('../models/index');
const Post = Models.Post;
const Comment = Models.Comment;

router.post('/', function(req, res) {
  const postId = req.params.postId;

  Comment
    .create({content: req.body.content, PostId: postId})
    .then(function() { res.redirect(`/posts/${postId}`)});
  })

module.exports = router;
