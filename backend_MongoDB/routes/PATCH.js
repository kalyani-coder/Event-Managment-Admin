const express = require("express");
const router = express.Router();

const { AddVendor } = require('../models/newModels')
const { InventoryStocks } = require('../models/newModels')
const { Enquiry } = require("../models/newModels");
const { FilterBodyByTable } = require("../utils/utils");
const { AddEventMaster,advancePaymantManager } = require("../models/newModels")
const { ManagerDetails, ManagerTask } = require("../models/newModels");
const {QuatationInfo,allBanks} = require("../models/newModels")



router.patch("/allbanks/:id", async (req, res) => {
  try {
    const advpaymanagerId = req.params.id;
    const updatedData = req.body;

    const updateEvent = await allBanks.findByIdAndUpdate(
      advpaymanagerId,
      updatedData,
      { new: true }
    );

    if (!updateEvent) {
      return res.status(404).json({ message: "Bank not Found" });
    }

    res.status(200).json(updateEvent);
  } catch (e) {
    res.status(500).json({ message: "Failed to update Bank" });
  }
});

// router.patch("/quatationinfo/:id", async (req, res) => {
//   try {
//     const { id } = req.params; // Get the quotation id from the URL
//     const { requirement } = req.body; // Get the new requirement from the request body

//     // Find the existing quotation by its ID
//     const existingQuotation = await QuatationInfo.findById(id);

//     if (!existingQuotation) {
//       return res.status(404).json({ message: "Quotation not found" });
//     }

//     // Push the new requirement into the existing requirements array
//     existingQuotation.requirements.push(requirement);

//     // Save the updated quotation
//     const updatedQuotation = await existingQuotation.save();

//     res.status(200).json(updatedQuotation);
//   } catch (err) {
//     console.error("Error adding requirement to quotation:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });



// this is patch route for add only stock multiple in api by student id 
// router.patch('/quotationinfo/:customerId', async (req, res) => {
//   try {
//     const { customerId } = req.params;
//     const newRequirements = req.body.requirements;

//     // Find the quotation info by customer_Id
//     const quotationInfo = await QuatationInfo.findOne({ customer_Id: customerId });

//     if (!quotationInfo) {
//       return res.status(404).json({ error: 'Quotation information not found' });
//     }

//     // Append new requirements to the existing requirements array
//     quotationInfo.requirements = quotationInfo.requirements.concat(newRequirements);

//     // Save the updated quotation info to the database
//     const updatedQuotationInfo = await quotationInfo.save();

//     // Respond with the updated quotation information object
//     res.status(200).json(updatedQuotationInfo);
//   } catch (error) {
//     console.error("Error updating quotation information:", error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });


router.patch('/quotationinfo/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    const newRequirements = req.body.requirements;

    // Find the quotation info by customer_Id
    const quotationInfo = await QuatationInfo.findOne({ customer_Id: customerId });

    if (!quotationInfo) {
      return res.status(404).json({ error: 'Quotation information not found' });
    }

    // Calculate subtotal of new requirements
    const newSubtotal = newRequirements.reduce((total, requirement) => total + requirement.price, 0);

    // Update the existing sub_total with the sum of existing sub_total and new subtotal
    quotationInfo.sub_total += newSubtotal;

    // Append new requirements to the existing requirements array
    quotationInfo.requirements = quotationInfo.requirements.concat(newRequirements);

    // Save the updated quotation info to the database
    const updatedQuotationInfo = await quotationInfo.save();

    // Respond with the updated quotation information object
    res.status(200).json(updatedQuotationInfo);
  } catch (error) {
    console.error("Error updating quotation information:", error);
    res.status(500).json({ error: 'Server error' });
  }
});



// final data to patch perticular and description in api by userid 
router.patch('/savedquotation/:userId', async (req, res) => {
  try {
    // Extract the userId from the request parameters
    const { userId } = req.params;

    // Find the existing quotation information object based on the userId
    let existingQuotationInfo = await QuatationInfo.findOne({ customer_Id: userId });

    if (!existingQuotationInfo) {
      return res.status(404).json({ error: 'Quotation information not found' });
    }

    // Extract the updated fields from the request body
    const { transport, transport_amount, description } = req.body;

    // Update the fields in the existing quotation information object
    existingQuotationInfo.transport = transport;
    existingQuotationInfo.transport_amount = transport_amount;
    existingQuotationInfo.description = description;

    // Save the updated quotation information to the database
    existingQuotationInfo = await existingQuotationInfo.save();

    // Respond with the updated quotation information object
    res.json(existingQuotationInfo);
  } catch (error) {
    console.error("Error updating quotation information:", error);
    res.status(500).json({ error: 'Server error' });
  }
});






// PATCH for managertask api 
router.patch("/managertask/:id", async (req, res) => {
  try {
    const advpaymanagerId = req.params.id;
    const updatedData = req.body;

    const updateEvent = await ManagerTask.findByIdAndUpdate(
      advpaymanagerId,
      updatedData,
      { new: true }
    );

    if (!updateEvent) {
      return res.status(404).json({ message: "Manager Task not Found" });
    }

    res.status(200).json(updateEvent);
  } catch (e) {
    res.status(500).json({ message: "Failed to update Manager Task" });
  }
});


// PATCH for manager api 
router.patch("/addmanager/:id", async (req, res) => {
  try {
    const managerId = req.params.id;
    const updatedData = req.body;

    const updateManager = await ManagerDetails.findByIdAndUpdate(
      managerId,
      updatedData,
      { new: true }
    );

    if (!updateManager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    res.status(200).json(updateManager);
  } catch (e) {
    res.status(500).json({ message: "Failed to update Manager" });
  }
});

//PATCH FOR ADVPAYMANAGER 
router.patch("/advpaymanager/:id", async (req, res) => {
  try {
    const advpaymanagerId = req.params.id;
    const updatedData = req.body;

    const updateEvent = await advancePaymantManager.findByIdAndUpdate(
      advpaymanagerId,
      updatedData,
      { new: true }
    );

    if (!updateEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updateEvent);
  } catch (e) {
    res.status(500).json({ message: "Failed to update event" });
  }
});



//PATCH FOR ADDEVENTMASTER
router.patch("/addeventmaster/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedEventName = req.body.eventName; 
    const updateEvent = await AddEventMaster.findByIdAndUpdate(
      eventId,
      { eventName: updatedEventName },
      { new: true } 
    );

    if (!updateEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updateEvent);
  } catch (e) {
    res.status(500).json({ message: "Failed to update event" });
  }
});

//PATCH FOR EVENTMANSTER 
router.patch("/addeventmaster/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedEventName = req.body.eventName; 
    const updateEvent = await AddEventMaster.findByIdAndUpdate(
      eventId,
      { eventName: updatedEventName },
      { new: true } 
    );

    if (!updateEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updateEvent);
  } catch (e) {
    res.status(500).json({ message: "Failed to update event" });
  }
});

// PATCH for enquiry /
router.patch("/enquiry/:id", async (req, res) => {
  const enquiryId = req.params.id;

  try {
    const updatedFields = FilterBodyByTable({ req, table: "enquiry" });
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
  const updateFields = req.body; 

  try {
    const updatedVendor = await AddVendor.findByIdAndUpdate(
      vendorId,
      updateFields,
      { new: true } 
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
  const updateFields = req.body; 

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
    const { Price, Stock_Quantity } = req.body; 

    // Find the product by ID
    const existingProduct = await InventoryStocks.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Calculate the updated quantity 
    const updatedQuantity = existingProduct.Stock_Quantity + Stock_Quantity;
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