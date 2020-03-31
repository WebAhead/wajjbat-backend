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
    WHERE user_id = $1`, [uid])
      .then(({ rows }) => resolve(rows))
      .catch(reject)
  ),
  getFollowersByBusinessId: (bid) => new Promise((resolve, reject) =>
    db.query(`SELECT * FROM usersfollowbusinesses
    WHERE business_id = $1`, [bid])
      .then(({ rows }) => resolve(rows))
      .catch(reject)
  ),
  deleteFollow: (id) => new Promise((resolve, reject) => db.query(
    'DELETE FROM usersfollowbusinesses where id=$1', [id]
  ))
};
