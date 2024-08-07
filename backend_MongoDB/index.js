const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config()
const app = express();
const port = process.env.PORT || 8888;

const GET = require("./routes/GET");
const POST = require("./routes/POST");
const DELETE = require("./routes/DELETE");
const PATCH = require('./routes/PATCH');
const Login = require("./routes/LoginRoute");
const AddVendor = require('./routes/AddVendorRoute');

app.use(bodyParser.json());
app.use(cors());


app.use("/api", GET);
app.use("/api", POST);
app.use("/api", DELETE);
app.use('/api' , PATCH);
app.use("/auth", Login);
app.use('/api' , AddVendor);



mongoose
  .connect(
    process.env.LOCAL_MONGODB_URl,
    {
      dbName: "event-management",
    }
  )
  .then(() => {
    console.log("Connected to local database database");
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });


  
// server side db connection 

// mongoose
//   .connect(
//     process.env.MONGODB_URl,
//   )
//   .then(() => {
//     console.log("Connected to server database");
//     app.listen(port, () => {
//       console.log(`Server is running on port http://localhost:${port}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });
  