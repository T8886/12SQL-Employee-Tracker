const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

// Options
const chooseOption = () => {
    return inquirer.prompt([
        {
            type: "list",
            message: "Select one of the following options ",
            name: "select",
            choices: [
                'view all departments',
                'view all roles',
                'view all employees',
                'add a department',
                'add a role',
                'add an employee',
                'update an employee role'
            ]
        }
    ])
        .then(pickedOption => {
            switch (pickedOption.select) {
                case "view all departments":
                    viewDepartment();
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
                default:
                    console.log('Have a great day!');
                    break;
            }
        });
};


function viewDepartment() {
    // query database by selecting all * from departments
    // use array.forEach to go over your query results, and console.log each one

}
db.query('SELECT roles.role_id, departments.department, roles.job_title, roles.salary FROM departments JOIN roles on departments.department = roles.department');

