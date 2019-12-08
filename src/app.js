const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRoutes = require("./routes/api");
const adminRoutes = require("./routes/admin");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api", apiRoutes);
app.use("/admin", adminRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server run on port ${port}`);
});
