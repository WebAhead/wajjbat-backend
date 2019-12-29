const express = require("express");
const router = express.Router();
const { businesses, businessesId, newReview, googleFacebook, newBusiness, businessesList, getUserReviews } = require("../controllers/api");
const { verifyToken } = require('../../authMiddleware/verifyToken')
const { s3Controller } = require("../controllers/s3Controller");
const env = require("env2");
env("./config.env");

//  google & facebook oauth
router.post("/oauth/google", googleFacebook);
router.post("/oauth/facebook", googleFacebook);

//retuen approved busssiness order it by location 
router.post("/businesses", businesses);

//get bussinesses by id
router.get("/businesses/:id", businessesId);

//add new businesse
router.post("/new-businesses", newBusiness);

//add new review
router.post("/new-review", verifyToken(false), newReview);

//bussiness-list per user
router.get('/bussiness-list', verifyToken(false), businessesList);

router.get('/getUserReviews', verifyToken(false), getUserReviews);

router.get('/isLoggedIn', verifyToken(true))


// router that handel aw3 requests
router.get("/sign-s3", s3Controller);

module.exports = router;
