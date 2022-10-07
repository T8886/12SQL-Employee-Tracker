function addRole(){
    var query = `SELECT departments.id, departments.name, roles.salary
    FROM employees
    JOIN roles ON employees.role_id = roles.id
    JOIN departments ON departments.id = roles.department_id
    GROUP BY departments.id, departments.name;`
  
    connection.query(query,(err, res)=>{
        if(err)throw err;
        const departments = res.map(({ id, name }) => ({
          value: id, name:
          `${id} ${name}`
        }));
        roleInfo(departments);
      });
  }
  
  function roleInfo(departments){
      inquirer
        .prompt([
          {
            type: "input",
            message: "Enter name of the role: ",
            name: "role"
          },
          {
            type: "input",
            message: "Enter role's salary: ",
            name: "salary"
          },
          {
            type: "list",
            message: "Enter role's department: ",
            name: "department",
            choices: departments
          },
        ]).then((res)=>{
          let query = `INSERT INTO roles SET ?`;
    
          connection.query(query, {
              title: res.title,
              salary: res.salary,
              department_id: res.departments
          },(err, res)=>{
              if(err) throw err;
              console.table(res); 
              chooseOption();
          });
      });
  }
  
  


  