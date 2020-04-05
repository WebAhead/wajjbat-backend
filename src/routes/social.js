const express = require('express');
const router = express.Router();
const social = require('../controllers/social');
import middleware from '../middleware';

router.get('/allPosts', social.getAllPosts);
router.get('/nPosts', middleware.verifyToken,social.getNPosts);
router.get('/comments', middleware.verifyToken, social.getComments);
router.get('/latestComment', social.getLatestComment);
router.get('/likes', social.getLikes);
router.get('/userPosts', middleware.verifyToken, social.getAllUserPosts);
router.get('/userFavorites', middleware.verifyToken, social.getAllUserFavorites);
router.get('/followers', middleware.verifyToken, social.getFollowers);

router.post('/addPost', middleware.verifyToken, social.addPost);
router.post('/favorites', middleware.verifyToken, social.favoritePosts);
router.post('/followers', middleware.verifyToken, social.followers);
router.post('/likes', middleware.verifyToken, social.likes);
router.post('/comment', middleware.verifyToken, social.comment);

router.delete('/deletePost', middleware.verifyToken, social.deletePost);
router.delete('/unLike', middleware.verifyToken, social.unLike);
router.delete('/unFollow', middleware.verifyToken, social.unFollow);
router.delete('/unFavorite', middleware.verifyToken, social.unFavorite);

module.exports = router;