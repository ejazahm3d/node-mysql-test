const router = require("express").Router();
const mysql = require("mysql");
const config = require("../config/config");
const connection = mysql.createConnection(config);
const { check, validationResult } = require("express-validator");

// @route       PUT  api/restaurants
// @description Create or Update a post
// @access      Public
// If the id isnt provided, it will create a new order.
//If the id is provided, It will update modify older one
router.put(
  "/:resId",
  [
    check("orderName", "Order Name is required")
      .not()
      .isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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

        res.status(201).json(results);
      });
    }
  }
);

// @route       Delete  api/restaurants
// @description Delete an Order
// @access      Public

router.delete(
  "/:resId",
  [
    check("orderId", "Order Id is required")
      .not()
      .isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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

      res.status(201).json(results);
    });
  }
);

// @route       GET api/restaurant
// @description get all orders from a restaurants
// @access      Public
router.get("/:resId", (req, res) => {
  const { resId } = req.params;
  const sql = `SELECT name, orderId FROM orders WHERE resId = ?`;

  connection.query(sql, resId, (err, results, fields) => {
    if (err) {
      return res.status(404).json({ errors: [{ msg: err.message }] });
    }

    res.status(200).json(results);
  });
});

module.exports = router;
