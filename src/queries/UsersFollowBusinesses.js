import db from '../database/db_connection';

export default {
  addFollow: ({ userId, businessId }) =>
    new Promise((resolve, reject) =>
      db.query(`
        INSERT INTO usersfollowbusinesses (user_id, business_id) 
        VALUES($1, $2)`, [userId, businessId]
      )
        .then(({ rows }) => resolve(true))
        .catch(reject)
    ),
  getFollowingByUserId: (uid) => new Promise((resolve, reject) =>
    db.query(`SELECT * FROM usersfollowbusinesses
    LEFT JOIN businesses ON usersfollowbusinesses.business_id = businesses.id WHERE usersfollowbusinesses.user_id = $1;`, [uid])
      .then(({ rows }) => resolve(rows))
      .catch(reject)
  ),
  getFollowersByBusinessId: (bid) => new Promise((resolve, reject) =>
    db.query(`SELECT * FROM usersfollowbusinesses
    LEFT JOIN users ON usersfollowbusinesses.user_id = users.id WHERE usersfollowbusinesses.business_id = $1;`, [bid])
      .then(({ rows }) => resolve(rows))
      .catch(reject)
  ),
  deleteFollow: ({ userId, businessId }) => new Promise((resolve, reject) => db.query(
    'DELETE FROM usersfollowbusinesses where user_id=$1 AND business_id=$2', [userId, businessId])
    .then(({ rows }) => resolve(rows))
    .catch(reject))
};
