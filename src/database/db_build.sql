BEGIN;
    DROP TABLE IF EXISTS businesses,users,images,reviews  CASCADE;

CREATE TABLE
  IF NOT EXISTS users
  (
  id SERIAL  PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email  VARCHAR(100) UNIQUE,
  profile_image TEXT 
);

CREATE TABLE  IF NOT EXISTS  businesses
(
  id serial PRIMARY KEY,
  user_id INTEGER ,
  name VARCHAR(500) NOT NULL,
  primaryImage VARCHAR(500) NOT NULL,
   description TEXT NOT NULL,
  cuisine VARCHAR(100) NOT NULL,
  lat DECIMAL (10,7) NOT NULL,
  lng DECIMAL(10,7) NOT NULL,
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



INSERT INTO users (first_name,last_name,email,profile_image) VALUES
 ('moshe','cursias','moshe@gmail.com','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6rX2JulNFa3rlswp0WBQYoquLy9vVmKgvPLLACkGlLyHCBwA&s' ),
 ('avi','cohen','avi@gmail.com','https://pbs.twimg.com/profile_images/760457059427053573/ihXPqYrW_400x400.jpg');

INSERT INTO businesses(user_id,name,primaryImage,description,cuisine,lat,lng,business_type,phone,address,email,parking,freeWifi,smokingArea)VALUES
(1,'Al Shawarma','https://www.ahstatic.com/photos/5555_rsr001_01_p_1024x768.jpg',
'The best shwarma wrapper in town, for shwarma lovers, amazing quality and people',
'east food',32.794044,34.989571,'resturant','052386777','nazerth','alswarma@gmail.com',
'true','true','true');

INSERT INTO images (business_id,image_url) VALUES
(1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6rX2JulNFa3rlswp0WBQYoquLy9vVmKgvPLLACkGlLyHCBwA&s');

INSERT INTO reviews (user_id,business_id,rating,review_body) VALUES (2,1,7,'Come enjoy some dank vaping 420 blaze it');

COMMIT;


