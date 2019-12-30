const db = require("../database/db_connection");

const getReviewsByUserId = id =>
  db.query(
    `select r.id,u.profile_image, u.first_name as firstname,last_name as lastname,r.rating,r.review_body as reviewBody,r.date_created as reviewDate 
    from reviews  r join businesses b on r.business_id = b.id 
    join users u on u.id=r.user_id 
    where b.id=$1`,
    [id]
  );

module.exports = { getReviewsByUserId };
