const express = require("express");
const router = express.Router();
const {
  businesses,
  users,
  editUserById,
  getUserById,
  getBusinesseById,
  editBusinesById,
  getReviewsByUserId,
  deleteReviewById
} = require("../controllers/admin");

const { getUserReviews } = require("../controllers/api");

router.get("/businesses", businesses);
router.get("/businesses/:id", getBusinesseById);
router.put("/businesses/:id", editBusinesById);

router.put("/users/:id", editUserById);
router.get("/users/:id", getUserById);
router.get("/users", users);

router.get("/reviewsbyuserid/:id", getReviewsByUserId);
router.get("/deletereviewbyid/:id", deleteReviewById);

module.exports = router;
