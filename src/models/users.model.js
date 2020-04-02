const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_photo: String,
  username: String,
  description: String,
  user_id: Schema.Types.ObjectId
});

module.exports = mongoose.model('usersschemas', UserSchema);
