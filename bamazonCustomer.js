var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mRm@09051981",
  database: "bamazon"
});

var input = [];

function validateInput(value) {
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);

  if (integer && (sign === 1)) {
    return true;
  } else {
    return "Please enter a whole non-zero number.";
  }
};



function itemList(err, results) {
  connection.query("select item_id, product_name, price from products", function (err, results) {
    if (err) throw err;
    var string = "";
    for (var i = 0; i < results.length; i++) {
      string = "";
      string += "Item ID: " + results[i].item_id + " //  ";
      string += "Product Name: " + results[i].product_name + "  //  ";
      string += 'Price: $' + results[i].price + '\n';

      console.log(string);
    }
    placeOrder();
  });
};
function placeOrder() {
  inquirer.prompt([
    {
      name: "item_id",
      type: "input",
      message: "What would you like to buy? Please enter item Id.\n",
      validate: validateInput,
      filter: Number
    },
    {
      name: "stock_quantity",
      type: "input",
      message: "How many would you like? Please enter a number.\n",
      validate: validateInput,
      filter: Number
    }
  ]).then(function (answer) {

    var item = answer.item_id;
    var quan = answer.stock_quantity;

    var query = "select * from products where ?";

    connection.query(query, { item_id: item }, function (err, res) {
      if (err) throw err;


      if (res.length == 0) {
        console.log("ERROR: Invalid Item ID. Please select a valid Item ID.");
        displayInventory();

      } else {
        var productData = res[0];

        if (quan <= productData.stock_quantity) {
          console.log("Congratulations, the product you requested is in stock! Placing order!");


          var updateQuery = "update products set stock_quantity = " + (productData.stock_quantity - quan) + " where item_id = " + item;

          connection.query(updateQuery, function (err, res) {
            if (err) throw err;
            console.log("Your order has been placed! Your total is $" + productData.price * quan);
            //console.log("Thank you for shopping with us!");
            //console.log("\n---------------------------------------------------------------------\n");
            anotherPurchase();
            //connection.end();
          })
        } else {
        console.log("Sorry, there is not enough product in stock, your order can not be placed as is.");
        console.log("Please modify your order.");
        console.log("\n---------------------------------------------------------------------\n");

        itemList();
        //startBamazon();
        }
      }
    });
  })
}

function anotherPurchase() {
  inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "Would you like to place another order?"
    }
  ]).then(function (answer) {
    if (answer.confirm) {
      itemList();
    } else {
      console.log("Goodbye!");
      connection.end();
    }
  })
}


function startBamazon() {
  connection.connect(function (err, ) {
    if (err) {
      throw err;
    }
    console.log("Welcome to Bamazon!");
    //itemList();
  });
  itemList();
};
startBamazon();
