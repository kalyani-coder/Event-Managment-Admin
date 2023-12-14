const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;
const connection = require("./database");
const GET = require("./routes/GET");
const POST = require("./routes/POST");
const DELETE = require("./routes/DELETE");

app.use(bodyParser.json());

app.use("/api/", GET);
app.use("/api/", POST);
app.use("/api/", DELETE);

app.listen(port, () => {
  connection.connect((err) => {
    console.log("Connected to database");
    if (err) {
      console.log(err);
    }
  });
  console.log(`Server is running on port ${port}`);
});
