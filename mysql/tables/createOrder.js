const mysql = require("mysql");
const config = require("../../config/config");

let connection = mysql.createConnection(config);

// connect to the MySQL server
connection.connect(function(err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  let createOrder = `
                            CREATE TABLE IF NOT EXISTS orders(
                                orderId INT PRIMARY KEY AUTO_INCREMENT,
                                resId INT NOT NULL,
                                name varchar(255) NOT NULL,
                                FOREIGN KEY fk_restaurants_orders (resId) 
                                   REFERENCES restaurants (resId) 
                            );`;

  connection.query(createOrder, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  connection.end(function(err) {
    if (err) {
      return console.log(err.message);
    }
  });
});
