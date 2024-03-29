const express = require("express");
const router = express.Router();

const { AddVendor } = require('../models/newModels')
const { InventoryStocks } = require('../models/newModels')
const { Enquiry } = require("../models/newModels");
const { FilterBodyByTable } = require("../utils/utils");

  

// PATCH for enquiry /

router.patch("/enquiry/:id", async (req, res) => {
  const enquiryId = req.params.id;
  
  try {
    // Extract fields to update from the request body
    const updatedFields = FilterBodyByTable({ req, table: "enquiry" });
    
    // Update the Enquiry by ID
    const enquiry = await Enquiry.findByIdAndUpdate(enquiryId, updatedFields, { new: true });
    
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    
    res.status(200).json(enquiry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


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
      { new: true }
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

router.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const { Price, Stock_Quantity } = req.body; // Get updated Price and Stock_Quantity from request body

    // Find the product by ID
    const existingProduct = await InventoryStocks.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Calculate the updated quantity by adding the existing quantity and the new quantity
    const updatedQuantity = existingProduct.Stock_Quantity + Stock_Quantity;

    // Update the product with the new Price and calculated Stock_Quantity
    existingProduct.Price = Price;
    existingProduct.Stock_Quantity = updatedQuantity;
    await existingProduct.save();

    res.status(200).json(existingProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});





// router.patch('/inventory-stocks/:stockId', async (req, res) => {
//   const stockId = req.params.stockId;
//   const updateFields = req.body; // Assuming you send the fields to update in the request body

//   try {
//     // Check if the updateFields include Stock_Quantity
//     if ('Stock_Quantity' in updateFields) {
//       // Parse the Stock_Quantity value from the request body
//       const additionalQuantity = parseInt(updateFields.Stock_Quantity, 10) || 0;

//       // Find the existing stock
//       const existingStock = await InventoryStocks.findById(stockId);

//       if (!existingStock) {
//         return res.status(404).json({ message: 'Inventory stock not found' });
//       }

//       // Increment the Stock_Quantity by the additionalQuantity
//       existingStock.Stock_Quantity += additionalQuantity;

//       // Save the updated stock to the database
//       const updatedStock = await existingStock.save();

//       res.status(200).json(updatedStock);
//     } else {
//       // If Stock_Quantity is not included in the updateFields, perform a regular update
//       const updatedStock = await InventoryStocks.findByIdAndUpdate(
//         stockId,
//         updateFields,
//         { new: true } // This option returns the updated document
//       );

//       if (!updatedStock) {
//         return res.status(404).json({ message: 'Inventory stock not found' });
//       }

//       res.status(200).json(updatedStock);
//     }
//   } catch (error) {
//     console.error('Error updating inventory stock:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// router.patch('/inventory-stocks/stock/:stockName/vendor/:vendorId', async (req, res) => {
//   const vendorId = req.params.vendorId;
//   const stockName = req.params.stockName;
//   const { updatedQuantity } = req.body; // Assuming the updated quantity is sent in the request body

//   try {
//     // Find the inventory stock by vendor ID and stock name
//     const stock = await InventoryStocks.findOne({ Vendor_Id: vendorId, Stock_Name: stockName });

//     if (!stock) {
//       return res.status(404).json({ message: 'Inventory stock not found for the specified vendor and stock' });
//     }

//     // Update the quantity
//     stock.Stock_Quantity -= updatedQuantity; // Subtract the updated quantity

//     // Save the updated stock
//     await stock.save();

//     res.status(200).json({ message: 'Inventory stock quantity updated successfully' });
//   } catch (error) {
//     console.error('Error updating inventory stock quantity:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


// patch method for inventory stocks 
router.patch('/inventory-stocks/vendor/:vendorId/stock/:stockName', async (req, res) => {
  const vendorId = req.params.vendorId;
  const stockName = req.params.stockName;
  const { quantity } = req.body;

  try {
    // Find the stock
    const stock = await InventoryStocks.findOne({ Vendor_Id: vendorId, Stock_Name: stockName });

    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    // Ensure the quantity to subtract is a valid number
    const quantityToSubtract = parseFloat(quantity);
    if (isNaN(quantityToSubtract)) {
      return res.status(400).json({ message: 'Invalid quantity provided' });
    }

    // Ensure that the resulting quantity after subtraction is not negative
    if (stock.Stock_Quantity - quantityToSubtract < 0) {
      return res.status(400).json({ message: 'Invalid quantity, resulting quantity would be negative' });
    }

    // Update the Stock_Quantity and save
    stock.Stock_Quantity -= quantityToSubtract;
    await stock.save();

    res.status(200).json(stock);
  } catch (error) {
    console.error('Error updating stock quantity:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.patch('/inventory-stocks/vendor/:vendorName', async (req, res) => {
  const vendorName = req.params.vendorName;
  const { quantity } = req.body;

  try {
    // Find the stock
    const stock = await InventoryStocks.findOne({ Vendor_Name: vendorName });

    if (!stock) {
      return res.status(404).json({ message: 'Stock not found for the specified vendor' });
    }

    // Ensure the quantity to subtract is a valid number
    const quantityToSubtract = parseFloat(quantity);
    if (isNaN(quantityToSubtract)) {
      return res.status(400).json({ message: 'Invalid quantity provided' });
    }

    // Ensure that the resulting quantity after subtraction is not negative
    if (stock.Stock_Quantity - quantityToSubtract < 0) {
      return res.status(400).json({ message: 'Invalid quantity, resulting quantity would be negative' });
    }

    // Update the Stock_Quantity and save
    stock.Stock_Quantity -= quantityToSubtract;
    await stock.save();

    res.status(200).json(stock);
  } catch (error) {
    console.error('Error updating stock quantity:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;