DROP DATABASE IF EXISTS CCG_DATABASE;
CREATE DATABASE CCG_DATABASE;

USE CCG_DATABASE;

CREATE TABLE IF NOT EXISTS ccg_departments (
  id int NOT NULL UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL,
);

CREATE TABLE IF NOT EXISTS ccg_roles (
  id int NOT NULL UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title varchar(255) UNIQUE NOT NULL,
  salary decimal UNSIGNED NOT NULL,
  department_id int(255) NOT NULL,
  INDEX depindex (department_id),
  FOREIGN KEY (department_id) 
  REFERENCES ccg_departments(id) 
  ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ccg_employees (
  id int NOT NULL UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  role_id int(255) NOT NULL,
  INDEX roleindex (role_id),
  FOREIGN KEY (role_id)
  REFERENCES ccg_roles(id)
  ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ccg_ghoulratings (
  id int NOT NULL UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  rating varchar(255) UNIQUE NOT NULL,
  quinque varchar(255) NOT NULL,
  department_id int(255) NOT NULL,
  INDEX depindex (department_id),
  FOREIGN KEY (department_id) 
  REFERENCES ccg_departments(id) 
  ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ccg_ghouls (
  id int NOT NULL UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL,
  rating varchar(255) NOT NULL
);



