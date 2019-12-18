const express = require("express");
const router = express.Router();
const { businesses, businessesId, newReview } = require("../controllers/api");
const { s3Controller } = require("../controllers/s3Controller");

router.post("/businesses", businesses);

router.get("/businesses/:id", businessesId);

router.post("/new-review", newReview);

// router that handel aw3 requests
router.get("/sign-s3", s3Controller);

module.exports = router;
