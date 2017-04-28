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

  router.delete('/:id', function (req, res){
  const id = req.params.id;
  const postId = req.params.postId;

  Comment
    .findById(id)
    .then(function (comment){ return comment.destroy()})
    .then(function (){ res.redirect(`/posts/${postId}`)});
})

module.exports = router;
