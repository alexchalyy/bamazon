/*  This script accesses products table in mysql database, reads and displays its contents (product id, name of product, and price). User is prompted to enter the product they want to buy and the quantity of it. If the inputs are valid, the database entries are updates, and the total cost is displayed.

    Written by Alex Chalyy on 4/12/2019.    */

//  Those are packages that are used.

const mysql = require("mysql");
const Inquirer = require("inquirer");
var indexes = [];
var quantities = [];
var prices = [];
var index;
var quantity;

//----------------------------------------------------------------------------

const db = mysql.createConnection({

    //  This establishes connection to db.

    host: "localhost",
    port: 3306,
    user: "root",
    password: "Bootcamp1!?",
    database: "bamazon_db"
});

//----------------------------------------------------------------------------

db.connect(function (err) {

    //  This checks if connection to db was successfull.

    if (err) throw err;
    console.log("connected as id " + db.threadId);
    DisplayProducts();
});

//----------------------------------------------------------------------------

function Start() {

    //  This function prompts the user what product and quantity he/she would like to purchase, updates the db appropriately, until user desires to quit.

    Inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Quit",
                "Enter product ID",
                "Display inventory"
            ]
        })
        .then(function (answer) {
            if (answer.action == "Enter product ID") {
                EnterProductID();
            } 
            else if (answer.action == "Display inventory")  {
                DisplayProducts();
            } else  {
                db.end();
                console.log("Bye!");
            }
        });
}

//----------------------------------------------------------------------------

function EnterProductID() {

    //  This function prompts the user for the product id to enter.

    Inquirer
        .prompt({
            name: "index",
            type: "input",
            message: "Enter product ID: "
        })
        .then(function (answer) {
            var a = answer.index - Math.floor(answer.index) === 0;
            if (answer.index >= 1 && answer.index <= indexes.length && a) {
                index = answer.index;
                EnterQuantity();
            } else {
                console.log("Incorrect input.");
                EnterProductID();
            }
        });
}

//----------------------------------------------------------------------------

function EnterQuantity() {

    //  This function prompts the user for the quantity of item they would like to purchase.

    Inquirer
        .prompt({
            name: "index",
            type: "input",
            message: "Enter product quantity: "
        })
        .then(function (answer) {
            var a = answer.index - Math.floor(answer.index) === 0;
            if (answer.index >= 1 && a) {
                quantity = answer.index;
                if (quantity > quantities[index - 1]) {
                    console.log("Insufficient quantity!");
                    EnterQuantity();
                }
                UpdateDB();
            } else {
                console.log("Incorrect input.");
                EnterQuantity();
            }
        });
}

//----------------------------------------------------------------------------

function UpdateDB() {

    //  This function updates db with bought items and displays cost.

    var new_quantity = (quantities[index - 1] - quantity).toString();
    var string_index = index.toString();
    var query = "UPDATE products SET stock_quantity = " + new_quantity + " WHERE item_id = " + string_index + ";"

    db.query(query, function (err, res) {
        if (err) throw err;
        var cost = prices[index - 1] * quantity;
        console.log("Customer cost: $" + cost.toFixed(2));
        Start();
    });
}

//----------------------------------------------------------------------------

function DisplayProducts() {

    //  This function displays product id, name of product, and price from products table for every row.

    var query = "SELECT * FROM products;";

    db.query(query, function (err, res) {
        if (err) throw err;
        console.log("\n\n  Product ID | Name                      | Department           | Price       "); //| Quantity");
        for (var i = 0; i < res.length; i++) {
            console.log("  " + res[i].item_id + ReturnSpaces(res[i].item_id.toString(), 11) + "| " + res[i].product_name +
                ReturnSpaces(res[i].product_name, 26) + "| " + res[i].department_name + 
                ReturnSpaces(res[i].department_name, 21) + "| " + res[i].price + ReturnSpaces(res[i].price.toString(), 11)); //+ "| " + res[i].stock_quantity);
            indexes.push(res[i].item_id);
            quantities.push(res[i].stock_quantity);
            prices.push(res[i].price);
        }
        Start();
    });
}

//----------------------------------------------------------------------------

function ReturnSpaces(column, spaces) {

    //  This function returns the amount of spaces necessary to make columns aligned in output for a certain row.

    var space = "";

    for (var i = 0; i < (spaces - column.length); i++) {
        space += " ";
    }
    return space;
}