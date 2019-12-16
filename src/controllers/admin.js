const { getAllBussiness } = require("../queries/getAllBusinesses");
const { getAllUsers } = require("../queries/getAllUsers");

exports.businesses = async (req, res) => {
  try {
    const { rows: allBusinesses } = await getAllBussiness();

    res.append("Access-Control-Expose-Headers", "Content-Range");
    res.set("Content-Range", "businesses 0-24/100");
    res.json(allBusinesses);
  } catch (err) {
    console.log(err);
  }
};

exports.users = async (req, res) => {
  try {
    const { rows: allUsers } = await getAllUsers();

    res.append("Access-Control-Expose-Headers", "Content-Range");
    res.set("Content-Range", "businesses 0-24/100");
    console.log(allUsers);
    res.json(allUsers);
  } catch (err) {
    console.log(err);
  }
};
