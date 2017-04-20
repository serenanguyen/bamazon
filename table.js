var Table = require("cli-table");
var table = new Table({
    head: ['ID', 'Item', 'Price', 'Stock']
  , colWidths: [10, 20, 10, 10]
});

// table is an Array, so you can `push`, `unshift`, `splice` and friends
table.push(
    ['First value', 'Second value']
  , ['First value', 'Second value']
);

console.log(table.toString());
