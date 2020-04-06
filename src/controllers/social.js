const socialController = (module.exports = {});
const Posts = require('../models/posts.model');
const FavoritePosts = require('../models/favorites.model');
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
    user_id: mongoose.Types.ObjectId(req.user.id)
  });

  myPosts
    .save()
    .then(result => {
      res.json({
        status: true
      });
    })
    .catch(err => {
      console.log(err);
    });
};

socialController.favoritePosts = (req, res) => {
  const myFavoritePost = new FavoritePosts({
    user_id: mongoose.Types.ObjectId(req.user.id),
    post_id: mongoose.Types.ObjectId(req.body.post_id)
  });

  myFavoritePost
    .save()
    .then(result => {
      res.json({
        status: true
      });
    })
    .catch(err => {
      console.log(err);
    });
};

socialController.followers = (req, res) => {
  const myFollowers = new Followers({
    follower_id: mongoose.Types.ObjectId(req.user.id),
    followed_id: mongoose.Types.ObjectId(req.body.followed_id)
  });

  myFollowers
    .save()
    .then(result => {
      res.json({
        status: true
      });
    })
    .catch(err => {
      console.log(err);
    });
};

socialController.likes = (req, res) => {
  const myLikes = new Likes({
    user_id: mongoose.Types.ObjectId(req.user.id),
    post_id: mongoose.Types.ObjectId(req.body.post_id)
  });

  myLikes
    .save()
    .then(result => {
      res.json({
        status: true
      });
    })
    .catch(err => {
      console.log(err);
    });
};

socialController.comment = (req, res) => {
  const myComment = new Comment({
    user_id: mongoose.Types.ObjectId(req.user.id),
    post_id: mongoose.Types.ObjectId(req.body.post_id),
    comment: req.body.comment
  });

  myComment
    .save()
    .then(result => {
      res.json({
        status: true
      });
    })
    .catch(err => {
      console.log(err);
    });
};

socialController.getAllPosts = (req, res) => {
  Posts.find((err, result) => {
    if (err) console.log(err);

    res.send(result);
  });
};

socialController.getNPosts = async (req, res) => {
  const usersPosts = await Posts.find({
    user_id: { $ne: mongoose.Types.ObjectId(req.user.id) }
  }).countDocuments();
  const n = Number(req.query.n);
  const display = n > usersPosts ? 0 : usersPosts - n;
  Posts.find({ user_id: { $ne: mongoose.Types.ObjectId(req.user.id) } })
    .skip(display)
    .exec((err, result) => {
      if (err) console.log(err);

      res.send(result);
    });
};

socialController.getComments = (req, res) => {
  Comment.find(
    { post_id: mongoose.Types.ObjectId(req.query.post_id) },
    (err, result) => {
      if (err) console.log(err);

      res.send(result);
    }
  );
};

socialController.getLatestComment = (req, res) => {
  Comment.findOne({ post_id: mongoose.Types.ObjectId(req.query.post_id) })
    .sort({ created_at: -1 })
    .exec((err, result) => {
      if (err) console.log(err);

      res.send(result);
    });
};

socialController.getAllUserPosts = (req, res) => {
  Posts.find(
    { user_id: mongoose.Types.ObjectId(req.user.id) },
    (err, result) => {
      if (err) console.log(err);
      console.log(result);
      res.send(result);
    }
  );
};

socialController.getAllUserFavorites = (req, res) => {
  FavoritePosts.find(
    { user_id: mongoose.Types.ObjectId(req.user.id) },
    (err, result) => {
      if (err) console.log(err);
      console.log(result);
      res.send(result);
    }
  );
};

socialController.getFollowers = (req, res) => {
  Followers.find(
    { follower_id: mongoose.Types.ObjectId(req.user.id) },
    (err, result) => {
      if (err) console.log(err);
      console.log(result);
      res.send(result);
    }
  );
};

socialController.getLikes = (req, res) => {
  Likes.find({ post_id: mongoose.Types.ObjectId(req.query.post_id) })
    .countDocuments()
    .exec((err, result) => {
      if (err) console.log(err);
      console.log(result);
      res.send({ Likes: result });
    });
};

socialController.deletePost = (req, res) => {
  Posts.findOneAndDelete({
    _id: mongoose.Types.ObjectId(req.body.post_id)
  }).exec((err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
  });
};

socialController.unLike = (req, res) => {
  Likes.findOneAndDelete({
    user_id: mongoose.Types.ObjectId(req.body.user_id),
    post_id: mongoose.Types.ObjectId(req.body.post_id)
  }).exec((err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
  });
};

socialController.unFollow = (req, res) => {
  Followers.findOneAndDelete({
    followed_id: mongoose.Types.ObjectId(req.body.user_id),
    follower_id: mongoose.Types.ObjectId(req.body.follower_id)
  }).exec((err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
  });
};

socialController.unFavorite = (req, res) => {
  FavoritePosts.findOneAndDelete({
    user_id: mongoose.Types.ObjectId(req.body.user_id),
    post_id: mongoose.Types.ObjectId(req.body.post_id)
  }).exec((err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
  });
};
