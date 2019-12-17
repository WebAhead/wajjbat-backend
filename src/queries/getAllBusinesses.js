const db = require("../database/db_connection");

const getAllBussiness = data => db.query("SELECT * FROM businesses");

module.exports = { getAllBussiness };
