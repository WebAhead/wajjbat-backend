const db = require("../database/db_connection");

const getAllBussiness = data => db.query("SELECT * FROM businesses");

const bussinessList = id =>
  db.query(
    `SELECT b.name,b.approved,b.primaryimage as image,b.description,b.cuisine,b.business_type as type 
FROM businesses b left join users u ON
 u.id = b.user_id where u.id=$1`,
    [id]
  );

module.exports = { getAllBussiness, bussinessList };
