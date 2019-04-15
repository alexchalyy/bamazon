/*  This program when executed asks the user to either View Products for Sale (items' ids, names, prices, departments, and quantities), view low inventory (quantity lower then 5), add to inventory (add quantity), add new product, or quit.

    Written by Alex Chalyy on 4/14/2019.    */

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
                    "View Low Inventory",
                    "View Products for Sale",
                    "Add to Inventory",
                    "Add New Product"
                ]
            })
            .then(function (answer) {
                if (answer.action == "Enter product ID") {
                    EnterProductID();
                }
                else if (answer.action == "View Products for Sale") {
                    DisplayProducts();
                } else {
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
    
    function DisplayProducts(status) {
    
        //  This function displays product id, name of product, and price from products table for every row.
    
        var query = "SELECT * FROM products;";
    
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