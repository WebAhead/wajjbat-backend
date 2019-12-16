const db = require("../database/db_connection");

const editUserById = data =>
  db.query(
    "UPDATE users SET first_name=$1, last_name=$2, email=$3,profile_image=$4  WHERE id=$5",
    [data.first_name, data.last_name, data.email, data.profile_image, data.id]
  );

module.exports = { editUserById };
