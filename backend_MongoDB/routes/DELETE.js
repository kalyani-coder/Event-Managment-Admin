const express = require("express");
const router = express.Router();

const { FindTable } = require("../utils/utils");
const {AddVendor} = require('../models/newModels')
const {InventoryStocks} =  require('../models/newModels')


router.delete("/addvendor/:id", async (req, res) => {
  try {
    const vendorId = req.params.id;
    const deletedVendor = await AddVendor.findByIdAndDelete(vendorId);
    
    if (deletedVendor) {
      res.status(200).json({ message: "Vendor deleted successfully" });
    } else {
      res.status(404).json({ message: "Vendor not found" });
    }
  } catch (error) {
    console.error("Error deleting vendor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Add Vendor Api delete route 
// router.delete("/vendor/:vendorId", async (req, res) => {
//   const vendorId = req.params.vendorId;

//   try {
//     const deletedVendor = await AddVendor.findByIdAndDelete(vendorId);

//     if (!deletedVendor) {
//       return res.status(404).json({ message: "Vendor not found" });
//     }

//     res.status(200).json({ message: "Vendor deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting vendor:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// Inventory stocks delete route 
router.delete('/inventory-stocks/:stockId', async (req, res) => {
  const stockId = req.params.stockId;

  try {
    const deletedStock = await InventoryStocks.findByIdAndDelete(stockId);

    if (!deletedStock) {
      return res.status(404).json({ message: 'Inventory stock not found' });
    }

    res.status(200).json({ message: 'Inventory stock deleted successfully' });
  } catch (error) {
    console.error('Error deleting inventory stock by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.delete("/:table/:id", async (req, res) => {
  const { table, id } = req.params;
  // const ids =
  const Table = FindTable({ table });
  if (Table) {
    try {
      await Table.findByIdAndDelete(id);
      res.status(200).json({
        message: "Entry deleted successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: "Failed to delete entry",
      });
    }
  } else {
    res.status(400).send("Bad Request");
  }
});

module.exports = router;
