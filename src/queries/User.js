import db from '../database/db_connection';

export default {
  findUser: (email) => new Promise((resolve, reject) => db.query(
    'SELECT * FROM users WHERE email=$1', [email]
  )
    .then(({ rows }) => resolve(rows))
    .catch(reject)),

  addNewUser: (firstName, lastName, email, profilePic) => new Promise((resolve, reject) =>
    db.query(
      `INSERT INTO users(first_name, last_name, email, profile_image)
       VALUES($1,$2,$3,$4)`,
      [firstName, lastName, email, profilePic])
      .then(({ rows }) => resolve(true))
      .catch(reject)),
  getUserReviews: (id) => new Promise((resolve, reject) =>
    db.query(
      `SELECT reviews.created_at as reviewDate, reviews.review_body AS reviewBody,
      reviews.rating, businesses.name AS businessName 
      FROM reviews 
      JOIN businesses ON reviews.business_id = businesses.id
      WHERE reviews.user_id = $1`, [id]
    )
      .then(({ rows }) => resolve(rows))
      .catch(reject)
  ),
  bussinessList: (id) => new Promise((resolve, reject) =>
    db.query(
    `SELECT business.name, business.approved, business.primaryimage as image, business.description,
     business.cuisine, business.business_type as type 
     FROM businesses 
     business LEFT JOIN users ON users.id = business.user_id 
     WHERE users.id = $1`,
    [id]
    )
      .then(({ rows }) => resolve(rows))
      .catch(reject)
  )

};
