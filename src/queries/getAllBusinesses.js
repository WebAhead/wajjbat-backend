const db = require("../database/db_connection");

const getAllBussiness = data => db.query("SELECT * FROM businesses");

const bussinessList = id => db.query(`SELECT b.name,b.approved,b.cuisine,b.business_type as type 
FROM businesses b join users u ON
 u.id = b.user_id where u.id=$1
 group by(b.name,b.approved,b.cuisine,b.business_type)`, [id])

module.exports = { getAllBussiness, bussinessList };
