const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
// const ManagerDetails = require("../models/newModels");
const { Managerdetails } = require("../models/newModels");
const { ManagerLogin } = require("../models/newModels");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const { manager_id, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const managerDetails = new ManagerDetails({
    manager_id,
    email,
  });
  await managerDetails.save();

  const managerLogin = new ManagerLogin({
    manager_id,
    email,
    password: hashedPassword,
  });
  await managerLogin.save();

  res.send("Manager registered successfully");
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

  const token = jwt.sign({ id: managerLogin.manager_id }, "your-secret-key", {
    expiresIn: "1h",
  });

  res.json({
    message: "Logged in successfully",
    token,
  });
});

module.exports = router;
