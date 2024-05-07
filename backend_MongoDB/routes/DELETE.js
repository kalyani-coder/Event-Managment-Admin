const express = require("express");
const router = express.Router();

const { FindTable } = require("../utils/utils");
const {AddVendor} = require('../models/newModels')
const {InventoryStocks} =  require('../models/newModels')
const {AddEventMaster,advancePaymantManager} =  require('../models/newModels')
const { ManagerDetails , ManagerTask,QuatationInfo, bankTransper, allBanks} = require("../models/newModels");


// delete route for all bank accounts 
router.delete("/allbanks/:id" , async( req, res) => {
  const bankId = req.params.id
  try{

    const deletedBank = await allBanks.findByIdAndDelete(bankId)
    res.status(201).json({message : "Bank Deleted Successfully"})

  }catch(e){
    res.status(500).json({message : "Internal server error"})
  }
})




router.delete('/banktransper/:id', async (req, res) => {
  const deletedManagerId = req.params.id;

  try {
    const deletedManager = await bankTransper.findByIdAndDelete(deletedManagerId);

    if (!deletedManager) {
      return res.status(404).json({message: 'banktransper not found'});
    }

    res.status(200).json({ message: 'banktransper deleted successfully'});
  } catch (error) {
    console.error('Error deleting Event by ID:', error);
    res.status(500).json({ message: 'Internal server error'});
  }
});

router.delete('/quatationinfo/:id', async (req, res) => {
  const deletedManagerId = req.params.id;

  try {
    const deletedManager = await QuatationInfo.findByIdAndDelete(deletedManagerId);

    if (!deletedManager) {
      return res.status(404).json({message: 'quatationinfo not found'});
    }

    res.status(200).json({ message: 'quatationinfo deleted successfully'});
  } catch (error) {
    console.error('Error deleting Event by ID:', error);
    res.status(500).json({ message: 'Internal server error'});
  }
});

// DELETE route for manager task 
router.delete('/managertask/:id', async (req, res) => {
  const deletedManagerId = req.params.id;

  try {
    const deletedManager = await ManagerTask.findByIdAndDelete(deletedManagerId);

    if (!deletedManager) {
      return res.status(404).json({message: 'Manager task not found'});
    }

    res.status(200).json({ message: 'Manager task deleted successfully'});
  } catch (error) {
    console.error('Error deleting Event by ID:', error);
    res.status(500).json({ message: 'Internal server error'});
  }
});

// DELETE ROUTE FOR MANAGER 

router.delete('/addmanager/:id', async (req, res) => {
  const deletedManagerId = req.params.id;

  try {
    const deletedManager = await ManagerDetails.findByIdAndDelete(deletedManagerId);

    if (!deletedManager) {
      return res.status(404).json({message: 'Payment not found'});
    }

    res.status(200).json({ message: 'Payment deleted successfully'});
  } catch (error) {
    console.error('Error deleting Event by ID:', error);
    res.status(500).json({ message: 'Internal server error'});
  }
});



// DELETE ROUTE FOR ADVPAYMENT 
router.delete('/advpaymanager/:id', async (req, res) => {
  const deletedAdvPayManagerId = req.params.id;

  try {
    const deletedEventName = await advancePaymantManager.findByIdAndDelete(deletedAdvPayManagerId);

    if (!deletedEventName) {
      return res.status(404).json({message: 'Payment not found'});
    }

    res.status(200).json({ message: 'Payment deleted successfully'});
  } catch (error) {
    console.error('Error deleting Event by ID:', error);
    res.status(500).json({ message: 'Internal server error'});
  }
});


router.delete('/addeventmaster/:id', async (req, res) => {
  const deletedEventId = req.params.id;

  try {
    const deletedEventName = await AddEventMaster.findByIdAndDelete(deletedEventId);

    if (!deletedEventName) {
      return res.status(404).json({message: 'Event not found'});
    }

    res.status(200).json({ message: 'Event deleted successfully'});
  } catch (error) {
    console.error('Error deleting Event by ID:', error);
    res.status(500).json({ message: 'Internal server error'});
  }
});

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
