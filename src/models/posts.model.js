const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodTags = [
  "sweet",
  "sour",
  "salt",
  "bitter",
  "hot",
  "cold",
  "bevrage",
  "halal",
  "vegan",
  "kosher",
  "spicy",
];

const NewPostSchema = new Schema({
  title: String,
  caption: String,
  img_url: String,
  howmanypeople: Number,
  difficulty: [
    {
      type: String,
      easy: String,
      medium: String,
      hard: String,
    },
  ],
  ingredients: Object,
  howtoprepare: [String],
  timetoprepare: Number,
  tags: Object,

  user_id: String ,
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("postsschemas", NewPostSchema);
