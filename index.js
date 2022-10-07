// const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
// const connection = require('mysql2/typings/mysql/lib/Connection');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

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
    let query = `SELECT departments.id, departments.name
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
  function addDepartment() {
    inquirer
    .prompt([
        {
            type: "input",
            message: "Enter Department name: ",
            name: "name"
        }
    ]).then((res)=>{
        let query = `INSERT INTO departments SET?`;
        connection.query(query, {name: res.name}, (err, res)=>{
            if (err) throw err;
            console.table(res);
            chooseOption();
        });
    });
  }

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
                // console.log('successfully added new role!')
                viewRoles();
            });

    });

};


// add an employee
function addEmployee(){
    let query = `SELECT roles.id, roles.title, roles.salary 
    FROM roles;`
 connection.query(query,(err, res)=>{
    if(err)throw err;
    const roles = res.map(({ id, title, salary }) => ({
      value: id, 
      title: `${title}`, 
      salary: `${salary}`
    }));
    console.table(res);
    employeeRoles(roles);
  });
}
  
function employeeRoles(roles) {
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
      choices: roles
    }
  ]).then((res)=>{
      let query = `INSERT INTO employees SET ?`
      connection.query(query,{
        first_name: res.firstName,
        last_name: res.lastName,
        role_id: res.role
      },(err, res)=>{
        if(err) throw err;
        chooseOption();
    });
  });
}

// update employee role
function updateEmployeeRole(){
    let query = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name, roles.salary, 
                    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                FROM employees
                JOIN role ON employees.role_id = roles.id
                JOIN departments ON departments.id = roles.department_id
                JOIN employee manager ON manager.id = employees.manager_id`
  
    connection.query(query,(err, res)=>{
      if(err)throw err;
      const employees = res.map(({ id, first_name, last_name }) => ({
        value: id,
         name: `${first_name} ${last_name}`      
      }));
    //   console.table(res);
      updatedR(employees);
    });
}

function updatedR(employees){
  let query = 
  `SELECT roles.id, roles.title, roles.salary 
   FROM roles`

  connection.query(query,(err, res)=>{
    if(err)throw err;
    let roleOptions = res.map(({ id, title, salary }) => ({
      value: id, 
      title: `${title}`, 
      salary: `${salary}`      
    }));
    console.table(res);
    getUpdatedRole(employees, roleOptions);
  });
}
  
function getUpdatedRole(employees, roleOptions) {
  inquirer
    .prompt([
      {
        type: "list",
        message: `Enter employee who's role will be updated: `,
        name: "employee",
        choices: employees
      },
      {
        type: "list",
        message: "Select new role: ",
        name: "role",
        choices: roleOptions
      },

    ]).then((res)=>{
      let query = `UPDATE employee SET role_id = ? WHERE id = ?`
      connections.query(query,[ res.roles, res.employees],(err, res)=>{
          if(err)throw err;
          chooseOption();
        });
    });
}
