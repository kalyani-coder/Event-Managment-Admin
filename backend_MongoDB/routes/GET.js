const express = require("express");
const router = express.Router();
const { Attendance } = require("../models/newModels");
// const { ExecutiveTask } = require("../models/newModels");
const { ExecutiveDetails } = require("../models/newModels");
const { AddVendor } = require("../models/newModels");
const { InventoryStocks } = require("../models/newModels");
const { QuatationInfo } = require("../models/newModels");
const { AddEventMaster, advancePaymantManager, ManagerDetails ,ManagerTask , bankTransper, Enquiry,allBanks, venue} = require("../models/newModels");


const { FindTable } = require("../utils/utils");

// venue get route 
router.get("/venue" , async(req, res) => {
  try{

    const getVenue = await venue.find()
    res.status(201).json(getVenue)

  }catch(e){
    res.status(500).json({message : "internal server error"})
  }
})
// All Banks accounts get route 
router.get("/allbanks" , async(req, res) => {
  try{

    const banks = await allBanks.find()
    res.status(201).json(banks)
    
  }catch(e){
    res.status(500).json({message : "Internal Server error"})
  }
})

router.get("/allbanks/:id" , async(req, res) => {

  const bankId = req.params.id
  try{

    const getDataById = await allBanks.findById(bankId)
    res.status(201).json(getDataById)

  }catch(e){
    res.status(500).json({message : "Internal server Error"})
  }
})


// get api by manager id 
router.get("/:table/:assign_manager_Id", async (req, res) => {
  const { table, assign_manager_Id } = req.params;

  // Check if the table is valid
  if (
    table.toLowerCase() !== "enquiry" &&
    table.toLowerCase() !== "enquiries" // Add other valid table names if needed
  ) {
    return res.status(400).send("Bad Request");
  }

  try {
    // Find enquiries with the specified assign_manager_Id in the Enquiry model
    const enquiries = await Enquiry.find({ assign_manager_Id: assign_manager_Id });

    if (enquiries.length === 0) {
      return res.status(404).json({ message: "No enquiries found for this manager ID" });
    }

    res.status(200).json(enquiries);
  } catch (err) {
    console.error("Error fetching enquiries by manager ID:", err);
    res.status(500).json({ message: "Internal server error", error: err });
  }
});
// Bank Transfer api 
router.get("/banktransper" , async(req, res) => {
  try{

    const BankTransper = await bankTransper.find()
    res.status(201).json(BankTransper)
    
  }catch(e){
    res.status(500).json({message : "Internal server error"})
  }
})

// manager task api get route 
router.get("/managertask", async (req, res) => {
  try {
    const Manager = await ManagerTask.find()
    res.status(201).json(Manager)

  } catch (err) {
    res.status(500).json({ message: "Internal server error" })
  }
})

// GEt  for manager all 
router.get("/addmanager", async (req, res) => {
  try {
    const Manager = await ManagerDetails.find()
    res.status(201).json(Manager)

  } catch (err) {
    res.status(500).json({ message: "Internal server error" })
  }
})


//Advance payment for manager GET route
router.get("/advpaymanager", async (req, res) => {
  try {
    const advpayManager = await advancePaymantManager.find()
    res.status(201).json(advpayManager)

  } catch (err) {
    res.status(500).json({ message: "Internal server error" })
  }
})

// AddEventName route for get 
router.get("/addeventmaster", async (req, res) => {
  try {
    const addEvent = await AddEventMaster.find()
    res.status(200).json(addEvent)
  } catch (e) {
    res.status(404).json({ message: "Internal server Error " })
  }
})


