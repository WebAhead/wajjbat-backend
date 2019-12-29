const db = require("../database/db_connection");

const getReviewsByUserId = id =>
  db.query(
    `select b.primaryImage, r.id,u.first_name as userFirstName,last_name as userLasttName,r.rating,r.review_body as reviewBody,r.date_created as reviewDate from reviews r join businesses b on r.business_id = b.id join users u on u.id=r.user_id where u.id=$1`,
    [id]
  );

module.exports = { getReviewsByUserId };
