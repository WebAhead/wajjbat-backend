import db from '../database/db_connection';

export default {
  addFan: ({ userId, businessId, dateCreated }) =>
    new Promise((resolve, reject) =>
      db.query(`
        INSERT INTO fans (user_id, business_id, created_at) 
        VALUES($1, $2, $3)`, [userId, businessId, dateCreated]
      )
        .then(({ rows }) => resolve(true))
        .catch(reject)
    ),
  getFansByUserId: (uid) => new Promise((resolve, reject) =>
    db.query(`SELECT * FROM fans
    WHERE user_id = $1`, [uid])
      .then(({ rows }) => resolve(rows))
      .catch(reject)
  ),
  getFansByBusinessId: (bid) => new Promise((resolve, reject) =>
    db.query(`SELECT * FROM fans
    WHERE business_id = $1`, [bid])
      .then(({ rows }) => resolve(rows))
      .catch(reject)
  ),
  delete: (id) => new Promise((resolve, reject) => db.query(
    'DELETE FROM fans where id=$1', [id]
  ))
};
