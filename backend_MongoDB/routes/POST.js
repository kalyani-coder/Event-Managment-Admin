const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
JWT_SECRET = "vedant"

const { FindTable } = require("../utils/utils");
const { FilterBodyByTable } = require("../utils/utils");

const { InventoryStock, AddEventMaster } = require("../models/newModels");
const { ExecutiveTask } = require("../models/newModels");
const { Attendance } = require("../models/newModels");
const { ManagerDetails } = require("../models/newModels");
const { ExecutiveDetails } = require("../models/newModels");
const { AddVendor } = require('../models/newModels')
const { InventoryStocks } = require('../models/newModels')
const { QuatationInfo, advancePaymantManager, ManagerTask } = require('../models/newModels')


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


// Login with JWT Token
router.post("/manager/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const manager = await ManagerDetails.findOne({ email });
    if (!manager) {
      return res.status(404).json({ message: "Email not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, manager.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ email: manager.email, _id: manager._id }, JWT_SECRET);

    res.status(200).json({ message: "Login successful", email: manager.email, _id: manager._id, token, });
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
    const hashedPassword = await bcrypt.hash(password, 10);
    const newManager = new ManagerDetails({
      fname: fname,
      lname: lname,
      email: email,
      password: hashedPassword,
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
    console.error('Error saving advance payment:', error);
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

// POST route to add QuatationInfo
router.post("/quatationinfo", async (req, res) => {
  try {

    const { quatationInfoData } = req.body;

    // Validate and save each quatationInfoData
    const savedQuatationInfos = await Promise.all(
      quatationInfoData.map(async (data) => {
        const newQuatationInfo = new QuatationInfo(data);
        return await newQuatationInfo.save();
      })
    );

    res.status(201).json(savedQuatationInfos);
  } catch (err) {
    console.error("Error creating quatation info:", err);
    res.status(500).json({ message: "Internal server error" });
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

// router.post('/executivetask', async (req, res) => {
//   try {
//     const { Task, exe_id, Date, Time, Status, EventId } = req.body;
//     const executiveTask = new ExecutiveTask({ Task, exe_id, Date, Time, Status, EventId });
//     await executiveTask.save();
//     res.status(200).json(executiveTask);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// });

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
