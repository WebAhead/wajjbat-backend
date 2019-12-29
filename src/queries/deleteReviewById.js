const db = require("../database/db_connection");

const deleteReviewById = id =>
  db.query(`DELETE FROM reviews where id=$1`, [id]);

module.exports = { deleteReviewById };
