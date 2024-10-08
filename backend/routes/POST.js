const express = require("express");
// const bcrypt = require('bcryptjs');
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');
const router = express.Router();
JWT_SECRET = "eventmanagement";
const nodemailer = require('nodemailer');
require('dotenv').config()

const { FindTable } = require("../utils/utils");
const { FilterBodyByTable } = require("../utils/utils");

const { InventoryStock, AddEventMaster } = require("../models/newModels");
const { ExecutiveTask } = require("../models/newModels");
const { Attendance } = require("../models/newModels");
const { ManagerDetails } = require("../models/newModels");
const { ExecutiveDetails } = require("../models/newModels");
const { AddVendor } = require('../models/newModels')
const { InventoryStocks,ExpenceForm ,AdvanceExpence,CustomerQuatationInfo, AdminLogin} = require('../models/newModels')
const { QuatationInfo, advancePaymantManager, ManagerTask, bankTransper, allBanks, venue } = require('../models/newModels')

// ADMIN REGISTER ROUTE 
router.post("/admin/register", async (req, res) => {
  try {
    const newAdmin = new AdminLogin(req.body);
    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      const validationErrors = {};
      for (let key in e.errors) {
        validationErrors[key] = e.errors[key].message;
      }
      return res.status(400).json({ message: "Validation errors", errors: validationErrors });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

// Admin Login Route /
router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await AdminLogin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Email does not exist" });
    }

    if (password !== admin.password) {
      return res.status(400).json({ message: "Password does not match" });
    }
    const token = jwt.sign({ id: admin._id }, JWT_SECRET);
    res.status(200).json({ message: "Login successful", token, adminId: admin._id });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Verify the password route 

const transporter = nodemailer.createTransport({
  host:"bulk.smtp.mailtrap.io",
  port: 587,
  auth: {
    user:"api",
    pass:"3f4ebe0e1af80798535216a662822105",
  }
});


// Generate a 4-digit OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}
  

router.post("/admin/update-pass", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if email exists
    const admin = await AdminLogin.findOne({ email });
    if (!admin) {
      return res.status(202).json({ message: "Email does not exist" });
    }

    // Generate OTP
    const otp = generateOTP();

    // Send OTP via email
    const mailOptions = {
      from: '<mailtrap@ssdpune.org>', // Replace with your email
      to: email,
      subject: 'Password Recovery OTP',
      text: `Your OTP for password recovery is: ${otp}`
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Error sending email", error });
      } else {
        // Update admin record with OTP
        admin.otp = otp;
        await admin.save();
        return res.status(200).json({ message: "OTP sent to email"}); // Note: Remove OTP from response in production
      }
    });
  } catch (e) {
    res.status(500).json({ message: "Internal server error", error: e.message });
  }
});


// Route to verify OTP
router.post("/admin/update-pass/verify", async (req, res) => {
  const { email, otp, password } = req.body;

  try {
    // Check if email exists
    const admin = await AdminLogin.findOne({ email });
    if (!admin) {
      return res.status(202).json({ message: "Email does not exist" });
    }

    // Check if OTP matches
    if (admin.otp !== parseInt(otp)) {
      return res.status(202).json({ message: "Incorrect OTP" });
    }

    // OTP verification successful, update password
    admin.password = password;
    admin.otp = null; // Clear the OTP after successful verification and password update
    await admin.save();

    return res.status(200).json({ message: "OTP verified and password updated successfully" });
  } catch (e) {
    res.status(500).json({ message: "Internal server error", error: e.message });
  }
});


// manager
router.post("/manager/update-pass", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if email exists
    const manager = await ManagerDetails.findOne({ email });
    if (!manager) {
      return res.status(202).json({ message: "Email does not exist" });
    }

    // Generate OTP
    const otp = generateOTP();

    // Send OTP via email
    const mailOptions = {
      from: '<mailtrap@ssdpune.org>', // Replace with your email
      to: email,
      subject: 'Password Recovery OTP',
      text: `Your OTP for password recovery is: ${otp}`
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Error sending email", error });
      } else {
        // Update manager record with OTP
        manager.otp = otp;
        await manager.save();
        return res.status(200).json({ message: "OTP sent to email"}); // Note: Remove OTP from response in production
      }
    });
  } catch (e) {
    res.status(500).json({ message: "Internal server error", error: e.message });
  }
});


