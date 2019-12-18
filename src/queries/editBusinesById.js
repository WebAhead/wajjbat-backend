const db = require("../database/db_connection");

const editBusinesById = data => {
  // if user approve the business we will get 'true' from the crm system and turn it to approved
  // if user disapprove the business we will get 'no' from the crm system and turn it to disapprove
  // if user doesnt choosed any option we keep the prev value
  let approved = data.approved;
  if (data.approved === true) {
    approved = "approved";
  } else if (data.approved === false) {
    approved = "disapproved";
  }

  if (!data.name) {
    return db.query("UPDATE businesses SET approved=$1 WHERE id=$2", [
      approved,
      data.id
    ]);
  }

  return db.query(
    `UPDATE businesses SET
    name=$1, phone=$2, email=$3,description=$4,cuisine=$5,address=$6,lat=$7,lng=$8,business_type=$9,approved=$10
      WHERE id=$11`,
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
      approved,
      data.id
    ]
  );
};

module.exports = { editBusinesById };
