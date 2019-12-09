BEGIN;
    DROP TABLE IF EXISTS businesses,users,images,reviews  CASCADE;

CREATE TABLE
  IF NOT EXISTS users
  (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email TEXT NOT NULL,
  profile_image TEXT NOT NULL
);


CREATE TABLE  IF NOT EXISTS  businesses
(
  business_id serial PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  primaryImage VARCHAR(500) NOT NULL,
   description TEXT NOT NULL,
  cuisine VARCHAR(100) NOT NULL,
  lat VARCHAR(500) NOT NULL,
  lngVARCHAR(500) NOT NULL,
  type VARCHAR(500) NOT NULL,
  phone VARCHAR(100) NOT NULL,
  address VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  parking  BOOLEAN NOT NULL,
  freeWifi  BOOLEAN NOT NULL,
  smokingArea  BOOLEAN NOT NULL, 
  FOREIGN KEY  user_id REFERENCES users(user_id)
);

CREATE TABLE  IF NOT EXISTS  images
(
   id serial PRIMARY KEY,
   FOREIGN KEY  business_id REFERENCES businesses(business_id),
   image_url VARCHAR(500) NOT NULL
);

CREATE TABLE  IF NOT EXISTS  reviews
(
  reviews_id serial PRIMARY KEY,
 FOREIGN KEY  user_id REFERENCES users(user_id),
  FOREIGN KEY  business_id REFERENCES businesses(business_id),
  rating  INTEGER NOT NULL,
  	review_body TEXT NOT NULL,
    date_created  VARCHAR(100) NOT NULL
);



COMMIT;


