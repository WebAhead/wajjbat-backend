const db = require("../database/db_connection");

const getAllBussiness = data => db.query("SELECT * FROM businesses");

const bussinessList = () => db.query('SELECT name,approved,cuisine,business_type as type FROM businesses')

module.exports = { getAllBussiness, bussinessList };
