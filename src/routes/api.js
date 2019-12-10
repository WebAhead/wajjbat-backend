const express = require("express");
const router = express.Router();
const { getbusinesses } = require("../queries/getbusinesses");

router.get("/businesses", (req, res) => {
  getbusinesses()
    .then(result => res.json(result.rows[0]))
    .catch(err => console.log("getbusinesses Error", err));
});

router.get("/businesses/:id", (req, res) => {
  res.json(req.params.id);
});

router.post("/new-review", (req, res) => {
  res.json();
  //  cost data= req.body;
});

router.post("/send-location", (req, res) => {
  //  cost data= req.body;

  res.json();
});

module.exports = router;
