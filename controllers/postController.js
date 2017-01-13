var router = require('express').Router();
var fs = require('fs');
var bodyParser = require('body-parser');
var data = require('../helpers/data');
var filters = require('../helpers/filters');
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime');
var Post = require('../models/Post');
var Comment = require('../models/Comment');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/imgs');
  },
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(err, raw.toString('hex') + '.' + mime.extension(file.mimetype));
    });
  }
});
var upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    var extensions = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];
    var ext = mime.extension(file.mimetype);
    if(extensions.indexOf(ext) != -1) {
      cb(null, true);
    }else {
      cb(new Error('Fichier incorrect'));
    }
  }
}).single('picture');

var parser = bodyParser.urlencoded({extended: false});

router.get('/:id', function(req, res) {
  var idPost = req.params.id;

  Post.findById(idPost).populate('comments').exec(function(err, post) {
    res.render('detail.html', { post: post });
  });

});

router.post('/:id', parser, function(req, res) {
  var idPost = req.params.id;
  var pseudo = req.body.pseudo;
  var comment = req.body.comment;

  var c = Comment({
    post: idPost,
    pseudo: pseudo,
    comment: comment
  }).save(function(err, comment) {
    Post.findById(idPost, function(err, post) {
      post.comments.push(comment.id);
      post.save(function(err, postSaved) {
        res.redirect('/post/'+idPost);
      });
    });
  });
  /*Post.findById(idPost, function(err, post) {
    post.comments.push(idPost);
    post.save(function(err, postSaved) {

    });
  });*/

});

router.get('/', function(req, res) {
  res.render('post.html');
});

router.post('/', function(req, res) {

  upload(req, res, function(err) {

    if(err) {
      return res.render('post.html', { error: err.message});
    }

    var title = req.body.title;
    var realisateur = req.body.realisateur;
    var category = req.body.category;

    var post = {
      title: title,
      realisateur: realisateur,
      category: category,
      picture: req.file.path
    }

    var p = new Post(post);

    p.save(function(err, postSaved) {
      res.redirect('/');
    });
  });
});

module.exports = router;
