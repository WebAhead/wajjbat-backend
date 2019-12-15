const db = require('../database/db_connection');

const Find_User = id => {
    return db.query('select * from users where id=$1', [id])
}

module.exports = {
    Find_User
}