
const express = require("express");
const router = express.Router();

const AddVendors = require('../models/newModels')


router.get("/", async (req, res) => {
    try {
      const vendors = await AddVendors.find();
      res.json(vendors);
    } catch (error) {
      console.error("Error fetching vendors:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  module.exports = router