import { Router } from 'express';
import {
  businesses,
  businessesId,
  newReview,
  oauthHandler,
  newBusiness,
  businessesList,
  getUserReviews
} from '../controllers/api';
import { verifyToken } from '../authMiddleware/verifyToken';
import { s3Controller } from '../controllers/s3Controller';

const router = Router();
//  google & facebook oauth
router.post('/oauth/google', oauthHandler);
router.post('/oauth/facebook', oauthHandler);

// retuen approved busssiness order it by location
router.post('/businesses', businesses);

// get bussinesses by id
router.get('/businesses/:id', businessesId);

// add new businesse
router.post('/new-businesses', newBusiness);

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
