import db from '../database/db_connection';

export default {
  addFollow: ({ userId, businessId, dateCreated }) =>
    new Promise((resolve, reject) =>
      db.query(`
        INSERT INTO usersfollowbusinesses (user_id, business_id, created_at) 
        VALUES($1, $2, $3)`, [userId, businessId, dateCreated]
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
  deleteFollow: (id) => new Promise((resolve, reject) => db.query(
    'DELETE FROM usersfollowbusinesses where id=$1', [id]
  ))
};
