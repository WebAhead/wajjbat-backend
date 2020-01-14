import db from '../database/db_connection';

export default {
  addReview: ({ userId, businessId, rating, reviewBody, dateCreated }) =>
    new Promise((resolve, reject) =>
      db.query(`
        INSERT INTO reviews (user_id, business_id, rating, review_body, created_at) 
        VALUES($1, $2, $3, $4, $5)`, [userId, businessId, rating, reviewBody, dateCreated]
      )
        .then(({ rows }) => resolve(true))
        .catch(reject)
    )

};
