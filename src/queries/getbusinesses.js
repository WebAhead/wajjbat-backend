const db = require("../database/db_connection");

const getBusinesses = () =>
  db.query(
    "SELECT b.id,i.image_url,b.name,b.description,r.rating,b.business_type as type FROM businesses b JOIN images i ON b.id=i.business_id JOIN reviews r ON r.business_id=b.id"
  );

const topRating = () => {
  return db.query(
    "SELECT b.id,i.image_url,b.name,b.description,r.rating,b.business_type as type FROM businesses b JOIN images i ON b.id=i.business_id JOIN reviews r ON r.business_id=b.id order by r.rating desc LIMIT 5 "
  );
};

module.exports = { getBusinesses, topRating };
