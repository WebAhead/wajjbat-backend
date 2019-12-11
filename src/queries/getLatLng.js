const db = require("../database/db_connection");

const getlatlng = () => {
  return db.query("SELECT id,lat,lng FROM businesses");
};

module.exports = { getlatlng };
