// Created with assistants of multiple tutors and TA.

const mysql = require('mysql2');
const inquirer = require('inquirer');

const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );


  connection.connect(function(err){
    if (err) throw err;
    chooseOption ()
  }
  )
// Options

function chooseOption() {
   inquirer.prompt([
        {
            type: "list",
            message: "Select one of the following options: ",
            name: "pickOption",
            choices: [
                'view all departments',
                'view all roles',
                'view all employees',
                'add a department',
                'add a role',
                'add an employee',
                'update an employee role',
                'completed'
            ]
        }
    ])
        .then((res)=>{
            console.log(res.pickOption);
            switch (res.pickOption) {
                case "view all departments":
                    viewDeps();
                    break;
                case "view all roles":
                    viewRoles();
                    break;
                case "view all employees":
                    viewEmployees();
                    break;
                case "add a department":
                    addDepartment();
                    break;
                case "add a role":
                    addRole();
                    break;
                case "add an employee":
                    addEmployee();
                    break;
                case "update an employee role":
                    updateEmployeeRole();
                    break;
                case 'completed':
                    connection.end();
                    break;
            }
        }).catch((err)=>{
            if(err)throw err;
            });
};

// view all departments
function viewDeps(){
    let query = `SELECT *
    FROM departments`;

    connection.query(query, (err, res)=>{
        if (err) throw err;
        console.table(res);
        chooseOption();
      });
  }
// view all roles
  function viewRoles() {
    let query = `SELECT roles.id, departments.name, roles.title, roles.salary 
    FROM departments
    JOIN roles ON departments.id = roles.department_id`;
    
    connection.query(query, (err, res)=>{
        if (err) throw err;
        console.table(res);
        chooseOption();
      });
  }

  // view all employees
  function viewEmployees() {
    let query = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS departments, roles.salary, CONCAT (manager.first_name, ' ', manager.last_name) AS manager
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees manager ON manager.id = employees.manager_id;`
    
    connection.query(query, (err, res)=>{
        if (err) throw err;
        console.table(res);
        chooseOption();
      });
  }

  // add department
  const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter department name:',
                name: 'newDep'
                
            },
        ])
        .then((data) => {
            connection.query('INSERT INTO departments SET ?',
                {
                    name: data.newDep,
                },
                function (err) {
                    if (err) throw err;
                }
            );
            console.log('Successfully added new department!')
            viewDeps();
        });
};

  // add role
  const addRole = () => {
    connection.query('SELECT * FROM departments', (err, departments) => {
        if (err) console.log(err);
        departments = departments.map((departments) => {
            return {
                name: departments.name,
                value: departments.id,
            };
        });
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
                  name: "dep",
                  choices: departments
                },
            ])
            .then((data) => {
                connection.query(
                    'INSERT INTO roles SET ?',
                    {
                        title: data.role,
                        salary: data.salary,
                        department_id: data.dep,
                    },
                    function (err) {
                        if (err) throw err;
                    }
                );
                console.log('Successfully added new role!')
                viewRoles();
            });

    });

};


// add an employee
const addEmployee = () => {
  connection.query('SELECT * FROM roles', (err, newRoles) => {
    if (err) console.log(err);
    newRoles = newRoles.map((roles) => {
        return {
            name: roles.title,
            value: roles.id,
        };
    });  

  inquirer
    .prompt([
    {
      type: "input",
      message: "Enter employee's first name: ",
      name: "firstName"
    },
    {
      type: "input",
      message: "Enter employee's last name: ",
      name: "lastName"
    },
    {
      type: "list",
      message: "Enter employee's role: ",
      name: "role",
      choices: newRoles
    },
    {
      type: "list",
      message: "Enter manager's ID: ",
      name: "manId",
      choices: [1,3,]
    },

  ]).then((data)=>{
    console.log(data.roles);
    connection.query(
        'INSERT INTO employees SET ?',
        {
            first_name: data.firstName,
            last_name: data.lastName,
            role_id: data.role,
            manager_id: data.manId
        },
        (err) => {
            if (err) throw err;
            console.log('Successfully added employee!');
            viewEmployees();

        }
    );
});

});

};

// update employee role
const updateEmployeeRole = () => {
  connection.query('SELECT * FROM employees', (err, newEmpRole) => {
      if (err) console.log(err);
      newEmpRole = newEmpRole.map((employees) => {
          return {
              name: `${employees.first_name} ${employees.last_name}`,
              value: employees.id,
          };
      });
      connection.query('SELECT * FROM roles', (err, rol) => {
          if (err) console.log(err);
          rol = rol.map((roles) => {
              return {
                  name: roles.title,
                  value: roles.id,
              }
          });
          inquirer
              .prompt([
                  {
                      type: 'list',
                      name: 'chooseEmp',
                      message: 'Select employee to update...',
                      choices: newEmpRole,
                  },
                  {
                      type: 'list',
                      name: 'NR',
                      message: 'Enter new role:',
                      choices: rol,
                  },
              ])
              .then((data) => {
                  connection.query('UPDATE employees SET ? WHERE ?',
                      [
                          {
                              role_id: data.NR,
                          },
                          {
                              id: data.chooseEmp,
                          },
                      ],
                      function (err) {
                          if (err) throw err;
                      }
                  );
                  console.log('Successfully updated employee role!');
                  viewEmployees();
              });

      });
  });
};


