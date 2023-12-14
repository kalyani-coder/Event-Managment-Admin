const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

const GET = require("./routes/GET");
const POST = require("./routes/POST");
const DELETE = require("./routes/DELETE");
const PATCH = require('./routes/PATCH')
const Login = require("./routes/LoginRoute");
const AddVendor = require('./routes/AddVendorRoute')
// const AddVendor = require('./routes/AddVendorRoute')

app.use(bodyParser.json());
app.use(cors());

// const apiRouter = express.Router();


// const AddVendor = require('./routes/AddVendorRoute')

// apiRouter.use('/addvendor' , AddVendor)

app.use("/api", GET);
app.use("/api", POST);
app.use("/api", DELETE);
app.use('/api' , PATCH);
app.use("/auth", Login);
app.use('/api' , AddVendor)


// app.use('/api' , AddVendor)
// app.use("/api" , apiRouter);

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
      console.log(`Server is running on port http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
