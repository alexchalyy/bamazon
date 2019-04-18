/*  This sql script:

    1. Creates bamazon_db database (deletes it if it exists before).

    2. Create products table with:

            item_id (unique id for each product)    DONE.

            product_name (Name of product) DONE.

            department_name DONE.

            price (cost to customer) DONE.

            stock_quantity (how much of the product is available in stores) DONE.

    Written by Alex Chalyy on 4/12/2019.    */

DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30),
    department_name VARCHAR(30),
    price DECIMAL(6,2),
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

/*-----------------------------------------------------------------------*/

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("toothpicks", "miscellaneous", 1.99, 20);

/*-----------------------------------------------------------------------*/

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("floss", "personal care", 2.99, 30);

/*-----------------------------------------------------------------------*/

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("corona light", "alcohol", 10.99, 15);

/*-----------------------------------------------------------------------*/

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("toothpaste", "personal care", 5.99, 15);

/*-----------------------------------------------------------------------*/

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pizza pockets", "food", 4.99, 40);

/*-----------------------------------------------------------------------*/

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("magnum ice cream", "food", 1.99, 50);

/*-----------------------------------------------------------------------*/

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tylenol", "medication", 5.99, 50);

/*-----------------------------------------------------------------------*/

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("aspirin", "medication", 1.99, 30);

/*-----------------------------------------------------------------------*/

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tissues", "miscellaneous", 2.99, 25);

/*-----------------------------------------------------------------------*/

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("rubber ducks", "toys", 4.99, 25);

/*-----------------------------------------------------------------------*/

CREATE TABLE departments(
	department_id INT AUTO_INCREMENT NOT NULL,
	department_name VARCHAR(45) NOT NULL,
	over_head_costs DECIMAL(10, 2) NOT NULL,
    primary key(department_id)
);

/*-----------------------------------------------------------------------*/

INSERT INTO departments(department_name, over_head_costs)
VALUES ("toys", 100);

/*-----------------------------------------------------------------------*/

INSERT INTO departments(department_name, over_head_costs)
VALUES ("miscellaneous", 0);

/*-----------------------------------------------------------------------*/

INSERT INTO departments(department_name, over_head_costs)
VALUES ("medication", 14);

/*-----------------------------------------------------------------------*/

INSERT INTO departments(department_name, over_head_costs)
VALUES ("food", 34);

/*-----------------------------------------------------------------------*/

INSERT INTO departments(department_name, over_head_costs)
VALUES ("personal care", 34);

SELECT * FROM products;

SELECT * FROM departments;
