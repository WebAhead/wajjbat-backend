import { Router } from 'express';
import {
  businesses,
  businessesId,
  newReview,
  oauthHandler,
  newBusiness,
  businessesList,
  getUserReviews,
  getReviewsByReviewrId
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

// add new businesse
router.post('/new-businesses', verifyToken(false), newBusiness);

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
