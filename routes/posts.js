const express = require("express");
const router = express.Router();

const Post = require('../models/index').Post;
// const {Post} = require('../models/index');

router.get('/', function(req, res, next) {
  Post
    .findAll()
    .then(function(posts) {
        res.render('posts/index', { posts: posts });
  })

})

module.exports = router;
