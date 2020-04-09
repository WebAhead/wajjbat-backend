const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowersSchema = new Schema({
  follower_id: String,
  followed_id: String
});

module.exports = mongoose.model('followersschema', FollowersSchema);
