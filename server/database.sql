CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_email VARCHAR(50),
  user_password VARCHAR(50),
  user_name VARCHAR(20)
);

CREATE TABLE trip (
  trip_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(user_id)
);

CREATE TABLE vehicles (
  vehicle_id SERIAL PRIMARY KEY,
  vehicle_make VARCHAR(20),
  vehicle_model VARCHAR(20),
  vehicle_year INT,
  vehicle_engine_size FLOAT,
  vehicle_mpg FLOAT
);

CREATE TABLE trip_leg (
  trip_leg_id SERIAL PRIMARY KEY,
  gallons_added FLOAT,
  miles_driven FLOAT,
  price_per_gallon FLOAT,
  trip_id INT NOT NULL REFERENCES trip(trip_id)
);