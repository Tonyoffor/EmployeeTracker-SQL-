var fs = require ("fs");

const mysql = require('mysql2');
const inquirer = require("inquirer")


const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

//create a connection block to connect to mysql mysql create connection
//
function mainmenu(){
  inquirer.prompt({
    type:"list",
    name:"direction",
    messsage: "What would you like to do?",
    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role" ] 
  }).then(answer => {
   if(answer.direction==="view all departments"){
    console.log("view all departments")
    viewAllDepatements()
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
function viewAllDepatements(){
// create query statments use mysql
}

function viewAllRoles(){

}
function viewAllEmployees(){

}
function addRole(){

}
function addDepartment(){

}
function addEmployee(){

}
mainmenu()
