addRole
    var query = `SELECT departments.id, departments.name, roles.salary
    FROM employees
    JOIN roles ON employees.role_id = roles.id
    JOIN departments ON departments.id = roles.department_id
    GROUP BY departments.id, departments.name;`
  
    updateEmployeeRole
        let query = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name, roles.salary, 
                        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                    FROM employees
                    JOIN roles ON employees.role_id = roles.id
                    JOIN departments ON departments.id = roles.department_id
                    JOIN employees manager ON manager.id = employees.manager_id`