const db = require("../database/db_connection");

const getBusinesses = () =>
  db.query(
    `select b.id,b.lat,b.lng,b.primaryimage,b.name,round(avg(r.rating)) as rating,b.description,b.business_type as type 
    from businesses 
    b left join reviews r on r.business_id = b.id 
    group by (b.id,b.primaryimage,b.name,b.description,b.business_type)`
  );

const topRating = () => {
  return db.query(
    `select b.id,b.primaryimage,b.name,round(avg(r.rating)) as rating,b.description,b.business_type as type 
    from  businesses b left join reviews r on r.business_id = b.id 
    group by (b.id,b.primaryimage,b.name,b.description,b.business_type) 
    order by avg(r.rating) desc 
    limit 5`
  );
};

module.exports = { getBusinesses, topRating };
