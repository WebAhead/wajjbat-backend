const express = require("express");
const router = express.Router();
const { businesses, businessesId, newReview } = require("../controllers/api");
const { aw3 } = require("../controllers/aw3");

router.post("/businesses", businesses);

router.get("/businesses/:id", businessesId);

router.post("/new-review", newReview);

// router that handel aw3 requests
router.get("/sign-s3", aw3);

module.exports = router;
