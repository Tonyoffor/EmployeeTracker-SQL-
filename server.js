var fs = require ("fs");

const mysql = require('mysql2');
const inquirer = require("inquirer")
const express = require("express");
const { Console } = require("console");
const { response } = require("express"); //you want your responses to go through express so that is why you require express twice .. I think

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
function mainMenu(){
  inquirer.prompt({
    type:"list",
    name:"direction",
    messsage: "What would you like to do?",
    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role" ] //remember mysql is unforgiving so all these strings need to be the same everywhere so try not to leave unneeded space
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
    addDepartment()
   } else if(answer.direction==="add a role"){
    console.log("add a role")
    addRole()
   } else if(answer.direction==="add an employee"){
    console.log("add an employee")
    addEmployee()
   } else(answer.direction==="update an employee role")
    console.log("update an employee role")
    updateEmployeeRole()
  }) 

}
function viewAllDepartements(){
// create query statments use mysql
db.query('SELECT * FROM department', function (err, results) {
  console.log(results);
})}

function viewAllRoles(){
  db.query('SELECT * FROM role', function (err, results) {
    console.log(results);
})}
function viewAllEmployees(){
  db.query('SELECT * FROM employee', function (err, results) {
    console.log(results);
})
}
function addRole(){ //make sure your snytax down here match with those in your schema.sql
 db.query(`INSERT INTO role(role_id) values ('${response.RoleName}', '${response.Salary}', '${response.DepartmentName}')`), function(err, results){
  console.log(results);
 }
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

//remember that each function needs its own db.query to connect to the mysql
function addDepartment(){

  inquirer
  .prompt([
    {
      type: 'input',
      message: 'Department Name?',
      name: 'DepartmentName',
    },
]).then((response) =>{
  console.log(response)
  db.query(`INSERT INTO department(dept_name) values ('${response.DepartmentName}');`), function(err,results){
    console.log(results)
   }
    //     team.push(Department)
    //  console.log(response)
       mainMenu()
      });
}

function addEmployee(){

  db.query(`INSERT INTO employee(employee_id) values ('${response.FirstName}', '${response.LastName}', '${response.role}', '${response.manager}')`), function(err,results){
    console.log(results)
  }
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
      message: 'What is their role?',
      name: 'role',
    },
    {
      type: 'input',
      message: 'Who is their manager?',
      name: 'manager',
    },
]).then((response) =>{
  console.log(response) 
      });
}

function updateEmployeeRole(){
  db.query(`UPDATE employee(role) values ('${response.role}')`), function(err,results){
    console.log(results)
  }
  inquirer
  .prompt([
    {
      type: 'input',
      message: 'Employee Role',
      name: 'Role',
    },
]).then((response) =>{
  console.log(response)  
})}


mainMenu()
