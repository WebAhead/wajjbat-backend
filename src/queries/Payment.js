import db from '../database/db_connection';

export default {
  addClicks: (business, clicks) =>
    new Promise((resolve, reject) =>
      db
        .query(
          'UPDATE businesses SET clicks=$1 WHERE id=$2',
          [clicks, business]
        )
        .then(({ rows }) => resolve(rows))
        .catch(reject)
    )
};
