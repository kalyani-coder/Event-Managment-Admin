const express = require("express");
const router = express.Router();

const {AddVendor} = require('../models/newModels')
const {InventoryStocks} = require('../models/newModels')


// PATCH route to update a vendor by ID
router.patch("/addvendor/:vendorId", async (req, res) => {
    const vendorId = req.params.vendorId;
    const updateFields = req.body; // Assuming you send the fields to update in the request body
  
    try {
      const updatedVendor = await AddVendor.findByIdAndUpdate(
        vendorId,
        updateFields,
        { new: true } // This option returns the updated document
      );
  
      if (!updatedVendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }
  
      res.status(200).json(updatedVendor);
    } catch (err) {
      console.error("Error updating vendor:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // PATCH route to update an inventory stock by ID
router.patch('/inventory-stocks/:stockId', async (req, res) => {
    const stockId = req.params.stockId;
    const updateFields = req.body; // Assuming you send the fields to update in the request body
  
    try {
      const updatedStock = await InventoryStocks.findByIdAndUpdate(
        stockId,
        updateFields,
        { new: true } // This option returns the updated document
      );
  
      if (!updatedStock) {
        return res.status(404).json({ message: 'Inventory stock not found' });
      }
  
      res.status(200).json(updatedStock);
    } catch (error) {
      console.error('Error updating inventory stock:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


module.exports = router;