const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  user_id: String,
  post_id: [{ type: Schema.Types.ObjectId, ref: 'postsschemas' }]
});

module.exports = mongoose.model('likesschemas', LikeSchema);
