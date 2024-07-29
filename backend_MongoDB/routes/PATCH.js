const express = require("express");
const router = express.Router();

const { AddVendor } = require('../models/newModels')
const { InventoryStocks } = require('../models/newModels')
const { Enquiry } = require("../models/newModels");
const { FilterBodyByTable } = require("../utils/utils");
const { AddEventMaster, advancePaymantManager ,CustomerQuatationInfo} = require("../models/newModels")
const { ManagerDetails, ManagerTask, AdvanceExpence ,Executive} = require("../models/newModels");
const { QuatationInfo, allBanks, ExpenceForm, VendorPayment, Accountant, AdminLogin} = require("../models/newModels")


// Admin Password chage route 

router.patch("/admin/change-pass", async (req, res) => {
  const { adminId, oldPassword, newPassword } = req.body;

  try {
    // Find the admin by ID
    const admin = await AdminLogin.findById(adminId);

    if (!admin) {
      return res.status(202).json({ message: "AdminId  not found" });
    }
    if (oldPassword !== admin.password) {
      return res.status(202).json({ message: "Old password is incorrect" });
    }
    admin.password = newPassword;
    await admin.save();

    res.status(200).json({ message: "Password successfully Changed" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Internal server error",error });
  }
});

// Manager Change Pass Route 
router.patch("/manager/change-pass", async (req, res) => {
  const { managerId, oldPassword, newPassword } = req.body;

  try {
    // Find the admin by ID
    const manager = await ManagerDetails.findById(managerId);

    if (!manager) {
      return res.status(202).json({ message: "ManagerId  not found" });
    }
    if (oldPassword !== manager.password) {
      return res.status(202).json({ message: "Old password is incorrect" });
    }
    manager.password = newPassword;
    await manager.save();

    res.status(200).json({ message: "Password successfully Changed" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Internal server error",error });
  }
});


// Accountant Update route 
router.patch("/accountant/:id" , async(req, res) => {
  try{
    const id = req.params.id
    const update = req.body
    const updateAccountant = await Accountant.findByIdAndUpdate(id , update,{new : true})
    if(!updateAccountant){
      return res.status(404).json({message : "Accountant Id not Found"})
    }
    res.status(200).json({message : " Accountant Updated Successfully "})
  }catch(e){
    res.status(500).json({message : "Internla server error"})
  }
})

router.patch("/executive/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    // Find the executive by ID and update their details
    const updateExecutive = await Executive.findByIdAndUpdate(id, updates, { new: true });

    if (!updateExecutive) {
      return res.status(404).json({ message: "Executive ID not found" });
    }

    res.status(200).json({ message: "Executive updated successfully"});
  } catch (error) {
    console.error('Error updating executive:', error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


// NEW CUSTOMER QUOTATION INFO PATCH ROUTE 
router.patch('/customerquotationinfo/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    const newRequirements = req.body.requirements;

    const quotationInfo = await CustomerQuatationInfo.findOne({ customer_Id: customerId });

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



// PATCH BY REQUIREENT ID 
router.patch('/customerquotationinfo/customer/:customerId/requirements/:requirementId', async (req, res) => {
  const { customerId, requirementId } = req.params;
  const updatedRequirement = req.body;

  try {
    const quotation = await CustomerQuatationInfo.findOneAndUpdate(
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


router.patch('/customersavedquotation/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    let existingQuotationInfo = await CustomerQuatationInfo.findOne({ customer_Id: userId });

    if (!existingQuotationInfo) {
      return res.status(404).json({ error: 'Quotation information not found' });
    }

    const { sub_total, transport, transport_amount, description, grand_total, cgst, sgst, Total_Amount, event_name, event_date, state } = req.body;

    existingQuotationInfo.transport = transport;
    existingQuotationInfo.transport_amount = transport_amount;
    existingQuotationInfo.description = description;
    existingQuotationInfo.grand_total = grand_total;
    existingQuotationInfo.sub_total = sub_total;
    existingQuotationInfo.cgst = cgst;
    existingQuotationInfo.sgst = sgst;
    existingQuotationInfo.Total_Amount = Total_Amount;
    existingQuotationInfo.event_name = event_name;
    existingQuotationInfo.event_date = event_date;
    existingQuotationInfo.state = state;

    existingQuotationInfo = await existingQuotationInfo.save();

    res.json(existingQuotationInfo);
  } catch (error) {
    console.error("Error updating quotation information:", error);
    res.status(500).json({ error: 'Server error' });
  }
});


// PATCH VENDOR PAYMENT 
router.patch("/vendorpayment/update/:id", async (req, res) => {
  const id = req.params.id;
  const { total_pay_amount, advance_payment } = req.body; // extract total_pay_amount and advance_payment from request body

  try {
    // Validate the Vendor ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid Vendor Id" });
    }

    // Find the existing vendor payment
    const existingVendorPayment = await VendorPayment.findById(id);
    if (!existingVendorPayment) {
      return res.status(404).json({ message: "Vendor Id not found" });
    }

    // Calculate the sum of total_pay_amount and advance_payment
    const totalPayment = (total_pay_amount || 0) + (advance_payment || 0);

    // Ensure the new totalPayment is not greater than rem_amt
    if (totalPayment > existingVendorPayment.rem_amt) {
      return res.status(400).json({ message: "Total payment amount cannot be greater than remaining amount" });
    }

    // Calculate the new rem_amt and update total_pay_amount
    const new_rem_amt = existingVendorPayment.rem_amt - totalPayment;
    const new_total_pay_amount = (existingVendorPayment.total_pay_amount || 0) + totalPayment;

    // Determine the new status
    const new_status = new_rem_amt === 0 ? "Payment Done" : "Payment Pending";

    // Update the vendor payment record
    const updatedVendorPayment = await VendorPayment.findByIdAndUpdate(
      id,
      {
        total_pay_amount: new_total_pay_amount,
        rem_amt: new_rem_amt,
        advance_payment: (existingVendorPayment.advance_payment || 0) + (advance_payment || 0),
        status: new_status
      },
      { new: true }
    );

    // Return the updated vendor payment record
    res.status(200).json(updatedVendorPayment);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});


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

    const { sub_total, transport, transport_amount, description, grand_total, cgst, sgst, Total_Amount, event_name, event_date, state } = req.body;

    existingQuotationInfo.transport = transport;
    existingQuotationInfo.transport_amount = transport_amount;
    existingQuotationInfo.description = description;
    existingQuotationInfo.grand_total = grand_total;
    existingQuotationInfo.cgst = cgst;
    existingQuotationInfo.sub_total = sub_total;
    existingQuotationInfo.sgst = sgst;
    existingQuotationInfo.Total_Amount = Total_Amount;
    existingQuotationInfo.event_name = event_name;
    existingQuotationInfo.event_date = event_date;
    existingQuotationInfo.state = state;



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