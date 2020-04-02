const express = require('express');
const { addPost, FavoritePosts, CreateUserPosts, Followers, Likes, Comment } = require('../controllers/social');

const router = express.Router();

router.post('/addPost', addPost);
router.post('/favorites', FavoritePosts);
router.post('/createUser', CreateUserPosts);
router.post('/Followers', Followers);
router.post('/Likes', Likes);
router.post('/Comment', Comment);

module.exports = router;
