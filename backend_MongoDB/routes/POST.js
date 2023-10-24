const express = require("express");
const router = express.Router();

const { FindTable } = require("../utils/utils");
const { FilterBodyByTable } = require("../utils/utils");

const { InventoryStock } = require("../models/newModels");
const { Attendance } = require("../models/newModels");
const { Managerdetails } = require("../models/newModels");
const { Executivedetails } = require("../models/newModels");
const { ExecutiveTask } = require("../models/newModels");

router.post("/attendance/:day/:id/:presence", async (req, res) => {
  const { day, id, presence } = req.params;

  if (day === "today") {
    const today = new Date();
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
    return;
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
