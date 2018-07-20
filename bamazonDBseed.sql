CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(id),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DEC(10,2) NOT NULL,
    quantity INT(5) NOT NULL,
);

INSERT INTO products(name,category,price,quantity)
VALUES ("controller","hardware",20.50,100);


INSERT INTO products(name,category,price,quantity)
VALUES ("headset","hardware",30,50);

INSERT INTO products(name,category,price,quantity)
VALUES ("paper towels","house ware",5,1000);

INSERT INTO products(name,category,price,quantity)
VALUES ("napkins","house ware",5,1000);

INSERT INTO products(name,category,price,quantity)
VALUES ("sofa","funiture",75,500);

INSERT INTO products(name,category,price,quantity)
VALUES ("lamp","funiture",50,1000);

INSERT INTO products(name,category,price,quantity)
VALUES ("TV","hardware",1000,5);

INSERT INTO products(name,category,price,quantity)
VALUES ("coffee table","funiture",50,65);


USE bamazon;

CREATE TABLE departments(
    deparment_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs DECIMAL(10,4),
    PRIMARY KEY(deparment_id)
);

ALTER TABLE products
ADD product_sales DECIMAL(5,3);