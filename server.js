var fs = require ("fs");

const mysql = require('mysql2');
const inquirer = require("inquirer")
const express = require("express")

const PORT = process.env.PORT || 3001;
const app = express();



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

//create a connection block to connect to mysql mysql create connection
//
function mainMenu(){
  inquirer.prompt({
    type:"list",
    name:"direction",
    messsage: "What would you like to do?",
    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role" ] 
  }).then(answer => {
   if(answer.direction==="view all departments"){
    console.log("view all departments")
    viewAllDepartements()
   } else if(answer.direction==="view all roles"){
    console.log("view all roles")
    viewAllRoles()
   } else if(answer.direction==="view all employees"){
    console.log("view all employees")
    viewAllEmployees()
   } else if(answer.direction==="add a department"){
    console.log("add a department")
   } else if(answer.direction==="add a role"){
    console.log("add a role")
    addRole()
   } else if(answer.direction==="add an employee"){
    console.log("add an employee")
    addDepartment()
   } else(answer.direction==="update an employee role")
    console.log("add an employee")
    addEmployee()
  }) 

}
function viewAllDepartements(){
// create query statments use mysql

db.query('SELECT * FROM department', function (err, results) {
  console.log(results);
});

}

function viewAllRoles(){
  db.query('SELECT * FROM role', function (err, results) {
    console.log(results);
})}
function viewAllEmployees(){
  db.query('SELECT * FROM employee', function (err, results) {
    console.log(results);
})
}
function addRole(){

  
  // enter the name, salary, and department for the role and that role is added to the database
  inquirer
  .prompt([
    {
      type: 'input',
      message: ' What is the role name?',
      name: 'RoleName',
    },
    {
      type: 'input',
      message: 'What is the salary amount?',
      name: 'Salary',
    },
    {
      type: 'input',
      message: 'Department Name?',
      name: 'DepartmentName',
    },
   

]).then((response) =>{
  console.log(response)
       let Role = Role(response.RoleName, response.Salary, response.DepartmentName)
        team.push(Role)
     console.log(response)
        mainMenu()
        
      });



}
function addDepartment(){

// enter the name of the department and that department is added to the database
inquirer
  .prompt([
    {
      type: 'input',
      message: 'Department Name?',
      name: 'DepartmentName',
    },
    
   

]).then((response) =>{
  console.log(response)
       let Department = Department(response.DepartmentName)
        team.push(Department)
     console.log(response)
        mainMenu()
        
      });



}
function addEmployee(){

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
      type: 'input',
      message: 'Department Name?',
      name: 'DepartmentName',
    },
   

]).then((response) =>{
  console.log(response)
       let Department = Department(response.DepartmentName)
        team.push(Department)
     console.log(response)
        mainMenu()
        
      });



}
mainMenu()
