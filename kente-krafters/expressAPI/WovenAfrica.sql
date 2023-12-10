drop DATABASE if exists wovenafricaglobal;
CREATE DATABASE wovenafricaglobal;
use wovenafricaglobal;

CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    country VARCHAR(25) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    user_passwordhash varchar(50) NOT NULL,
    user_role ENUM('customer', 'seller', 'admin') NOT NULL,
    user_status ENUM('inactive', 'active', 'deleted') NOT NULL
);

CREATE TABLE Seller(
    user_id INT NOT NULL UNIQUE,
    ghana_region ENUM('Ashanti', 'Brong-Ahafo', 'Central', 'Eastern', 'Greater Accra', 'Northern', 'Upper East', 'Upper West', 'Volta', 'Western', 'Ahafo', 'Bono', 'Bono East', 'North East', 'Oti', 'Savannah') NOT NULL,
    seller_tel_no char(11) NOT NULL UNIQUE,
    momo_number varchar(11) NOT NULL UNIQUE,
    address VARCHAR(255) NOT NULL UNIQUE,
    DOB DATE NOT NULL,
    sex CHAR(1) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE Customer (
    user_id INT UNIQUE,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- Admin table (Specialization of User)
CREATE TABLE WovenAdmin (
    user_id INT NOT NULL UNIQUE,
    admin_tel_no char(11),
    admin_role VARCHAR(50),
    address VARCHAR(255) NOT NULL,
    DOB DATE NOT NULL,
    sex CHAR(1) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- Product table
CREATE TABLE Product (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    seller_id INT NOT NULL UNIQUE,
    product_name varchar(50) NOT NULL,
    yards INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image_link VARCHAR(255) NOT NULL,
    approval_status ENUM('inactive', 'active', 'deleted') NOT NULL,
    date_created DATETIME,
    FOREIGN KEY (seller_id) REFERENCES Seller(user_id)
);

CREATE TABLE StoleProduct (
    product_id INT NOT NULL UNIQUE,
    width DECIMAL(10,2) NOT NULL,
    length DECIMAL(10,2) NOT NULL,
    texture varchar(50),
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

CREATE TABLE CustomFabricProduct (
    product_id INT NOT NULL UNIQUE,
    template_link varchar(600) NOT NULL UNIQUE,
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

CREATE TABLE Cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT UNIQUE,
    FOREIGN KEY (customer_id) REFERENCES Customer(user_id)
);

CREATE TABLE CartProduct (
    cart_id INT,
    product_id INT NOT NULL UNIQUE,
    quantity INT NOT NULL,
    dateCarted DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (cart_id, product_id),
    FOREIGN KEY (cart_id) REFERENCES Cart(cart_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

-- Payment table
CREATE TABLE Payment(
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    seller_id INT NOT NULL,
    customer_id INT NOT NULL,
    transaction_amount DECIMAL(10, 2),
    transaction_date DATETIME,
    FOREIGN KEY (cart_id) REFERENCES Cart(cart_id),
    FOREIGN KEY (seller_id) REFERENCES Seller(user_id),
    FOREIGN KEY (customer_id) REFERENCES Customer(user_id)
);

-- MTNPayments table
CREATE TABLE MTNPayments(
   payment_id INT PRIMARY KEY,
   momo_transaction_id VARCHAR(50) NOT NULL UNIQUE,
   payer_number VARCHAR(11) NOT NULL,
   payee_number VARCHAR(11) NOT NULL,
   reference VARCHAR(50),
   FOREIGN KEY (payment_id) REFERENCES Payment(payment_id)
);

-- VisaPayments table
CREATE TABLE VisaPayments(
    payment_id INT NOT NULL UNIQUE,
    visa_transaction_id INT UNIQUE,
    card_number VARCHAR(16),
    card_expiration_date DATE,
    card_cvv VARCHAR(3),
    payment_status VARCHAR(20),
    FOREIGN KEY (payment_id) REFERENCES Payment(payment_id)
);

CREATE TABLE ProductOrder(
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    customer_id INT NOT NULL,
    seller_id INT NOT NULL,
    payment_id INT NOT NULL,
    country VARCHAR(100),
    postal_code VARCHAR(25),
    delivery_address VARCHAR(255),
    delivery_method VARCHAR(255),
    order_status ENUM('delivered', 'in-transit', 'pending'),
    quantity INT,
    product_id INT,
    unit_price DECIMAL(10, 2),
    total_price DECIMAL(10, 2),
    seller_fulfilled VARCHAR(3) DEFAULT 'NO' CHECK (seller_fulfilled IN ('YES', 'NO')),
    FOREIGN KEY (cart_id) REFERENCES Cart(cart_id),
    FOREIGN KEY (customer_id) REFERENCES Customer(user_id),
    FOREIGN KEY (seller_id) REFERENCES Seller(user_id),
    FOREIGN KEY (payment_id) REFERENCES Payment(payment_id)
);

-- StoleOrderDetails table (Specialization of OrderDetail)
CREATE TABLE StoleOrderDetails(
    order_id INT PRIMARY KEY,
    texture VARCHAR(50),
    color VARCHAR(50) NOT NULL,
    width INT NOT NULL,
    height INT NOT NULL,
    logo_link VARCHAR(255),
    final_design_link varchar(600) NOT NULL UNIQUE,
    FOREIGN KEY (order_id) REFERENCES ProductOrder(order_id)
);

-- CustomFabricOrderDetails table (Specialization of OrderDetail)
CREATE TABLE CustomFabricOrderDetails(
    order_id INT PRIMARY KEY,
    texture VARCHAR(50),
    final_design_link varchar(600) NOT NULL UNIQUE,
    width INT NOT NULL,
    height INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES ProductOrder(order_id)
);

-- Shipment table
CREATE TABLE Shipment(
    shipment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL UNIQUE,
    delivery_status VARCHAR(50) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES ProductOrder(order_id)
);


-- FedExShipment table
CREATE TABLE FedExShipment(
    shipment_id INT PRIMARY KEY,
    order_id INT UNIQUE,
    tracking_number VARCHAR(50) NOT NULL,
    estimated_delivery_date DATE,
    special_instructions VARCHAR(255),
    FOREIGN KEY (shipment_id) REFERENCES Shipment(shipment_id),
    FOREIGN KEY (order_id) REFERENCES ProductOrder(order_id)
);

-- DHLShipment table
CREATE TABLE DHLShipment(
    shipment_id INT PRIMARY KEY,
    order_id INT UNIQUE,
    tracking_number VARCHAR(50) NOT NULL,
    customs_declaration VARCHAR(255),
    delivery_time_window VARCHAR(100),
    FOREIGN KEY (order_id) REFERENCES Shipment(order_id)
);

CREATE TABLE GhanaPostShipment(
    shipment_id INT PRIMARY KEY,
    order_id INT UNIQUE,
    tracking_number VARCHAR(50) NOT NULL,
    customs_declaration VARCHAR(255),
    FOREIGN KEY (order_id) REFERENCES Shipment(order_id)
);

-- TelephoneUser table
CREATE TABLE TelephoneUser(
    tel_no VARCHAR(15) PRIMARY KEY,
    user_id INT,
    FOREIGN KEY(user_id) REFERENCES Customer(user_id)
);