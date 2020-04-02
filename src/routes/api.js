import { Router } from 'express';
import {
  businesses,
  businessesId,
  newReview,
  oauthHandler,
  newBusiness,
  isFollowing,
  followBusiness,
  deleteFollowBusiness,
  businessesList,
  getUserReviews,
  getReviewsByReviewrId,
  getBusinessFollowers,
  getFollowingByUserId
} from '../controllers/api';
import middleware from '../middleware';
import { s3Controller } from '../controllers/s3Controller';

const router = Router();
const { verifyToken } = middleware;

//  google & facebook oauth
router.post('/oauth/google', oauthHandler);
router.post('/oauth/facebook', oauthHandler);

// return approved busssiness order it by location
router.post('/businesses', businesses);

// get bussinesses by id
router.get('/businesses/:id', businessesId);

// get reviews by reviewr id
router.get('/reviewer/:fullname/:reviewerid', getReviewsByReviewrId);

// get following by user id
router.get('/following/:userid', getFollowingByUserId);

// get followers by business id
router.get('/followers/:businessid', getBusinessFollowers);

// add new businesse
router.post('/new-businesses', verifyToken(false), newBusiness);

router.post('/isfollowing', isFollowing);

// start follow business
router.post('/follow', followBusiness);

// stop follow business
router.post('/unfollow', deleteFollowBusiness);

// add new review
// changet the boolean here for an object
router.post('/new-review', verifyToken(false), newReview);

// bussiness-list per user
router.get('/business-list', verifyToken(false), businessesList);

router.get('/getUserReviews', verifyToken(false), getUserReviews);

router.get('/isLoggedIn', verifyToken(true));

// router that handel aw3 requests
router.get('/sign-s3', s3Controller);

export default router;
