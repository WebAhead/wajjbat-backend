const db = require('../database/db_connection');

module.exports.findUser = email => db.query('select * from users where email=$1', [email])

