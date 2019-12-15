const express = require("express");
const passport = require('passport');
const router = express.Router();
const { businesses, businessesId, newReview, googleOAuth, facebookOAuth, } = require("../controllers/api");
const passportGoogle = passport.authenticate('googleToken', { session: false });

// auth login
router.get('/auth/login', (req, res) => {
    res.send(req.user);
});

// auth logout
router.get('/auth/logout', (req, res) => {
    // handle with passport
    req.logout();
    //res.redirect('/');
});


//google & facebook oauth
router.post('/oauth/google', passportGoogle, googleOAuth);
router.post('/oauth/facebook', passport.authenticate('facebookToken', { session: false }), facebookOAuth);

router.post("/businesses", businesses);

router.get("/businesses/:id", businessesId);

router.post("/new-review", newReview);
module.exports = router;
