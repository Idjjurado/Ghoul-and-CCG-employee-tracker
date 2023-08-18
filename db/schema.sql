DROP DATABASE IF EXISTS CCG_DATABASE;
CREATE DATABASE CCG_DATABASE;

USE CCG_DATABASE;

CREATE TABLE IF NOT EXISTS ccg_departments (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL
);
-- Senior Investigators, Junior Investigators

CREATE TABLE IF NOT EXISTS ccg_ghoulratings (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  classification varchar(255) UNIQUE NOT NULL
);
-- SSS
-- SS
-- S+
-- S-
-- A
-- B
-- C

CREATE TABLE IF NOT EXISTS ccg_roles (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title varchar(255) UNIQUE NOT NULL,
  salary decimal NOT NULL,
  department_id int(255) NOT NULL,
  INDEX depindex (department_id),
  FOREIGN KEY (department_id) 
  REFERENCES ccg_departments(id) 
  ON DELETE CASCADE
);
-- Senior Investigator
  -- Special Class Investigator
  -- Associate Special Class Investigator
  -- First Class Investigator
-- Junior Investigator
  -- Second Class Investigator
  -- Third Class Investigator
  -- Fourth Class Investigator

CREATE TABLE IF NOT EXISTS ccg_employees (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  role_id int(255) NOT NULL,
  INDEX roleindex (role_id),
  FOREIGN KEY (role_id)
  REFERENCES ccg_roles(id)
  ON DELETE CASCADE
);
-- Special Class Investigator
  -- Koutarou Amon
  -- Kureo Mado
  -- Yukinori Shinohara
  -- Iwao Kuroiwa
  -- Kishou Arima
  -- Koori Ui
  -- Juuzou Suzuya
-- Associate Special Class Investigator
  -- Shiki Kijima
  -- Kousuke Houji
  -- Koori Ui
  -- Haise Sasaki
-- First Class Investigator
  -- Keijin Nakarai
  -- Nobu Shimoguchi
  -- Naoto Hayashimura
  -- Juuji Isoyama
  -- Take Hirako


CREATE TABLE IF NOT EXISTS ccg_ghouls (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL,
  kagune varchar(255) NOT NULL,
  rating_id int(255) NOT NULL,
  INDEX ratingindex (rating_id),
  FOREIGN KEY (rating_id)
  REFERENCES ccg_ghoulratings(id)
  ON DELETE CASCADE
);
-- SSS
  -- Eto Yoshimura
  -- Yoshimura
  -- Roma Hoito
  -- Ken Kaneki
-- SS+
  -- Seidou Takizawa
  -- Renji Yomo
-- SS-
  -- Noro
  -- Tatara
-- SS
  -- Uta
  -- Hinami Fueguchi
  -- Kaya Irimi
  -- Ayato Kirishima
  -- Touka Kirishima
-- S+
-- S-
  -- Nishiki Nishio
-- S
  -- Bin Brothers
  -- Rize Kamishiro
  -- Demon Yamada
  -- Shuu Tsukiyama
  -- Yakumo Oomori
  -- Kuki Urie
-- A
  -- Karao Saeki
-- B
  -- Akashi Kobayashi
-- C
  -- Scarecrow

  VALUES
    ('SSS'),
    ('SS+'),
    ('SS-'),
    ('SS'),
    ('S+'),
    ('S-'),
    ('S'),
    ('A'),
    ('B'),
    ('C');