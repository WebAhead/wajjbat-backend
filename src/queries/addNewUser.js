const db = require("../database/db_connection");

module.exports.addNewUser = (firstName, lastName, email, profile_image) =>
    db.query(` 
    INSERT INTO users(first_name,last_name,email,profile_image)
    VALUES($1,$2,$3,$4)`,
        [firstName, lastName, email, profileImage]);
