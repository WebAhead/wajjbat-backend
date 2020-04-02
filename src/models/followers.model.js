const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowersSchema = new Schema({
  follower_id: [{ type: Schema.Types.ObjectId, ref: 'usersschemas' }],
  followed_id: [{ type: Schema.Types.ObjectId, ref: 'usersschemas' }]
});

module.exports = mongoose.model('followersschema', FollowersSchema);
