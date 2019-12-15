const db = require("../database/db_connection");

const Add_New_User = (id, first_name, last_name, email, profile_image) => {
    return db.query("INSERT INTO users(id,first_name,last_name,email,profile_image)VALUES($1,$2,$3,$4,$5)", [id, first_name, last_name, email, profile_image])
}

module.exports = {
    Add_New_User
}