// get in addvendor api 
router.get("/addvendor", async (req, res) => {
  try {
    const vendors = await AddVendor.find();
    res.status(200).json(vendors);
  } catch (err) {
    console.error("Error fetching vendors:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/vendors/:vendorId", async (req, res) => {
  const vendorId = req.params.vendorId;

  try {
    const vendor = await AddVendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json(vendor);
  } catch (err) {
    console.error("Error fetching vendor by ID:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET all inventory stocks
router.get('/inventory-stocks', async (req, res) => {
  try {
    const stocks = await InventoryStocks.find();
    res.status(200).json(stocks);
  } catch (error) {
    console.error('Error fetching inventory stocks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/inventory-stocks/:stockId', async (req, res) => {
  const stockId = req.params.stockId;

  try {
    const stock = await InventoryStocks.findById(stockId);

    if (!stock) {
      return res.status(404).json({ message: 'Inventory stock not found' });
    }

    res.status(200).json(stock);
  } catch (error) {
    console.error('Error fetching inventory stock by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// get by vendor id 
router.get('/inventory-stocks/vendor/:vendorId', async (req, res) => {
  const vendorId = req.params.vendorId;

  try {
    // Assuming that you have a field called 'Vendor_Id' in your model
    const stocks = await InventoryStocks.find({ Vendor_Id: vendorId });

    if (!stocks || stocks.length === 0) {
      return res.status(404).json({ message: 'No inventory stocks found for the specified vendor' });
    }

    res.status(200).json(stocks);
  } catch (error) {
    console.error('Error fetching inventory stocks by Vendor_Id:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// get quatationonfo 
router.get("/quatationinfo", async (req, res) => {
  try {
    const allQuatationInfo = await QuatationInfo.find();
    res.status(200).json(allQuatationInfo);
  } catch (err) {
    console.error("Error fetching quatation info:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get method for inventory stocks 
router.get('/inventory-stocks/vendor/:vendorId/stock/:stockName', async (req, res) => {
  const vendorId = req.params.vendorId;
  const stockName = req.params.stockName;

  try {
    // Assuming that you have fields called 'Vendor_Id' and 'Stock_Name' in your model
    const stocks = await InventoryStocks.find({ Vendor_Id: vendorId, Stock_Name: stockName });

    if (!stocks || stocks.length === 0) {
      return res.status(404).json({ message: 'No inventory stocks found for the specified vendor and stock' });
    }

    res.status(200).json(stocks);
  } catch (error) {
    console.error('Error fetching inventory stocks by Vendor_Id and Stock_Name:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/inventory-stocks/stock/:stockName/vendor/:vendorId', async (req, res) => {
  const vendorId = req.params.vendorId;
  const stockName = req.params.stockName;

  try {
    // Assuming that you have fields called 'Vendor_Id' and 'Stock_Name' in your model
    const stocks = await InventoryStocks.find({ Vendor_Id: vendorId, Stock_Name: stockName });

    if (!stocks || stocks.length === 0) {
      return res.status(404).json({ message: 'No inventory stocks found for the specified vendor and stock' });
    }

    res.status(200).json(stocks);
  } catch (error) {
    console.error('Error fetching inventory stocks by Vendor_Id and Stock_Name:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/inventory-stocks/stock/:stockName', async (req, res) => {
  const stockName = req.params.stockName;

  try {
    // Assuming that you have fields called 'Vendor_Id' and 'Stock_Name' in your model
    const stocks = await InventoryStocks.find({ Stock_Name: stockName });

    if (!stocks || stocks.length === 0) {
      return res.status(404).json({ message: 'No inventory stocks found for the specified vendor and stock' });
    }

    res.status(200).json(stocks);
  } catch (error) {
    console.error('Error fetching inventory stocks by Vendor_Id and Stock_Name:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// old code 
// get method for quatationinfo 
// Attendance table 
router.get("/attendance/:day", async (req, res) => {
  const { day } = req.params;
  if (day === "today") {
    res.status(400).send("Bad Request");
    return;
  }

  try {
    let attendance = await Attendance.findOne({ day });
    if (!attendance) {
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
      await attendance.save();
      res.status(200).json(employees);
      return;
    }

    res.status(200).json(attendance.employees);
  } catch (err) {
    console.log(err);
    res.status(400).send("Unable to fetch table");
  }
});

router.get("/attendance", async (req, res) => {
  const Table = Attendance;

  if (Table) {
    try {
      result = await Table.find();
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(400).send("Unable to fetch table");
    }
  } else {
    res.status(400).send("Bad Request");
  }
});

router.get("/:table", async (req, res) => {
  // console.log("HIT")
  const { table } = req.params;
  if (
    table.toLowerCase() === "attendance" ||
    table.toLowerCase() === "managerlogin"
  ) {
    res.status(400).send("Bad Request");
    return;
  }
  const Table = FindTable({ table });
  if (Table) {
    try {
      result = await Table.find();
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(400).send("Unable to fetch table");
    }
  } else {
    res.status(400).send("Bad Request");
  }
});

router.get("/:table/:id", async (req, res) => {
  const { table, id } = req.params;
  if (
    table.toLowerCase() === "attendance" ||
    table.toLowerCase() === "managerlogin"
  ) {
    res.status(400).send("Bad Request");
    return;
  }
  const Table = FindTable({ table });
  if (Table) {
    try {
      result = await Table.findById(id);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(400).send("Unable to fetch table");
    }
  } else {
    res.status(400).send("Bad Request");
  }
});

router.get("/:table/:field/:value", async (req, res) => {
  const { table, field, value } = req.params;
  if (table === "attendance") {
    res.status(400).send("Bad Request");
    return;
  }
  const Table = FindTable({ table });
  if (Table) {
    try {
      result = await Table.find({ [field]: value });
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(400).send("Unable to fetch table");
    }
  } else {
    res.status(400).send("Bad Request");
  }
});

module.exports = router;
