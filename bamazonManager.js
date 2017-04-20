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
  var Table = require("cli-table");
  var table = new Table({
      head: ['ID', 'Item', 'Price', 'Stock']
    , colWidths: [10, 20, 10, 10]
  });
  // for each result print a new array
  for(var i = 0; i < res.length; i++){
    table.push([res[i].itemID, res[i].productName, res[i].price, res[i].stockQuantity])
    }
    // print table to terminal
  console.log(table.toString());
    start();
  });

};

var low = function(){
  // select all items from products where stock is less than 5
  connection.query("SELECT * FROM products WHERE stockQuantity < 5", function(err,res){
    if(err) throw err;
    var Table = require("cli-table");
    var table = new Table({
        head: ['ID', 'Item', 'Price', 'Stock']
      , colWidths: [10, 20, 10, 10]
    });
    // for each result print a new array
    for(var i = 0; i < res.length; i++){
      table.push([res[i].itemID, res[i].productName, res[i].price, res[i].stockQuantity])
      }
      // print table to terminal
    console.log(table.toString());
    start();
  });
};

var add = function(){
  connection.query("SELECT * FROM products", function(err, res){
  if(err) throw err;
  var Table = require("cli-table");
  var table = new Table({
      head: ['ID', 'Item', 'Price', 'Stock']
    , colWidths: [10, 20, 10, 10]
  });
  // for each result print a new array
  for(var i = 0; i < res.length; i++){
    table.push([res[i].itemID, res[i].productName, res[i].price, res[i].stockQuantity])
    }
    // print table to terminal
  console.log(table.toString());
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
      connection.query("SELECT stockQuantity FROM products WHERE ?", {itemID: answer.item}, function(err, res){
        var stockQuantity = parseInt(res[0].stockQuantity);
        var newQuantity = stockQuantity + addQuantity
        console.log(newQuantity);
        connection.query("UPDATE products SET stockQuantity = ? WHERE ?",[newQuantity,{itemID: answer.item}], function(err,res){});
              console.log("You want to add "+addQuantity+" "+addItem+"s");
        view();
      })

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
    connection.query("INSERT INTO products SET ?",{
      productName: answer.newItem,
      departmentName: answer.department,
      price: answer.price,
      stockQuantity: answer.stock
    },function(err,res){});
    view();
  });

};
