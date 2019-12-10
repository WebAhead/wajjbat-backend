const databaseConnection = require("../database/db_connection")

const getbusinesses = day => {
  return databaseConnection.query(`SELECT * FROM schedule where day=$1`, [day]);
};