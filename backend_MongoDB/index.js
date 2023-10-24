const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

const GET = require("./routes/GET");
const POST = require("./routes/POST");
const DELETE = require("./routes/DELETE");
const Login = require("./routes/LoginRoute");

app.use(bodyParser.json());
app.use(cors());

app.use("/api", GET);
app.use("/api", POST);
app.use("/api", DELETE);
app.use("/auth", Login);

mongoose
  .connect(
    "mongodb+srv://ADMIN:ADMIN@cluster0.6hrtdcu.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "event-management",
    }
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
