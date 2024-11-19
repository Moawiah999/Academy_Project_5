-- Create a table called **roles** in the database
CREATE TABLE roles (
  id SERIAL NOT NULL,
  role VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

-- Create a table called **permissions** in the database
CREATE TABLE permissions (
  id SERIAL NOT NULL,
  permission VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

-- Create a table called **role_permission** in the database
CREATE TABLE role_permission (
  id SERIAL NOT NULL,
  role_id INT,
  permission_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id),
  PRIMARY KEY (id)
);

-- Create a table called **users** in the database
CREATE TABLE users (
  user_id SERIAL NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  country VARCHAR(255),
  role_id INT,
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  PRIMARY KEY (user_id)
);

-- Create a table called **flights** in the database ** 
CREATE TABLE flights (
  flights_id SERIAL NOT NULL,
  flight_Company VARCHAR(255) NOT NULL,
  flight_number VARCHAR(255) NOT NULL,
  origin VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  departure_time TIMESTAMP NOT NULL,
  arrival_time TIMESTAMP NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  is_deleted SMALLINT DEFAULT 0,
  PRIMARY KEY (flights_id)
);

CREATE TABLE userFlight (
  userFlight_id SERIAL NOT NULL,
  user_id INT,
  flights_id INT,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (flights_id) REFERENCES flights(flights_id),
  is_deleted SMALLINT DEFAULT 0,
  PRIMARY KEY (id_userFlight)
);


-- Create a table called **hotels** in the database

CREATE TABLE hotels (
  hotel_id SERIAL NOT NULL,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  price_per_night DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(255),
  is_deleted SMALLINT DEFAULT 0,
  PRIMARY KEY (hotel_id)
);


CREATE TABLE userHotel (
  userHotel_id SERIAL NOT NULL,
  user_id INT,
  hotel_id INT,
  from_date date,
  to_date date,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (hotel_id) REFERENCES hotels(hotel_id),
  is_deleted SMALLINT DEFAULT 0,
  PRIMARY KEY (userHotel_id)
);

-- Create a table called **tour_packages** in the database

CREATE TABLE tour_packages (
  tour_packages_id SERIAL NOT NULL,
  name VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  duration_days INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  hotel_id INT,
  flights_id INT,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (hotel_id) REFERENCES hotels(hotel_id),
  FOREIGN KEY (flights_id) REFERENCES flights(flights_id),

  PRIMARY KEY (tour_packages_id)
);

-- Create a table called **reservations** in the database
CREATE TABLE reservations (
  reservation_id SERIAL NOT NULL,
  user_id INT,
  flight_id INT,
  hotel_id INT,
  tour_package_id INT,
  reservation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'Pending',
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (flight_id) REFERENCES flights(id),
  FOREIGN KEY (hotel_id) REFERENCES hotels(id),
  FOREIGN KEY (tour_package_id) REFERENCES tour_packages(id),
  PRIMARY KEY (reservation_id)
);

-- Create a table called **notifications** in the database
CREATE TABLE notifications (
  id SERIAL NOT NULL,
  user_id INT,
  message TEXT,
  is_read SMALLINT DEFAULT 0,
  notification_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  PRIMARY KEY (id)
);


