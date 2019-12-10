const express = require("express");
const router = express.Router();

router.get("/businesses", (req, res) => {
  res.json();
});

router.get("/businesses/:id", (req, res) => {
  res.json(req.params.id);
});

router.post("/new-review", (req, res) => {
  //  cost data= req.body;
});

router.post("/send-location", (req, res) => {
  //  cost data= req.body;
});

module.exports = router;
