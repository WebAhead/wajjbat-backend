const socialController = (module.exports = {});
const Posts = require("../models/posts.model");
const FavoritePosts = require("../models/favorites.model");
const Followers = require("../models/followers.model");
const Likes = require("../models/likes.model");
const Comment = require("../models/comment.models");
import User from "../queries/User";

const mongoose = require("mongoose");

socialController.addPost = (req, res) => {
  const myPosts = new Posts({
    title: req.body.postTitle,
    caption: req.body.postCaption,
    img_url: req.body.imgURL,
    howmanypeople: req.body.howManyPeople,
    difficulty: req.body.difficulty,
    ingredients: req.body.ingredients,
    howtoprepare: req.body.howToPrepareSteps,
    timetoprepare: req.body.time,
    tags: req.body.foodTags,
    user_id: req.user.id,
  });

  myPosts
    .save()
    .then((result) => {
      res.json({
        status: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

socialController.favoritePosts = (req, res) => {
  const myFavoritePost = new FavoritePosts({
    user_id: req.user.id,
    post_id: mongoose.Types.ObjectId(req.body.post_id),
  });

  myFavoritePost
    .save()
    .then((result) => {
      res.json({
        status: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

socialController.followers = (req, res) => {
  const myFollowers = new Followers({
    follower_id: req.user.id,
    followed_id: req.body.followed_id,
  });

  myFollowers
    .save()
    .then((result) => {
      res.json({
        status: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

socialController.likes = (req, res) => {
  const myLikes = new Likes({
    user_id: req.user.id,
    post_id: mongoose.Types.ObjectId(req.body.post_id),
  });

  myLikes
    .save()
    .then((result) => {
      res.json({
        status: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

socialController.comment = (req, res) => {
  const myComment = new Comment({
    user_id: req.user.id,
    post_id: mongoose.Types.ObjectId(req.body.post_id),
    comment: req.body.comment,
  });

  myComment
    .save()
    .then((result) => {
      res.json({
        status: true,
      });
    })
    .catch((err) => {
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
    user_id: { $ne: req.user.id },
  }).countDocuments();
  const n = Number(req.query.n);
  const display = n > usersPosts ? 0 : usersPosts - n;
  Posts.find({ user_id: { $ne: req.user.id } })
    .skip(display)
    .exec((err, result) => {
      if (err) console.log(err);
      const posts = [];
      if (result.length === 0) {
        res.send(false);
      }
      result.map(async (post, i) => {
        const postInfo = {};
        try {
          const user_info = await User.findById(post.user_id);
          postInfo["user_info"] = { ...user_info[0] };

          await Followers.findOne(
            {
              follower_id: req.user.id,
              followed_id: post.user_id,
            },
            (err, isFollowed) => {
              if (err) console.log(err);
              isFollowed === null ? (isFollowed = false) : (isFollowed = true);
              postInfo["is_followed"] = isFollowed;
            }
          );

          await FavoritePosts.findOne(
            {
              user_id: req.user.id,
              post_id: mongoose.Types.ObjectId(post._id),
            },
            (err, isFavorite) => {
              if (err) console.log(err);
              isFavorite === null ? (isFavorite = false) : (isFavorite = true);
              postInfo["is_favorite"] = isFavorite;
            }
          );

          await Likes.findOne(
            {
              user_id: req.user.id,
              post_id: mongoose.Types.ObjectId(post._id),
            },
            (err, isLiked) => {
              if (err) console.log(err);
              isLiked === null ? (isLiked = false) : (isLiked = true);
              postInfo["is_liked"] = isLiked;
            }
          );

          await Likes.find({
            post_id: mongoose.Types.ObjectId(post._id),
          }).countDocuments((err, likes) => {
            if (err) console.log(err);
            postInfo["post_info"] = { ...post._doc, likes };
          });

          await Comment.findOne(
            { post_id: mongoose.Types.ObjectId(post._id) },
            null,
            { sort: { created_at: -1 } },
            async (err, latestComment) => {
              if (err) console.log(err);

              latestComment
                ? (async () => {
                    const user_info = await User.findById(
                      latestComment.user_id
                    );

                    postInfo["latest_comment"] = [
                      {
                        user_info: { ...user_info[0] },
                        ...latestComment._doc,
                      },
                    ];
                    posts.push(postInfo);
                    if (result.length <= i + 1) {
                      posts.length === 0 ? res.send(false) : res.send(posts);
                    }
                  })()
                : () => {
                    postInfo["latest_comment"] = false;
                    posts.push(postInfo);
                    if (result.length <= i + 1) {
                      posts.length === 0 ? res.send(false) : res.send(posts);
                    }
                  };
            }
          );
        } catch (error) {
          console.log(error);
          if (result.length <= i + 1) {
            posts.length === 0 ? res.send(false) : res.send(posts);
          }
        }
      });
    });
};
socialController.getProfile = async (req, res) => {
  const profile = {};

  const user_info = await User.findById(req.user.id);
  profile["user_info"] = { ...user_info[0] };

  await Followers.find({ followed_id: req.user.id })
    .countDocuments()
    .exec(async (err, followers) => {
      if (err) console.log(err);
      profile["followers"] = followers;

      await Followers.find({
        follower_id: req.user.id,
      })
        .countDocuments()
        .exec((err, following) => {
          if (err) console.log(err);
          profile["following"] = following;
          res.send(profile);
        });
    });
};

socialController.getComments = (req, res) => {
  Comment.find(
    { post_id: mongoose.Types.ObjectId(req.query.post_id) },
    (err, result) => {
      if (err) console.log(err);

      const allComments = [];

      if (result.length === 0) res.send(false);

      result.map(async (comment, i) => {
        const currentComment = {};

        const user_info = await User.findById(comment.user_id);

        allComments.push(
          {
            user_info: { ...user_info[0] },
            ...comment._doc,
          },
        );

        if (result.length <= i + 1) {
          allComments.length === 0 ? res.send(false) : res.send(allComments);
        }
      });
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
  Posts.find({ user_id: req.user.id }, (err, posts) => {
    if (err) console.log(err);
    const userPosts = [];
    if (posts.length === 0) {
      res.send(false);
    } else {
      posts.map(async (post, i) => {
        const currentPost = {};
        await Likes.find({
          post_id: mongoose.Types.ObjectId(post._id),
        }).countDocuments((err, likes) => {
          if (err) console.log(err);
          currentPost["post_info"] = { ...post._doc, likes };
          userPosts.push(currentPost);
          if (posts.length <= i + 1) {
            res.send(userPosts);
          }
        });
      });
    }
  });
};

socialController.getAllUserFavorites = (req, res) => {
  FavoritePosts.find({ user_id: req.user.id }, (err, postsIds) => {
    if (err) console.log(err);
    const favoritesPosts = [];
    if (postsIds.length === 0) {
      res.send(false);
    }
    postsIds.map(async (favPost, i) => {
      const currentPost = {};

      await Posts.findOne(
        { _id: mongoose.Types.ObjectId(favPost.post_id[0]) },
        async (err, post) => {
          if (err) console.log(err);

          await Likes.find({
            post_id: mongoose.Types.ObjectId(favPost.post_id[0]),
          }).countDocuments((err, likes) => {
            if (err) console.log(err);

            currentPost["post_info"] = { ...post._doc, likes };

            favoritesPosts.push(currentPost);
            if (postsIds.length <= i + 1) {
              res.send(favoritesPosts);
            }
          });
        }
      );
    });
  });
};

socialController.getFollowers = (req, res) => {
  Followers.find(
    { follower_id: mongoose.Types.ObjectId(req.user.id) },
    (err, result) => {
      if (err) console.log(err);
      res.send(result);
    }
  );
};

socialController.getLikes = (req, res) => {
  Likes.find({ post_id: mongoose.Types.ObjectId(req.query.post_id) })
    .countDocuments()
    .exec((err, result) => {
      if (err) console.log(err);
      res.send({ Likes: result });
    });
};

socialController.deletePost = (req, res) => {
  console.log(req.body);
  Posts.findOneAndDelete({
    _id: mongoose.Types.ObjectId(req.body.post_id),
  }).exec((err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
  });
};

socialController.unLike = (req, res) => {
  Likes.findOneAndDelete({
    user_id: req.user.id,
    post_id: mongoose.Types.ObjectId(req.body.post_id),
  }).exec((err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
};

socialController.unFollow = (req, res) => {
  Followers.findOneAndDelete({
    follower_id: req.user.id,
    followed_id: req.body.followed_id,
  }).exec((err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
};

socialController.unFavorite = (req, res) => {
  FavoritePosts.findOneAndDelete({
    user_id: req.user.id,
    post_id: mongoose.Types.ObjectId(req.body.post_id),
  }).exec((err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
};