// Route to verify OTP
router.post("/manager/update-pass/verify", async (req, res) => {
  const { email, otp, password } = req.body;

  try {
    // Check if email exists
    const manager = await ManagerDetails.findOne({ email });
    if (!manager) {
      return res.status(202).json({ message: "Email does not exist" });
    }

    // Check if OTP matches
    if (manager.otp !== parseInt(otp)) {
      return res.status(202).json({ message: "Incorrect OTP" });
    }

    // OTP verification successful, update password
    manager.password = password;
    manager.otp = null; // Clear the OTP after successful verification and password update
    await manager.save();

    return res.status(200).json({ message: "OTP verified and password updated successfully" });
  } catch (e) {
    res.status(500).json({ message: "Internal server error", error: e.message });
  }
});


// NEW CUSTOMER QUATATIOINFO POST ROUTE 
// router.post('/customerquotationinfo', async (req, res) => {
//   try {
//     const { requirements, customer_Id, customerName } = req.body;

//     const subTotal = requirements.reduce((total, requirement) => total + requirement.price, 0);

//     const newQuotationInfo = new CustomerQuatationInfo({
//       requirements,
//       customer_Id,
//       customerName,
//       eventName: "",
//       total_days: 0,
//       transport: "",
//       transport_amount: 0,
//       description: "",
//       sub_total: subTotal, 
//       cgst: "",
//       sgst: "",
//       Total_Amount: "",
//       grand_total : "",
//       event_date : "",
//       event_name : "",
//     });

//     // Save the new quotation information to the database
//     const createdQuotationInfo = await newQuotationInfo.save();

//     // Respond with the created quotation information object
//     res.status(201).json(createdQuotationInfo);
//   } catch (error) {
//     console.error("Error creating quotation information:", error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });


router.post('/customerquotationinfo', async (req, res) => {
  try {
    const { requirements, customer_Id, customerName } = req.body;

    const subTotal = requirements.reduce((total, requirement) => total + requirement.price, 0);

    // Fetch the latest quotation number from the database
    const latestQuotation = await CustomerQuatationInfo.findOne().sort({ quotation_Number: -1 });

    // Determine the new quotation number
    const newQuotationNumber = latestQuotation && latestQuotation.quotation_Number ? latestQuotation.quotation_Number + 1 : 1;

    const newQuotationInfo = new CustomerQuatationInfo({
      requirements,
      customer_Id,
      customerName,
      eventName: "",
      total_days: 0,
      transport: "",
      transport_amount: 0,
      description: "",
      sub_total: subTotal,
      cgst: "",
      sgst: "",
      Total_Amount: "",
      grand_total: "",
      event_date: "",
      event_name: "",
      state: "",
      igst: "",
      quotation_Number: newQuotationNumber, 
    });

    // Save the new quotation information to the database
    const createdQuotationInfo = await newQuotationInfo.save();

    // Respond with the created quotation information object
    res.status(201).json(createdQuotationInfo);
  } catch (error) {
    console.error("Error creating quotation information:", error);
    res.status(500).json({ error: 'Server error' });
  }
});





router.post("/advanceexpence" , async(req, res)=> {
  const expenceData = new AdvanceExpence(req.body)
  try{
    const allexpence = await expenceData.save()
    res.status(201).json({message : "Advance Expence Added Successfully"})
  }catch(e){
    res.status(500).json({message : "Internal server error"})
  }
})

// POST route for the Expence 
router.post("/expence" , async(req, res)=> {
  const expenceData = new ExpenceForm(req.body)
  try{
    const allexpence = await expenceData.save()
    res.status(201).json({message : "Expence Added Successfully"})
  }catch(e){
    res.status(500).json({message : "Internal server error"})
  }
})

// Venue post route 
router.post("/venue", async (req, res) => {
  const addVenue = new venue(req.body)
  try {

    const existingVenue = await venue.findOne({ venue: req.body.venue })
    if (existingVenue) {
      return res.status(404).json({ message: "Venue is already exists" })
    }

    const newVenue = await addVenue.save()
    res.status(201).json({ message: "Venue Added Successfully" })

  } catch (e) {
    res.status(500).json({ message: "Internal server error" })
  }
})

