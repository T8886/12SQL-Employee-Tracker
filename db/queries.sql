

SELECT employees.employee_id, employees.first_name, employees.last_name, roles.job_title, departments.department, roles.salary, employees.manager
FROM departments
JOIN roles on departments.department = employees.department
JOIN employees on roles.job_title, roles.salary = employees.job_title, employees.salary;


SELECT roles.id, roles.title, departments.name AS department, roles.salary
FROM roles
JOIN departments
on roles.department = departments.id;