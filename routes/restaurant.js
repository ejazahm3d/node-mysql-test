const router = require("express").Router();
const mysql = require("mysql");
const connection = mysql.createConnection(config);

router.put("/:resId", (req, res) => {
  const { orderName } = req.body;
  const { resId } = req.params;
  const sql = `
            REPLACE INTO orders
  `;
  connection.query();

  res.send(`add and update route ${orderName} and ${resId}`);
});

router.delete("", (req, res) => res.send("Delete route"));

router.get("/", (req, res) => res.send("Hello World"));

module.exports = router;
