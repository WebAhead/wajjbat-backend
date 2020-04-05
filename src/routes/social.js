const express = require('express');
const router = express.Router();
const social = require('../controllers/social');

router.get('/allPosts', social.getAllPosts);
router.get('/nPosts', social.getNPosts);
router.get('/comments', social.getComments);
router.get('/likes', social.getLikes);
router.get('/userPosts', social.getAllUserPosts);
router.get('/userFavorites', social.getAllUserFavorites);
router.get('/followers', social.getFollowers);

router.post('/addPost', social.addPost);
router.post('/favorites', social.favoritePosts);
router.post('/followers', social.followers);
router.post('/likes', social.likes);
router.post('/comment', social.comment);

router.delete('/deletePost', social.deletePost);
router.delete('/unLike', social.unLike);
router.delete('/unFollow', social.unFollow);
router.delete('/unFavorite', social.unFavorite);

module.exports = router;