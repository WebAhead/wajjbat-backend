const db = require("../database/db_connection");

const addNewReview = data => {
  return db.query(
    "INSERT INTO reviews (user_id,business_id,rating,review_body,date_created) VALUES($1,$2,$3,$4,$5)",
    [
      data.userId,
      data.businessId,
      data.rating,
      data.reviewBody,
      data.dateCreated
    ]
  );
};

module.exports = { addNewReview };
