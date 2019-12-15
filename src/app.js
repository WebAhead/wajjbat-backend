const express = require("express");
const bodyParser = require("body-parser");
const passportSetup = require('../config/passport-setup');
const cors = require("cors");
const apiRoutes = require("./routes/api");
const adminRoutes = require("./routes/admin");

const cookieSession = require('cookie-session');
const keys = require('../config/keys');
const passport = require('passport');
const app = express();
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));


app.use(bodyParser.json());
app.use(cors());
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", apiRoutes);
app.use("/admin", adminRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server run on port ${port}`);
});