// all Bank accounts post route 
router.post("/allbanks", async (req, res) => {
  try {
    const newBank = new allBanks(req.body);

    const savedBank = await newBank.save();

    res.status(201).json({ message: "Bank added successfully", bank: savedBank });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });``
  }
});


// bank Transper post route 
router.post("/banktransfer", async (req, res) => {
  const newBanktransper = new bankTransper({
    from_bank: req.body.from_bank,
    from_bank_accountNu: req.body.from_bank_accountNu,
    to_bank: req.body.to_bank,
    to_bank_accountNu: req.body.to_bank_accountNu,
    amount: req.body.amount
  });

  try {
    const addTransper = await newBanktransper.save();
    res.status(201).json({ message: "Bank Transfer successful" });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// manager task api post route 
router.post('/managertask', async (req, res) => {
  try {
    const {
      manager_Id,
      manager_Name,
      task,
      date,
      time,

    } = req.body;
    const newManager = new ManagerTask({
      manager_Id: manager_Id,
      manager_Name: manager_Name,
      task: task,
      date: date,
      time: time,
    });

    const savedManager = await newManager.save();

    res.status(201).json({ message: "Manager Task added successfully" });
  } catch (error) {
    console.error('Error saving advance payment:', error);
    res.status(500).json({ message: 'Failed to add Task' });
  }
});

router.post("/manager/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const manager = await ManagerDetails.findOne({ email });
    if (!manager) {
      return res.status(202).json({ message: "Email not found" });
    }

    console.log('Stored password:', manager.password); // Debugging log
    console.log('Entered password:', password); // Debugging log

    // Compare the provided password directly (not secure)
    if (password !== manager.password) {
      return res.status(202).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ email: manager.email, _id: manager._id }, JWT_SECRET);

    res.status(200).json({ message: "Login successful", email: manager.email, managerId: manager._id, token , managerName: manager.fname  + " " + manager.lname});
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.post('/addmanager', async (req, res) => {
  try {
    const {
      fname,
      lname,
      email,
      password,
      contact,
      address,
      city,
      state,
      holder_name,
      account_number,
      IFSC_code,
      bank_name,
      branch_name,
    } = req.body;

    console.log('Password being stored:', password); // Debugging log
    const isExist = await ManagerDetails.findOne({email})
    if(isExist){
      return res.status(202).json({
        success:false,
        message: 'Email Address Already Exists.'
      })
    }
    const newManager = new ManagerDetails({
      fname: fname,
      lname: lname,
      email: email,
      password: password, 
      contact: contact,
      address: address,
      city: city,
      state: state,
      holder_name: holder_name,
      account_number: account_number,
      IFSC_code: IFSC_code,
      bank_name: bank_name,
      branch_name: branch_name,
    });
    const savedManager = await newManager.save();

    res.status(201).json({ message: "Manager added successfully" });
  } catch (error) {
    console.error('Error saving manager:', error);
    res.status(500).json({ message: 'Failed to add Manager' });
  }
});

router.post('/advpaymanager', async (req, res) => {
  try {
    const {
      manager_Name,
      manager_Id,
      EventName,
      EventId,
      Date,
      Time,
      Bank_Name,
      paid_Amount,
      adv_Payment,
      Pending_Amount,
      description, } = req.body;

    const newAdvancePayment = new advancePaymantManager({
      manager_Name: manager_Name,
      manager_Id: manager_Id,
      EventName: EventName,
      EventId: EventId,
      Date: Date,
      Time: Time,
      Bank_Name: Bank_Name,
      paid_Amount: paid_Amount,
      adv_Payment: adv_Payment,
      Pending_Amount: Pending_Amount,
      description: description,
    });

    const savedAdvancePayment = await newAdvancePayment.save();

    res.status(201).json({ message: "Advanvce payment successfully for manager " });
  } catch (error) {
    console.error('Error saving advance payment:', error);
    res.status(500).json({ message: 'Failed to save advance payment' });
  }
});


// event add master post route 
router.post("/addeventmaster", async (req, res) => {
  const { eventName } = req.body;
  try {
    if (!eventName) {
      return res.status(400).json({ message: "Please provide Event Name" });
    }

    const existingEvent = await AddEventMaster.findOne({ eventName });
    if (existingEvent) {
      return res.status(400).json({ message: "Event with this name already exists" });
    }

    const postmasterevent = new AddEventMaster({ eventName });
    const saveeventName = await postmasterevent.save();
    res.status(201).json({ message: "Event added successfully" });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});



// post in addvendor api 
router.post("/addvendor", async (req, res) => {
  const { Vendor_Name } = req.body;

  try {
    const newVendor = new AddVendor({ Vendor_Name });
    const savedVendor = await newVendor.save();
    res.status(201).json(savedVendor);
  } catch (err) {
    console.error("Error creating vendor:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


// this is add one stock in api with user id and othe are empty fileds
router.post('/quotationinfo', async (req, res) => {
  try {
    // Extract the requirements array from the request body
    const { requirements, customer_Id, customerName } = req.body;

    // Calculate subtotal based on the price of each requirement
    const subTotal = requirements.reduce((total, requirement) => total + requirement.price, 0);

    const latestQuotation = await QuatationInfo.findOne().sort({ quotation_Number: -1 });

    // Determine the new quotation number
    const newQuotationNumber = latestQuotation && latestQuotation.quotation_Number ? latestQuotation.quotation_Number + 1 : 1;

    // Create the initial quotation information object with requirements, customer details, and calculated subtotal
    const newQuotationInfo = new QuatationInfo({
      requirements,
      customer_Id,
      customerName,
      eventName: "",
      total_days: 0,
      transport: "",
      transport_amount: 0,
      description: "",
      sub_total: subTotal, 
      cgst: "",
      sgst: "",
      Total_Amount: "",
      grand_total : "",
      event_date : "",
      event_name : "",
      quotation_Number: newQuotationNumber,
    });

    // Save the new quotation information to the database
    const createdQuotationInfo = await newQuotationInfo.save();

    // Respond with the created quotation information object
    res.status(201).json(createdQuotationInfo);
  } catch (error) {
    console.error("Error creating quotation information:", error);
    res.status(500).json({ error: 'Server error' });
  }
});





// POST a new inventory stock
router.post('/inventory-stocks', async (req, res) => {
  const { Category, Stock_Quantity, Price, Vendor_Id, Stock_Name, Vendor_Name } = req.body;

  try {
    // Check if a stock with the same name and vendor already exists
    const existingStock = await InventoryStocks.findOne({ Stock_Name, Vendor_Id });

    if (existingStock) {
      // If a stock with the same name and vendor exists, send a response indicating the conflict
      return res.status(409).json({ message: 'Stock with the same name and vendor already exists' });
    }

    // Create a new inventory stock instance
    const newStock = new InventoryStocks({
      Category,
      Stock_Quantity,
      Price,
      Vendor_Id,
      Stock_Name,
      Vendor_Name,
    });

    // Save the new stock to the database
    const savedStock = await newStock.save();

    res.status(201).json(savedStock);
  } catch (error) {
    console.error('Error creating inventory stock:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});






// attendence api 
router.post("/attendance/:day/:id/:presence", async (req, res) => {
  var { day, id, presence } = req.params;

  if (day === "today") {
    var today = new Date();
    day = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  } else if (!/^\d{2}-\d{2}-\d{4}$/.test(day)) {
    return res
      .status(400)
      .send(
        "The day should be in the format of ddmmyyyy like 12-10-2023 for October 12th day."
      );
  }

  if (presence !== "true" && presence !== "false") {
    return res.status(400).send("The presence should be either true or false.");
  }

  presence = presence === "true";

  let attendance = await Attendance.findOne({ day });

  if (!attendance) {
    const managers = await Managerdetails.find(
      {},
      { _id: 1, fname: 1, lname: 1 }
    );
    const executives = await Executivedetails.find(
      {},
      { _id: 1, fname: 1, lname: 1 }
    );
    const employees = [...managers, ...executives].map((emp) => ({
      name: `${emp.fname} ${emp.lname}`,
      id: emp._id,
      present: false,
    }));

    attendance = new Attendance({ day, employees });
  } else {
    const employee = attendance.employees.find((emp) => emp.id === id);
    if (employee) {
      employee.present = presence === "true";
    }
  }

  await attendance.save();

  const presentCount = attendance.employees.filter((emp) => emp.present).length;
  const employee = attendance.employees.find((emp) => emp.id === id);

  res.json({
    day,
    name: employee.name,
    presence: employee.present,
    presentCount,
  });
});

router.post("/bulkattendance/:day", async (req, res) => {
  var { day } = req.params;
  var attendanceUpdates = req.body;

  if (!/^\d{2}-\d{2}-\d{4}$/.test(day)) {
    return res
      .status(400)
      .send(
        "The day should be in the format of ddmmyyyy like 12-10-2023 for October 12th day."
      );
  }

  let attendance = await Attendance.findOne({ day });

  if (!attendance) {
    // const managers = await ManagerDetails.find(
    //   {},
    //   { _id: 1, fname: 1, lname: 1 }
    // );
    const executives = await ExecutiveDetails.find(
      {},
      { _id: 1, fname: 1, lname: 1 }
    );
    const employees = [...executives].map((emp) => ({
      name: `${emp.fname} ${emp.lname}`,
      id: emp._id,
      present: false,
    }));

    attendance = new Attendance({ day, employees });
    for (let update of attendanceUpdates) {
      const employee = attendance.employees.find((emp) => emp.id === update.id);
      if (employee) {
        employee.present = update.present;
      }
    }
  } else {
    for (let update of attendanceUpdates) {
      const employee = attendance.employees.find((emp) => emp.id === update.id);
      if (employee) {
        employee.present = update.present;
      }
    }
  }

  await attendance.save();

  const presentCount = attendance.employees.filter((emp) => emp.present).length;

  res.json({
    day,
    presentCount,
  });
});

router.post("/inventorystock/:item/:quantity", async (req, res) => {
  const { item, quantity } = req.params;

  if (item && quantity) {
    let updateQuantity = parseInt(quantity);
    if (isNaN(updateQuantity)) {
      res.status(400).send("Bad Request: Quantity must be a number");
      return;
    }

    try {
      let inventoryItem = await InventoryStock.findOne({ addstocks: item });

      if (inventoryItem) {
        if (quantity.startsWith("+")) {
          inventoryItem.quantity += updateQuantity;
        } else if (quantity.startsWith("-")) {
          inventoryItem.quantity += updateQuantity;
        } else {
          inventoryItem.quantity = updateQuantity;
        }
      } else {
        inventoryItem = new InventoryStock({
          addstocks: item,
          quantity: updateQuantity,
        });
      }

      await inventoryItem.save();
      res.status(200).send(inventoryItem);
    } catch (error) {
      console.log(error);
      res.status(400).send("Failed to update inventory");
    }
  } else {
    res.status(400).send("Bad Request");
  }
});

router.post("/:table", async (req, res) => {
  const { table } = req.params;
  if (
    table.toLowerCase() === "attendance" ||
    table.toLowerCase() === "managerlogin"
  ) {
    res.status(400).send("Bad Request");
    return; ``
  }
  const Table = FindTable({ table });
  const reqBody = FilterBodyByTable({ req, table });
  if (Table && reqBody) {
    try {
      newEntry = new Table(reqBody);
      const savedEntry = await newEntry.save();
      res.status(200).json({
        newEntry: { ...reqBody, _id: savedEntry._id },
        message: "Entry saved successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        newEntry: { ...reqBody },
        message: "Failed to save entry",
      });
    }
  } else {
    res.status(400).send("Bad Request");
  }
});

router.post("/:table/:id", async (req, res) => {
  const { table, id } = req.params;
  if (
    table.toLowerCase() === "inventorystock" ||
    table.toLowerCase() === "attendance" ||
    table.toLowerCase() === "managerlogin"
  ) {
    res.status(400).send("Bad Request");
    return;
  }
  const Table = FindTable({ table });
  const reqBody = FilterBodyByTable({ req, table });
  if (Table && reqBody) {
    try {
      const updatedEntry = await Table.findByIdAndUpdate(id, reqBody, {
        new: true,
      });
      res.status(200).json({
        newEntry: { ...reqBody, _id: updatedEntry._id },
        message: "Entry saved successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        newEntry: { ...reqBody },
        message: "Failed to save entry",
      });
    }
  } else {
    res.status(400).send("Bad Request");
  }
});

module.exports = router;
