const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

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

function DisplayProducts() {

    //  This function displays product id, name of product, and price from products table for every row.

    var query = "SELECT * FROM products;";

    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        inquireSupervisor();
    });
}

//----------------------------------------------------------------------------

function inquireSupervisor() {

    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: ["View Product Sales by Department", "Create a new department", "Quit"]
        }
    ]).then(function(answer){
        switch(answer.choices) {
            case "View Product Sales by Department":
                ViewSales();
                break;

            case "Create a new department":
                CreateDepartment(); 
                break;

            case "Quit":
                console.log("Bye");
                process.exit(0);
                break;
        }
    })
}

//----------------------------------------------------------------------------

function ViewSales()    {
    var query = "SELECT department_id, department_name, over_head_costs, product_sales, total_profit FROM products;"
}