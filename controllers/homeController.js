var router = require('express').Router();
var fs = require('fs');
var data = require('../helpers/data');
var filters = require('../helpers/filters');
var Post = require('../models/Post');

router.get(['/', '/index'], function(req, res) {
  Post.find().exec(function(err, posts) {
    res.render('index.html', { posts: posts });
  });
});

router.get('/synopsis/:name', function(req, res) {
  var name = req.params.name;

  Post.find({synopsis:name}).exec(function(err, posts) {
    res.render('index.html', { posts : posts });
  });

});

module.exports = router;

