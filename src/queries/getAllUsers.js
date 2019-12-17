const db = require("../database/db_connection");

const getAllUsers = data => db.query("SELECT * FROM users");
module.exports = { getAllUsers };
