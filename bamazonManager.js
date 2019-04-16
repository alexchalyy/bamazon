/*  This program when executed asks the user to either View Products for Sale (items' ids, names, prices, departments, and quantities), view low inventory (quantity lower then 5), add to inventory (add quantity), add new product, or quit.

    Written by Alex Chalyy on 4/14/2019.    */

const mysql = require("mysql");
const Inquirer = require("inquirer");
var indexes = [];
var quantities = [];
var prices = [];
var names = [];
var index;
var quantity;
var new_product;
var new_product_department;
var new_product_price;

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
    DisplayProducts("");
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
                "View Low Inventory",
                "View Products for Sale",
                "Add to Inventory",
                "Add New Product"
            ]
        })
        .then(function (answer) {
            if (answer.action == "View Low Inventory") {
                DisplayProducts(" WHERE stock_quantity <= 5");
            }
            else if (answer.action == "View Products for Sale") {
                DisplayProducts("");
            }
            else if (answer.action == "Add to Inventory") {
                EnterProductID();
            }
            else if (answer.action == "Add New Product") {
                EnterNewProductName();
            } else {
                db.end();
                console.log("Bye!");
            }
        });
}

//----------------------------------------------------------------------------

function EnterNewProductName() {

    //  This function prompts the user to enter new product name until he/she enters it.

    Inquirer
        .prompt({
            name: "index",
            type: "input",
            message: "Enter new product name: "
        })
        .then(function (answer) {
            var letters = /^[A-Za-z]+$/;
            if (names.includes(answer.index.toString())) {
                console.log("This product is already in the inventory, please enter a unique product.");
                EnterNewProductName();
            }
            else if (answer.index == '') {
                EnterNewProductName();
            } else if (!answer.index.toString().match(letters)) {
                console.log("Contains non-letter characters. Please try again.");
                EnterNewProductName();
            }
            else {
                new_product = answer.index.toString();
                EnterNewDepartment();
            }
        });
}

//----------------------------------------------------------------------------

function EnterNewDepartment() {

    //  This function asks user to enter new department.

    Inquirer
        .prompt({
            name: "index",
            type: "input",
            message: "Enter new product department name: "
        })
        .then(function (answer) {
            var letters = /^[A-Za-z]+$/;
            if (answer.index == '') {
                EnterNewDepartment();
            } else if (!answer.index.toString().match(letters)) {
                console.log("Contains non-letter characters. Please try again.");
                EnterNewDepartment();
            }
            else {
                new_product_department = answer.index.toString();
                EnterNewProductPrice();
            }
        });
}

//----------------------------------------------------------------------------

function EnterNewProductPrice() {

    //  This function accepts correct format of new product price.

    Inquirer
        .prompt({
            name: "index",
            type: "input",
            message: "Enter new product price: "
        })
        .then(function (answer) {
            if (answer.index == '') {
                EnterNewProductPrice();
            } else if (isNaN(answer.index)) {
                console.log("This is not a valid price.");
                EnterNewProductPrice();
            }
            else {
                new_product_price = parseFloat(answer.index).toString();
                console.log(new_product_price);
                EnterQuantity();
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
                EnterNewProduct();
                //                UpdateDB();
            } else {
                console.log("Incorrect input.");
                EnterQuantity();
            }
        });
}

//----------------------------------------------------------------------------

function EnterNewProduct() {

    //  This function enters new unique product into db.

    var query = "INSERT INTO products (product_name, department_name, price, stock_quantity)";
    query += " VALUES (\"" + new_product + "\", \"" + new_product_department + "\", " + new_product_price + ", " +
        quantity.toString() + ");";

    db.query(query, function (err, res) {
        if (err) throw err;
        Start();
    });
}

//----------------------------------------------------------------------------

function UpdateDB() {

    //  This function updates db with bought items and displays cost.

    var new_quantity = (parseInt(quantities[index - 1]) + parseInt(quantity)).toString();
    var string_index = index.toString();
    var query = "UPDATE products SET stock_quantity = " + new_quantity + " WHERE item_id = " + string_index + ";"

    db.query(query, function (err, res) {
        if (err) throw err;
        var cost = prices[index - 1] * quantity;
        Start();
    });
}

//----------------------------------------------------------------------------

function DisplayProducts(append_query) {

    //  This function displays product id, name of product, and price from products table for every row.

    var query = "SELECT * FROM products" + append_query + ";";

    db.query(query, function (err, res) {
        if (err) throw err;
        console.log("\n\n  Product ID | Name                      | Department           | Price      | Quantity");
        for (var i = 0; i < res.length; i++) {
            console.log("  " + res[i].item_id + ReturnSpaces(res[i].item_id.toString(), 11) + "| " + res[i].product_name +
                ReturnSpaces(res[i].product_name, 26) + "| " + res[i].department_name +
                ReturnSpaces(res[i].department_name, 21) + "| " + res[i].price + ReturnSpaces(res[i].price.toString(), 11) + "| " + res[i].stock_quantity);
            indexes.push(res[i].item_id);
            quantities.push(res[i].stock_quantity);
            prices.push(res[i].price);
            names.push(res[i].product_name);
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