addRole
    var query = `SELECT departments.id, departments.name, roles.salary
    FROM employees
    JOIN roles ON employees.role_id = roles.id
    JOIN departments ON departments.id = roles.department_id
    GROUP BY departments.id, departments.name;`
  
   