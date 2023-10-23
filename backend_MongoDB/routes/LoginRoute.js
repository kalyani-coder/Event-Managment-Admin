const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const ManagerDetails = require("../models/newModels");
const { Managerdetails } = require("../models/newModels");
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

  // Store all the data in the Managerdetails table, all the fields except the password.
  const managerDetails = new Managerdetails({
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
    managerDetails: savedManagerDetails,
    managerLogin: savedManagerLogin,
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const managerLogin = await ManagerLogin.findOne({ email });
  if (!managerLogin) {
    return res.status(400).send("Invalid email");
  }

  const validPassword = await bcrypt.compare(password, managerLogin.password);
  if (!validPassword) {
    return res.status(400).send("Invalid password");
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
