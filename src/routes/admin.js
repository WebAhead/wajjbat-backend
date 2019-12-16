const express = require("express");
const router = express.Router();
const { businesses, users } = require("../controllers/admin");

router.get("/businesses", businesses);
router.get("/users", users);

module.exports = router;
