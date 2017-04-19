CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	itemID INTEGER(11) AUTO_INCREMENT PRIMARY KEY,
    productName VARCHAR(45) NOT NULL,
    departmentName VARCHAR(45) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stockQuantity INTEGER(11) NOT NULL
);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("flashlight", "hardware", 5.00, 10);
INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("hammer", "hardware", 7.00, 10);
INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("tent", "outdoors", 50.00, 10);
INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("hammock", "outdoors", 25.00, 10);
INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("bike", "outdoors", 85.00, 10);
INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("blender", "kitchen", 30.00, 10);
INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("juicer", "kitchen", 40.00, 10);
INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("ice cream scoop", "kitchen", 8.00, 10);
INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("cargo shorts", "clothing", 25.00, 10);
INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("sweater", "clothing", 20.00, 10);