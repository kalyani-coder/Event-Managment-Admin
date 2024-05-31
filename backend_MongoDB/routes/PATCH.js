const express = require("express");
const router = express.Router();

const { AddVendor } = require('../models/newModels')
const { InventoryStocks } = require('../models/newModels')
const { Enquiry } = require("../models/newModels");
const { FilterBodyByTable } = require("../utils/utils");
const { AddEventMaster, advancePaymantManager } = require("../models/newModels")
const { ManagerDetails, ManagerTask ,AdvanceExpence} = require("../models/newModels");
const { QuatationInfo, allBanks, ExpenceForm } = require("../models/newModels")


router.patch('/quotationinfo/customer/:customerId/requirements/:requirementId', async (req, res) => {
  const { customerId, requirementId } = req.params;
  const updatedRequirement = req.body;

  try {
      const quotation = await QuatationInfo.findOneAndUpdate(
          { customer_Id: customerId, 'requirements._id': requirementId },
          { $set: { 'requirements.$': updatedRequirement } },
          { new: true }
      );

      if (!quotation) {
          return res.status(404).json({ message: 'Quotation not found' });
      }

      res.json(quotation);
  } catch (error) {
      console.error('Error updating requirement', error);
      res.status(500).json({ message: 'Server error' });
  }
});



router.patch("/advanceexpence/:id", async (req, res) => {
  const expenceId = req.params.id
  const updateData = req.body;
  try {
    const updatedExpence = await AdvanceExpence.findByIdAndUpdate(expenceId, updateData, { new: true })
    if (!expenceId) {
      return res.status(404).json({ message: "ExpenceId not found" })
    }
    res.status(201).json({ message: "Expence Updated successfully" })
  } catch (e) {
    res.status(500).json({ message: "Internal server error" })
  }
})

// patch for the expence 
router.patch("/expence/:id", async (req, res) => {
  const expenceId = req.params.id
  const updateData = req.body;
  try {
    const updatedExpence = await ExpenceForm.findByIdAndUpdate(expenceId, updateData, { new: true })
    if (!expenceId) {
      return res.status(404).json({ message: "ExpenceId not found" })
    }
    res.status(201).json({ message: "Expence Updated successfully" })
  } catch (e) {
    res.status(500).json({ message: "Internal server error" })
  }
})

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


router.patch('/quotationinfo/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    const newRequirements = req.body.requirements;

    const quotationInfo = await QuatationInfo.findOne({ customer_Id: customerId });

    if (!quotationInfo) {
      return res.status(404).json({ error: 'Quotation information not found' });
    }

    const newSubtotal = newRequirements.reduce((total, requirement) => total + requirement.price, 0);

    quotationInfo.sub_total += newSubtotal;

    quotationInfo.requirements = quotationInfo.requirements.concat(newRequirements);

    const updatedQuotationInfo = await quotationInfo.save();

    res.status(200).json(updatedQuotationInfo);
  } catch (error) {
    console.error("Error updating quotation information:", error);
    res.status(500).json({ error: 'Server error' });
  }
});



// final data to patch perticular and description in api by userid 
router.patch('/savedquotation/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    let existingQuotationInfo = await QuatationInfo.findOne({ customer_Id: userId });

    if (!existingQuotationInfo) {
      return res.status(404).json({ error: 'Quotation information not found' });
    }

    const { transport, transport_amount, description, grand_total, cgst, sgst, Total_Amount, event_name, event_date } = req.body;

    existingQuotationInfo.transport = transport;
    existingQuotationInfo.transport_amount = transport_amount;
    existingQuotationInfo.description = description;
    existingQuotationInfo.grand_total = grand_total;
    existingQuotationInfo.cgst = cgst;
    existingQuotationInfo.sgst = sgst;
    existingQuotationInfo.Total_Amount = Total_Amount;
    existingQuotationInfo.event_name = event_name;
    existingQuotationInfo.event_date = event_date;



    existingQuotationInfo = await existingQuotationInfo.save();

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

    const existingProduct = await InventoryStocks.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

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
    const stock = await InventoryStocks.findOne({ Vendor_Name: vendorName });

    if (!stock) {
      return res.status(404).json({ message: 'Stock not found for the specified vendor' });
    }

    const quantityToSubtract = parseFloat(quantity);
    if (isNaN(quantityToSubtract)) {
      return res.status(400).json({ message: 'Invalid quantity provided' });
    }

    if (stock.Stock_Quantity - quantityToSubtract < 0) {
      return res.status(400).json({ message: 'Invalid quantity, resulting quantity would be negative' });
    }

    stock.Stock_Quantity -= quantityToSubtract;
    await stock.save();

    res.status(200).json(stock);
  } catch (error) {
    console.error('Error updating stock quantity:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;