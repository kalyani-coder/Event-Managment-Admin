const express = require("express");
const router = express.Router();

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const ManagerDetails = require("../models/newModels");
const { ManagerDetails } = require("../models/newModels");
const { ManagerLogin } = require("../models/newModels");

const saltRounds = 10;

router.post("/register", async (req, res) => {
  const {
    manager_id,
    fname,
    lname,
    email,
    contact,
    profile_image,
    address,
    city,
    state,
    holder_name,
    account_number,
    IFSC_code,
    bank_name,
    branch_name,
    password,
  } = req.body;

  // Check if a user with the given email already exists
  const existingUser = await ManagerLogin.findOne({ email: email });

  if (existingUser) {
    return res.status(200).send({
      message: "User already exists",
      validity: false,
    });
  }

  // Store all the data in the Managerdetails table, all the fields except the password.
  const managerDetails = new ManagerDetails({
    manager_id,
    fname,
    lname,
    email,
    contact,
    profile_image,
    address,
    city,
    state,
    holder_name,
    account_number,
    IFSC_code,
    bank_name,
    branch_name,
  });

  const savedManagerDetails = await managerDetails.save();

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const managerLogin = new ManagerLogin({
    email: email,
    password: hashedPassword,
    userId: savedManagerDetails._id,
  });

  const savedManagerLogin = await managerLogin.save();

  res.send({
    message: "Registered successfully",
    validity: true,
    managerDetails: savedManagerDetails,
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const managerLogin = await ManagerLogin.findOne({ email });
  if (!managerLogin) {
    return res.json({
      message: "Incorrect credentials",
      validity: false,
    });
  }

  const validPassword = await bcrypt.compare(password, managerLogin.password);
  if (!validPassword) {
    return res.json({
      message: "Incorrect credentials",
      validity: false,
    });
  }

  // const token = jwt.sign({ id: managerLogin.manager_id }, "V1R7U3BY73", {
  //   expiresIn: "1h",
  // });

  res.json({
    message: "Logged in successfully",
    validity: true,
    manager_id: managerLogin.manager_id,
  });
});

module.exports = router;
