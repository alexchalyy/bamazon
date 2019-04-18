# bamazon

# Homework Description

# Customer View

This program contacts product inventory database and displays the results as shown below including unique product id, product name, department, and product price. Afterwards the user is prompted to either quit, enter product id, or display inventory.

![product inventory](images/display_inventory.PNG)

If the user chooses quit option, the program terminates as shown below.

![quit](images/quit.PNG)

If the user chooses display inventory, inventory is displayed again as shown in the first image, and user is asked the same question.

If the user chooses enter product id option, user is prompted for a unique product id to be entered as shown below.

![product id](images/product_id.PNG)

If the user enters valid product id, the user is then asked to enter product quantity as shown below.

![product quantity](images/product_quantity.PNG)

Afterwards, total product cost is displayed database is updated, and user is again asked to either choose quit, enter product id, or display inventory as shown below.

![update](images/update.PNG)

If the user enters product quantity that is greater than the one in database, "Insufficient quantity" message is displayed. and user is asked to enter quantity again, as shown below:

![insufficient quantity](images/insufficient.PNG)

Input validation is used everywhere.

# Manager View

In this part of homework (similar to previous part), user has options to quit, view low inventory, view products for sale, add to inventory, and add new product.

The quit option is exactly the same as before.

If user chooses to view products for sale, product id, name, department, price, and quantity are displayed from the products table in console (screenshot is below). Afterwards, user is given the same options.

![manager inventory](images/manager_inventory.PNG)

If user chooses view low inventory, only products with quantities less then 5 are displayed (as shown below).

![low inventory](images/low_inventory.PNG)

If user chooses add to inventory option, user is asked for product id and how much he/she would like to add to existing product quantities. When the user enters valid values, the database is updated properly (shown below).

![add quantity](images/manager_add_quantity.PNG)

If user chooses add new product option, user is asked to enter new unique product name, department name, price, and quantity. Afterwards, new product is added to database.

![add new product](images/add_new_product.PNG)

# Homework Creation Process

The program was created in javascript using node.js, mysql and inquirer packages. Database was set up in MySQL Workbench.