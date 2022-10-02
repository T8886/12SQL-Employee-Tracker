DROP DATABASE IF EXISTS registrar_db;
CREATE DATABASE registrar_db;

USE registrar_db;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  dapartment VARCHAR(30),
  PRIMARY KEY (department)
);

CREATE TABLE roles (
  job_title VARCHAR(30) NOT NULL PRIMARY KEY,
  role_id INT NOT NULL AUTO_INCREMENT,
  department VARCHAR(30),
  salary INT PRIMARY KEY,
  FOREIGN KEY (department)
  REFERENCES departments(department)
  ON DELETE SET NULL
);

CREATE TABLE employees (
  employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  job_title VARCHAR(30),
  department VARCHAR(30),
  salary INT NOT NULL,
  manager VARCHAR(30),
  FOREIGN KEY (department)
  REFERENCES departments(department)
  FOREIGN KEY (roles)
  REFERENCES roles(job_title)
  FOREIGN KEY (roles)
  REFERENCES roles(salary)

  ON DELETE SET NULL
);