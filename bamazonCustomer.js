var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database:"bamazonDB"
});

var display = function(){
  connection.query("SELECT * FROM products", function(err, res){
    if(err) throw err;
    for(var i = 0; i < res.length; i++){
      console.log(res[i].productName + " | " + res[i].departmentName+" | "+ res[i].price + " | " + res[i].stockQuantity);
      }
  })
}
// establish connection
connection.connect(function(err){
  if(err) throw err;
  console.log("connected");
  display();
});
