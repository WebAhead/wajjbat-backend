BEGIN;
    DROP TABLE IF EXISTS businesses,users,images,reviews  CASCADE;

CREATE TABLE
  IF NOT EXISTS users
  (
  id SERIAL  PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) ,
  profile_image  VARCHAR(200) 
);


CREATE TABLE  IF NOT EXISTS  businesses
(
  id serial PRIMARY KEY,
  user_id INTEGER ,
  name VARCHAR(500) NOT NULL,
  primaryImage VARCHAR(500) NOT NULL,
   description TEXT NOT NULL,
  cuisine VARCHAR(100) NOT NULL,
  lat DECIMAL(9,6) NOT NULL,
  lng DECIMAL(9,6) NOT NULL,
  business_type VARCHAR(100) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  address VARCHAR(100) NOT NULL,
  email VARCHAR(100) ,
  parking  BOOLEAN ,
  freeWifi  BOOLEAN ,
  smokingArea  BOOLEAN,
  FOREIGN KEY(user_id)REFERENCES users(id)
);

CREATE TABLE  IF NOT EXISTS  images
(
   id serial PRIMARY KEY,
   business_id INTEGER,
   image_url VARCHAR(500) NOT NULL,
   FOREIGN KEY(business_id) REFERENCES businesses(id)

);



CREATE TABLE  IF NOT EXISTS  reviews
(
  id serial PRIMARY KEY,
  user_id INTEGER ,
   business_id INTEGER ,   
  rating  DECIMAL(2,1) NOT NULL,
  review_body TEXT NOT NULL,
  date_created DATE NOT NULL DEFAULT current_date,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(business_id)REFERENCES businesses(id)
);

COMMIT;


