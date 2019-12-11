const express = require("express");
const router = express.Router();
const { businesses, businessesId, newReview } = require("../controllers/api");

router.post("/businesses", businesses);

router.get("/businesses/:id", businessesId);

router.post("/new-review", newReview);
module.exports = router;
