const mysql = require("mysql");
const config = require("../../config/config");
let connection = mysql.createConnection(config);

// connect to the MySQL server
connection.connect(function(err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  let createRestaurants = `
                          CREATE TABLE IF NOT EXISTS restaurants(
                                resId INT PRIMARY KEY AUTO_INCREMENT,
                                name varchar(255) NOT NULL
                                );`;
  connection.query(createRestaurants, function(err, results, fields) {
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
