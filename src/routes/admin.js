const express = require("express");
const router = express.Router();
const {
  businesses,
  users,
  editUserById,
  getUserById,
  getBusinesseById,
  editBusinesById
} = require("../controllers/admin");

router.get("/businesses", businesses);
router.get("/businesses/:id", getBusinesseById);
router.put("/businesses/:id", editBusinesById);

router.put("/users/:id", editUserById);
router.get("/users/:id", getUserById);
router.get("/users", users);

module.exports = router;
