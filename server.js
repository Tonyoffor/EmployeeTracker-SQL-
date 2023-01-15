var fs = require("fs");

const mysql = require('mysql2');
const inquirer = require("inquirer")
const express = require("express");
const { brotliDecompress } = require("zlib");


const PORT = process.env.PORT || 3001; //This is the port you l=will be running from, you can leave it blank but there is a proper syntex for that this one is running from port 3001
const app = express();


//this line creates a connection block to connect to mysql
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'password',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);


//main menu function; since the user needs to make a choice that is why you add choices, look at older assignments for other prompt options 
function mainMenu() {
  inquirer.prompt({
    type: "list",
    name: "direction",
    messsage: "What would you like to do?",
    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"] //remember mysql is unforgiving so all these strings need to be the same everywhere so try not to leave unneeded space
  }).then(answer => {
    if (answer.direction === "view all departments") {
      console.log("view all departments")
      viewAllDepartements()
    } else if (answer.direction === "view all roles") {
      console.log("view all roles")
      viewAllRoles()
    } else if (answer.direction === "view all employees") {
      console.log("view all employees")
      viewAllEmployees()
    } else if (answer.direction === "add a department") {
      console.log("add a department")
      addDepartment()
    } else if (answer.direction === "add a role") {
      console.log("add a role")
      addRole()
    } else if (answer.direction === "add an employee") {
      console.log("add an employee")
      addEmployee()
    } else if (answer.direction === "update an employee role") {
      console.log("update an employee role")
      updateEmployeeRole()
    }
  })

}
function viewAllDepartements() {
  // create query statments use mysql
  db.query('SELECT * FROM department', function (err, results) {
    console.log(results);
    mainMenu()
  })
}
//tested
function viewAllRoles() {
  db.query('SELECT * FROM role', function (err, results) {
    console.log(results);
    mainMenu()
  })
}
//tested
function viewAllEmployees() {
  db.query('SELECT * FROM employee', function (err, results) {
    console.log(results);
    mainMenu()
  })
}

async function addRole() { //make sure your snytax down here match with those in your schema.sql
  //  db.query(`INSERT INTO role(role_id) values ('${response.RoleName}', '${response.Salary}', '${response.DepartmentName}')`), function(err, results){
  //   console.log(results);
  //  }
  // enter the name, salary, and department for the role and that role is added to the database
  const [departments] = await db.promise().query("SELECT * FROM department")
  const departmentarray = departments.map(department => ({ name: department.dept_name, value: department.id }))
  console.log(departmentarray)
  inquirer
    .prompt([
      {
        type: 'list',
        message: ' What is the role name?',
        name: 'RoleName',

      },
      {
        type: 'input',
        message: 'What is the salary amount?',
        name: 'Salary',
      },
      {
        type: 'list',
        message: 'Department Name?',
        name: 'DepartmentId',
        choices: departmentarray
      },

    ]).then((response) => {
      console.log(response)
      const roleobj = { title: response.RoleName, salary: response.Salary, dept_id: response.DepartmentId }
      db.promise().query("INSERT INTO role SET ?", roleobj).then(([response]) => {
        if (response.affectedRows > 0) {
          viewAllRoles()
        } else {
          console.info("Failed to add to Database")
          mainMenu()
        }
      })


    });
}

//remember that each function needs its own db.query to connect to the mysql
function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Department Name?',
        name: 'DepartmentName',
      },
    ]).then((response) => {
      console.log(response)
      db.promise().query(`INSERT INTO department(dept_name) values ('${response.DepartmentName}');`).then(([results]) => {
        console.log(results.affectedRows)
        if (results.affectedRows > 0) {
          viewAllDepartements()
        } else {
          console.info("Failed to add to Database")
          mainMenu()
        }
      })

    })
}

async function addEmployee() {
  const [roles] = await db.promise().query("SELECT * FROM role")
  const rolearray = roles.map(role => ({ name: role.title, value: role.id }))
  const [managers] = await db.promise().query("SELECT * FROM employee")
  const managerarray = managers.map(manager => ({ name: manager.first_name + " " + manager.last_name, value: manager.id }))
  // enter the employee’s first name, last name, role, and manager, and that employee is added to the database
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'First Name',
        name: 'FirsttName',
      },
      {
        type: 'input',
        message: 'Last Name?',
        name: 'LastName',
      },
      {
        type: 'list',
        message: 'What is their role?',
        name: 'role',
        choices: rolearray,
      },
      {
        type: 'list',
        message: 'Who is their manager?',
        name: 'manager',
        choices: managerarray,
      },
    ]).then((response) => {
      console.log(response)
      // const roleobj={title: response.}
      db.promise().query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('${response.FirstName}', '${response.LastName}', '${response.role}', ${response.manager})`)
        .then(([results]) => {
          // console.log(results.affectedRows)
          if (results.affectedRows > 0) {
            viewAllDepartements()
          } else {
            console.info("Failed to add to Database")
            mainMenu()
          }
        })
      // 
    })


  //make an employee object that mach the database
}

function updateEmployeeRole() {
  db.query(`SELECT * FROM employee`), function (err, results) {
    console.log(results)
  }
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Employee Role',
        name: 'Role',
      },
    ]).then((response) => {
      console.log(response);
      db.query(`UPDATE employee(role) SET employee(role)=('${response.Role}') WHERE employee(role)=${response.Role}`), function (err, results) {
        console.log(results)
        mainMenu()
      }
    })
}




mainMenu()
