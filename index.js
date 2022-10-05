// const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );


  db.connect(function(err){
    if (err) throw err;
    chooseOption ()
  }
  )
// Options

function chooseOption() {
   inquirer.prompt([
        {
            type: "list",
            message: "Select one of the following options ",
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
                    db.end();
                    break;
            }
        }).catch((err)=>{
            if(err)throw err;
            });
};

//view all departments
function viewDeps(){
    let query = `SELECT departments.id, departments.name
    FROM departments`;

    db.query(query, (err, res)=>{
        if (err) throw err;
        console.table(res);
        chooseOption();
      });
  }
//view all roles
  function viewRoles() {
    let query = `SELECT roles.id, departments.name, roles.title, roles.salary 
    FROM departments
    JOIN roles on departments.id = roles.id`;
    
    db.query(query, (err, res)=>{
        if (err) throw err;
        console.table(res);
        chooseOption();
      });
  }
  
  //view all employees