const db = require("../database/db_connection");

const getAllBussiness = data => {
  return db.query("SELECT * FROM businesses");
};

module.exports = { getAllBussiness };
