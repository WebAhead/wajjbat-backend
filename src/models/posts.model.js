const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodTags = [
  'sweet',
  'sour',
  'salt',
  'bitter',
  'hot',
  'cold',
  'bevrage',
  'halal',
  'vegan',
  'kosher',
  'spicy'
];

const NewPostSchema = new Schema({
  title: String,
  caption: String,
  howmanypeople: Number,
  difficulty: [
    {
      type: String,
      easy: String,
      medium: String,
      hard: String
    }
  ],
  ingredients: String,
  howtoprepare: String,
  timetoprepare: Number,
  tags: [{
    type: String,
    enum: foodTags
  }],
  user_id: [{ type: Schema.Types.ObjectId, ref: 'usersschemas' }],
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('postsschemas', NewPostSchema);
