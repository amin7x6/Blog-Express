const express = require("express");
const router = express.Router();
const comments = require('./comments');

const Post = require('../models/index').Post;
// const {Post} = require('../models/index');

router.get('/', function(req, res, next) {
  Post
    .findAll({order: [['createdAt', 'DESC'], ['updatedAt', 'DESC']] })
    .then(function(posts) {
        res.render('posts/index', { posts: posts });
  })
})

router.get('/new', function(req, res){
  const post = Post.build();

  res.render('posts/new', {post: post})
})

router.post('/', function(req, res){
  const postParams = {};
  const {title, description} = req.body;

  Post
    .create({title: title, description: description })
    .then(function (post){
      res.redirect('/posts');
    })
})

router.delete('/:id', function (req, res){
  const id = req.params.id;
  Post
    .findById(id)
    .then(function (post){ return post.destroy()})
    .then(function(){ res.redirect('/posts') });
})

router.get('/:id/edit', function (req, res) {
  const id = req.params.id;

  Post
    .findById(id)
    .then(function (post) {
      res.render('posts/edit', {post: post})
    })
})


router.patch('/:id', function (req,res, next){
  const id = req.params.id;

  Post
    .findById(id)
    .then(function (post){
      return post.update(
        {title: req.body.title, description: req.body.description}
      );
    })
    .then(function (post) {
      res.redirect(`/posts/${id}`);
    })
    .catch(function (err) { next(err) })
})


router.get('/:id', function (req, res){
  const id = req.params.id

  Post
    .findById(id)
    .then(function (post) {
      return Promise.all([
        post,
         post.getComments({order: [['createdAt', 'DESC']]})
       ])
    })
    .then(function ([post, comments]) {
      res.render('posts/show', {post: post, comments: comments})
    })
})

router.use('/:postId/comments', comments);

module.exports = router;
