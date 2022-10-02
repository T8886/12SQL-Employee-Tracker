DROP DATABASE IF EXISTS registrar_db;
CREATE DATABASE registrar_db;

USE registrar_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dapartment_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  job_title VARCHAR(30) NOT NULL,
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department VARCHAR(30) NOT NULL,
  salary INT NOT NULL,
  FOREIGN KEY (department_name)
  REFERENCES departments(id)
  ON DELETE SET NULL
);