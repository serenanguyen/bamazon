var mysql = require("mysql");
var inquirer = require("inquirer");

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

var restart = function(){
  inquirer.prompt({
    name: "continue",
    type: "list",
    message: "Would you like to make another purchase?",
    choices: ["yes","no"]
  }).then(function(answer){
    if(answer.continue === "yes"){
      start();
    } else{
      process.exit;
    }
  });
}
// start function
var start = function(){
  //display all products
  connection.query("SELECT * FROM products", function(err, res){
    if(err) throw err;
    for(var i = 0; i < res.length; i++){
      console.log(res[i].itemID + " | " +res[i].productName + " | " + res[i].price + " | " + res[i].stockQuantity);
      }
    inquirer.prompt([{
      name: "item",
      type: "input",
      message: "Enter item ID you would like to purchase.",
      validate: function(value){
        if (isNaN(value) === false){
          return true;
        }
          return false;
      }
    },{
      name: "quantity",
      type: "input",
      message: "How many would you like to purchase?",
      validate: function(value){
        if (isNaN(value) === false){
          return true;
        }
          return false;
      }
    }]).then(function(answer){
      var buyerQuantity = parseInt(answer.quantity);
      var buyerItem;
      connection.query("SELECT productName FROM products WHERE ?", {itemID: answer.item}, function(err,res){
          buyerItem = res[0].productName;
      });
      connection.query("SELECT stockQuantity FROM products WHERE ?", {itemID: answer.item}, function(err, res){
        var stockQuantity = parseInt(res[0].stockQuantity);
        if(buyerQuantity < stockQuantity){
          var newQuantity = stockQuantity - buyerQuantity;
          console.log(newQuantity);
          connection.query("UPDATE products SET stockQuantity = ? WHERE ?",[newQuantity,{itemID: answer.item}], function(err,res){});
          console.log("You bought "+buyerQuantity+" "+buyerItem+"s");
        } else{
          console.log("We don't have enough!");
        }
        restart();
      });

    });
  });
};
start();
