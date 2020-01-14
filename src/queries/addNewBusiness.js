const db = require('../database/db_connection').default;

const addNewBussines = data => {
  return db.query(
        `INSERT INTO businesses
         (user_id,name,primaryImage,
            description,cuisine,
            lat,lng,business_type,phone,address,email,parking,freeWifi,smokingArea)
          VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
        [
          data.userId,
          data.name,
          data.primaryImage,
          data.description,
          data.cuisine,
          data.lat,
          data.lng,
          data.type,
          data.phone,
          data.address,
          data.email,
          data.parking,
          data.freeWifi,
          data.smokingArea
        ]
  );
};

const getId = () => db.query('select max(id) from businesses');

const addImage = (id, img) => db.query('INSERT INTO images(business_id,image_url)VALUES($1,$2)', [id, img]);

module.exports = { addNewBussines, getId, addImage };
