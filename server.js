var fs = require ("fs");

const mysql = require('mysql2');
const inquirer = require("inquirer")




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
    //call view departments function
   } else if(answer.direction==="view all roles"){
    //call view roles function
   } else if(answer.direction==="view all employees"){

   } else if(answer.direction==="add a department"){

   } else if(answer.direction==="add a role"){

   } else if(answer.direction==="add an employee"){

   } else(answer.direction==="update an employee role")
  }) 

}
mainmenu()
