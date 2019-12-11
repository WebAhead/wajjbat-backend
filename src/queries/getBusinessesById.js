const db = require("../database/db_connection");

const getAllFromBusinesse = id => {
  return db.query("SELECT * FROM businesses WHERE id=$1", [id]);
};

const getBusinesseImages = id => {
  return db.query("select image_url from images where business_id=$1", [id]);
};

const getBusinesseReviews = id => {
  return db.query(
    "SELECT u.id,CONCAT(u.first_name, ' ' ,u.last_name) as fullname,u.profile_image, r.review_body,r.date_created as dateCreated,r.rating FROM users u JOIN reviews r ON u.id=r.user_id WHERE r.business_id=$1",
    [id]
  );
};

const getBusinesseAvgRating = id => {
  return db.query("SELECT AVG(rating) FROM reviews WHERE business_id=$1", [id]);
};

module.exports = {
  getBusinesseImages,
  getBusinesseReviews,
  getAllFromBusinesse,
  getBusinesseAvgRating
};
