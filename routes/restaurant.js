const router = require("express").Router();
const mysql = require("mysql");
const config = require("../config/config");
const connection = mysql.createConnection(config);

router.put("/:resId", (req, res) => {
  const { orderName, orderId } = req.body;
  const { resId } = req.params;

  if (orderId) {
    const sql = `
              UPDATE orders SET orders.name = ?
              WHERE orders.orderId = ?;
              `;
    const data = [orderName, orderId];

    connection.query(sql, data, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      // get inserted id
      res.status(201).json(fields);
    });
  } else {
    const sql = `
          INSERT INTO orders (name, resId) 
          VALUES (?,?);
          `;

    const data = [orderName, resId];
    connection.query(sql, data, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      // get inserted id
      res.status(201).json(results);
    });
  }
});

router.delete("/:resId", (req, res) => {
  const { resId } = req.params;
  const { orderId } = req.body;

  const sql =
    "DELETE FROM `db`.`orders` WHERE (`orderId` = '?') AND (`resId` = '?');";
  const data = [parseInt(orderId), parseInt(resId)];
  console.log(data);
  connection.query(sql, data, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    // get inserted id

    res.status(201).json(results);
  });
});

router.get("/:resId", (req, res) => {
  const { resId } = req.params;
  const sql = `SELECT name, orderId FROM orders WHERE resId = ?`;

  connection.query(sql, resId, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    // get inserted id

    res.status(200).json(results);
  });
});

module.exports = router;
