const db = require("../database/db_connection");

const editBusinesById = data =>
  db.query(
    `UPDATE businesses SET
    name=$1, phone=$2, email=$3,description=$4,cuisine=$5,address=$6,lat=$7,lng=$8,business_type=$9
      WHERE id=$10`,
    [
      data.name,
      data.phone,
      data.email,
      data.description,
      data.cuisine,
      data.address,
      data.lat,
      data.lng,
      data.business_type,
      data.id
    ]
  );

module.exports = { editBusinesById };
