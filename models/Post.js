var db = require('../config/db');
var Comment = require('./Comment');

var Schema = db.Schema;

var postSchema = new Schema({
  titre: 'String',
  realisateur: 'String',
  picture: 'String',
  date_sortie: 'String',
  synopsis: 'String',
  comments: [{type: Schema.Types.ObjectId, ref:'Comment'}]
});

var Post = db.model('Post', postSchema);

module.exports = Post;
