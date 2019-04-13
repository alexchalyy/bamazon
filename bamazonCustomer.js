/*  This script accesses products table in mysql database, reads and displays its contents (product id, name of product, and price). User is prompted to enter the product they want to buy and the quantity of it. If the inputs are valid, the database entries are updates, and the total cost is displayed.

    Written by Alex Chalyy on 4/12/2019.    */

//  Those are packages that are used.

const mysql = require("mysql");
const Table = require("cli-table");
const Inquirer = require("inquirer");

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

db.connect(function(err)   {

//  This checks if connection to db was successfull.

    if (err) throw err;
    console.log("connected as id " + db.threadId);
});

//----------------------------------------------------------------------------

function ItemsForSale() {
    db.query("SELECT * FROM products", function(error, res) {
        var table = new Table({
            head: ["item id", "product name", "department", "price", "quantity"],
            colWidths: [10, 28, 22, 10, 10]
        });

    }
}