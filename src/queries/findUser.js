const db = require('../database/db_connection');

const findUser = id => db.query('select * from users where id=$1', [id])


module.exports = {
    findUser
}