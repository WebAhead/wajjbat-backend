const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user_id: String,
  post_id: [{ type: Schema.Types.ObjectId, ref: 'postsschemas' }],
  comment: String,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('commentsschema', CommentSchema);
