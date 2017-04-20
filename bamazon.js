var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var bamazonManager = require("./bamazonManager");
var bamazonCustomer = require("./bamazonCustomer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database:"bamazonDB"
});

connection.connect(function(err){
  if(err) throw err;
  // console.log("connected");
});

inquirer.prompt({
  name: "login",
  type: "list",
  message: "How would you like to proceed?",
  choices: ["Customer","Manager"]
}).then(function(answer){
  if(answer.login === "Customer"){
    bamazonCustomer();
  } else if(answer.login === "Manager"){
    bamazonManager();
  }
});
