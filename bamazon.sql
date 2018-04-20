create database bamazon;
use bamazon;
create table products (
	item_id integer auto_increment not null,
    product_name varchar (100),
    department_name varchar (100),
    price integer default 0,
    stock_quantity integer default 0,
    primary key (item_id)
    );
insert into products (product_name, department_name, price, stock_quantity) values ("coffee cup", "housewares", 3.00, 500);
insert into products (product_name, department_name, price, stock_quantity) values ("Bluetooth Speaker", "electronics", 70.00, 100);
insert into products (product_name, department_name, price, stock_quantity) values ("Socks", "clothing", 10.00, 600);
insert into products (product_name, department_name, price, stock_quantity) values ("Batteries", "electronics", 8.00, 50);
insert into products (product_name, department_name, price, stock_quantity) values ("Rug", "housewares", 20.00, 250);
insert into products (product_name, department_name, price, stock_quantity) values ("Jeans", "clothing", 40.00, 15);
insert into products (product_name, department_name, price, stock_quantity) values ("Paint", "hardware", 13.00, 500);
insert into products (product_name, department_name, price, stock_quantity) values ("Shovel", "hardware", 30.00, 137);
insert into products (product_name, department_name, price, stock_quantity) values ("Hat", "clothing", 7.50, 321);
insert into products (product_name, department_name, price, stock_quantity) values ("Lamp", "housewares", 45, 100);
insert into products (product_name, department_name, price, stock_quantity) values ("Remote Control", "electronics", 11.25, 999);
insert into products (product_name, department_name, price, stock_quantity) values ("Hammer", "hardware", 4.00, 85);
alter table products modify price float (10, 2);
update products set stock_quantity = 100 where item_id = 6;
update products set price = 8.50 where item_id = 9;
update products set price = 13.69 where item_id = 7;