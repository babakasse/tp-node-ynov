var db = require('../config/db');
var Comment = require('./Comment');

var Schema = db.Schema;

var postSchema = new Schema({
  category: 'String',
  author: 'String',
  picture: 'String',
  title: 'String',
  comments: [{type: Schema.Types.ObjectId, ref:'Comment'}]
});

var Post = db.model('Post', postSchema);

module.exports = Post;
