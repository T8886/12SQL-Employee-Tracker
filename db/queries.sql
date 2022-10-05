

-- SELECT employees.employee_id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, employees.manager
-- FROM departments
-- JOIN roles on departments.name = employees.name
-- JOIN employees on roles.title, roles.salary = employees.title, employees.salary;


-- SELECT roles.id, departments.name, roles.title, roles.salary 
--     FROM departments
--     JOIN roles ON departments.id = roles.id;


SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name, roles.salary, CONCAT (manager.first_name, ' ', manager.last_name) AS manager
    FROM employees
    LEFT JOIN roles ON employees.roles_id =roles.id
    LEFT JOIN departments ON departments.id = roles.departments_id
    LEFT JOIN employees manager ON manager.id = employees.manager_id;

-- 1
SELECT employees.id, employees.first_name, employees.last_name, departments.name
FROM employees
JOIN departments ON employees.id = departments.id;

--2
SELECT employees.id, employees.first_name, employees.last_name, departments.name
FROM employees
JOIN departments ON employees.id = departments.id;