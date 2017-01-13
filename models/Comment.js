var db = require('../config/db');
var Post = require('./Post');

var Schema = db.Schema;

var commentSchema = new Schema({
  pseudo: 'String',
  comment: 'String',
  post: { type: Schema.Types.ObjectId, ref: 'Post'}
});

var Comment = db.model('Comment', commentSchema);

module.exports = Comment;
