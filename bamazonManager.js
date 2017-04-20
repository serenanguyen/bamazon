var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database:"bamazonDB"
});
//connect to db
connection.connect(function(err){
  if(err) throw err;
});

var start = function(){
  inquirer.prompt({
    name: "options",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View Products for Sale",
      "View Low Inventory",
      "Add to Inventory",
      "Add New Product"
    ]
  }).then(function(answer){
    if(answer.options === "View Products for Sale"){
      view();
    } else if(answer.options === "View Low Inventory"){
      low();
    } else if(answer.options === "Add to Inventory"){
      add();
    } else if(answer.options === "Add New Product"){
      newProduct();
    }
  });
}
start();

var view = function(){
  // select all items from products
  connection.query("SELECT * FROM products", function(err, res){
  if(err) throw err;
  for(var i = 0; i < res.length; i++){
    console.log(res[i].itemID + " | " +res[i].productName + " | " + res[i].price + " | " + res[i].stockQuantity);
    }
    start();
  });

};

var low = function(){
  // select all items from products where stock is less than 5
  connection.query("SELECT * FROM products WHERE stockQuantity < 5", function(err,res){
    if(err) throw err;
    for(var i = 0; i < res.length; i++){
      console.log(res[i].itemID + " | " +res[i].productName + " | " + res[i].stockQuantity);
      }
    start();
  });
};

var add = function(){
  connection.query("SELECT * FROM products", function(err, res){
  if(err) throw err;
  for(var i = 0; i < res.length; i++){
    console.log(res[i].itemID + " | " +res[i].productName + " | " + res[i].price + " | " + res[i].stockQuantity);
    }
    inquirer.prompt([{
      name: "item",
      type: "input",
      message: "Enter item ID you would like to restock.",
      validate: function(value){
        if (isNaN(value) === false){
          return true;
        }
          return false;
      }
    },{
      name: "quantity",
      type: "input",
      message: "How much would you like to add?",
      validate: function(value){
        if (isNaN(value) === false){
          return true;
        }
          return false;
      }
    }]).then(function(answer){
      var addQuantity = parseInt(answer.quantity);
      var addItem;
      connection.query("SELECT productName FROM products WHERE ?", {itemID: answer.item}, function(err,res){
        addItem = res[0].productName;
      });
      console.log("You want to add "+addQuantity+" "+addItem+"s");
    })
  });
};

var newProduct = function(){
  inquirer.prompt([{
    name: "newItem",
    type: "input",
    message: "What item would you like to add?"
  },{
    name: "department",
    type: "input",
    message: "What department is this in?"
  },{
    name: "price",
    type: "input",
    message: "What should be the listed price?",
    validate: function(value){
      if (isNaN(value) === false){
        return true;
      }
        return false;
    }
  },{
    name:"stock",
    type:"input",
    message:"How many would you like to add?",
    validate: function(value){
      if (isNaN(value) === false){
        return true;
      }
        return false;
    }
  }]).then(function(answer){
    connection.query("INSERT INTO bamazonDB.products (productName, departmentName, price, stockQuantity) VALUES ?",[answer.newItem, answer.department, answer.price, answer.stock],function(err,res){
      console.log(answer.newItem);
    })
  })

};
