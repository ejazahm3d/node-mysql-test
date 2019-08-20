const express = require("express");
const config = require("./config/config");

const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");

//init middlewares
app.use(bodyParser.json());
// database connection
const connection = mysql.createConnection(config);

const connectDB = async () => {
  try {
    await connection.connect();
    console.log("MYSQL connected");
  } catch (error) {
    console.log(error);
  }
};
connectDB();

app.get("/", (req, res) => res.send("Hello World"));

//define routes
app.use("/api/restaurant", require("./routes/restaurant"));

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
