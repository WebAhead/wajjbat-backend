const express = require("express");
const router = express.Router();
const { businesses, businessesId, newReview, googleFacebook, stam } = require("../controllers/api");
const env = require("env2");
env("./config.env");


// auth login
router.get('/auth/login', (req, res) => {
    res.send(req.user);
});


//google & facebook oauth
router.post('/oauth/google', googleFacebook);



router.post('/oauth/facebook', googleFacebook);

router.post("/businesses", businesses);

router.get("/businesses/:id", businessesId);

router.post("/new-review", newReview);

router.get('/stam', stam);

module.exports = router;
