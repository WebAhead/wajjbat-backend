const express = require("express");
const router = express.Router();
const { businesses, businessesId, newReview, googleFacebook } = require("../controllers/api");
const { s3Controller } = require("../controllers/s3Controller");
const env = require("env2");
env("./config.env");

//  google & facebook oauth
router.post("/oauth/google", googleFacebook);

router.post("/oauth/facebook", googleFacebook);

router.post("/businesses", businesses);

router.get("/businesses/:id", businessesId);

router.post("/new-review", newReview);

// router that handel aw3 requests
router.get("/sign-s3", aw3);

module.exports = router;
