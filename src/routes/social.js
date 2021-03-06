const express = require('express');
const router = express.Router();
const social = require('../controllers/social');
import middleware from '../middleware';

router.get('/allPosts', social.getAllPosts);
router.get('/nPosts', middleware.verifyToken(false), social.getNPosts);
router.get('/comments', middleware.verifyToken(false), social.getComments);
router.get('/latestComment', social.getLatestComment);
router.get('/likes', social.getLikes);
router.get('/userPosts', middleware.verifyToken(false), social.getAllUserPosts);
router.get('/userFavorites', middleware.verifyToken(false), social.getAllUserFavorites);
router.get('/followers', middleware.verifyToken(false), social.getFollowers);
router.get('/profile', middleware.verifyToken(false), social.getProfile);


router.post('/addPost', middleware.verifyToken(false), social.addPost);
router.post('/favorites', middleware.verifyToken(false), social.favoritePosts);
router.post('/followers', middleware.verifyToken(false), social.followers);
router.post('/likes', middleware.verifyToken(false), social.likes);
router.post('/comment', middleware.verifyToken(false), social.comment);

router.post('/deletePost', middleware.verifyToken(false), social.deletePost);
router.post('/unLike', middleware.verifyToken(false), social.unLike);
router.post('/unFollow', middleware.verifyToken(false), social.unFollow);
router.post('/unFavorite', middleware.verifyToken(false), social.unFavorite);

module.exports = router;
