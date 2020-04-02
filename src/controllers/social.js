const socialController = module.exports = {};
const Posts = require('../models/posts.model');
const FavoritePosts = require('../models/favorites.model');
const CreateUserPosts = require('../models/users.model');
const Followers = require('../models/followers.model');
const Likes = require('../models/likes.model');
const Comment = require('../models/comment.models');

const mongoose = require('mongoose');

socialController.addPost = (req, res) => {
  const myPosts = new Posts({
    title: req.body.title,
    caption: req.body.caption,
    howmanypeople: req.body.howmanypeople,
    difficulty: req.body.difficulty,
    ingredients: req.body.ingredients,
    howtoprepare: req.body.howtoprepare,
    timetoprepare: req.body.timetoprepare,
    tags: req.body.tags,
    user_id: mongoose.Types.ObjectId(req.body.user_id)
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

socialController.FavoritePosts = (req, res) => {
  const myFavoritePost = new FavoritePosts({
    user_id: mongoose.Types.ObjectId(req.body.user_id),
    post_id: mongoose.Types.ObjectId(req.body.post_id)
  });

  myFavoritePost
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
};

socialController.CreateUserPosts = (req, res) => {
  const myUsersPost = new CreateUserPosts({
    user_photo: req.body.user_photo,
    username: req.body.username,
    description: req.body.description
  });

  myUsersPost
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
};

socialController.Followers = (req, res) => {
  const myFollowers = new Followers({
    follower_id: mongoose.Types.ObjectId(req.body.follower_id),
    followed_id: mongoose.Types.ObjectId(req.body.followed_id)
  });

  myFollowers
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
};

socialController.Likes = (req, res) => {
  const myLikes = new Likes({
    user_id: mongoose.Types.ObjectId(req.body.user_id),
    post_id: mongoose.Types.ObjectId(req.body.post_id)
  });

  myLikes
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
};

socialController.Comment = (req, res) => {
  const myComment = new Comment({
    user_id: mongoose.Types.ObjectId(req.body.user_id),
    post_id: mongoose.Types.ObjectId(req.body.post_id),
    comment: req.body.comment
  });

  myComment
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
};
