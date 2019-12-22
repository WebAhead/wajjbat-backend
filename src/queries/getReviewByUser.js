const db = require("../database/db_connection");

const getReviewByUser = id => db.query(
    `select b.name,r.rating,r.review_body,r.date_created as reviewDate from reviews r join businesses b on r.business_id = b.id join users u on u.id=r.user_id where u.id=$1`, [id]);

module.exports = { getReviewByUser }
