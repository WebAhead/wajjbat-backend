const db = require("../database/db_connection");

const getbusinesses = () => {
  return db.query(
    "SELECT b.id,i.image_url,b.name,b.description,r.rating,b.business_type FROM businesses b JOIN images i ON b.id=i.business_id JOIN reviews r ON r.business_id=b.id"
  );
};

module.exports = { getbusinesses };
