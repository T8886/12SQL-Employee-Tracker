const inquirer = require('inquirer');
const fs = require('fs');
const { Console } = require('console');


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
            swith(pickedOption.select) {
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

