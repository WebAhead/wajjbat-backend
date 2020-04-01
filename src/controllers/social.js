const socialController = module.exports = {};
const Posts = require('../models/posts.model');

socialController.addPost = (req, res) => {
  const myPosts = new Posts({
    title: req.body.title,
    caption: req.body.caption,
    howmanypeople: req.body.howmanypeople,
    difficulty: req.body.difficulty,
    ingredients: req.body.ingredients,
    howtoprepare: req.body.howtoprepare,
    timetoprepare: req.body.timetoprepare,
    tags: req.body.tags
  });

  myPosts
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
};
