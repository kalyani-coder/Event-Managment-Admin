const express = require("express");
const router = express.Router();

const { FindTable } = require("../utils/utils");
const {AddVendor} = require('../models/newModels')
const {InventoryStocks,ExpenceForm} =  require('../models/newModels')
const {AddEventMaster,advancePaymantManager,AdvanceExpence,CustomerQuatationInfo, AdminLogin} =  require('../models/newModels')
const { ManagerDetails , ManagerTask,QuatationInfo, bankTransper, allBanks, venue} = require("../models/newModels");


// Admin LDelete Route /
router.delete("/admin/:id", async(req, res)=>{
  try{
    const id = req.params.id
    const deletedAdmin = await AdminLogin.findByIdAndDelete(id)
    if(!deletedAdmin){
      return res.status(404).json({message : "Admin NOt Found"})
    }
    res.status(202).json(deletedAdmin)

  }catch(e){
    res.status(500).json({message : "Internal server error"})
  }
})


// DELLETE FOR CUS QUOTATION INFO BY ID 
router.delete('/customerquotationinfo/:id', async (req, res) => {
  const deletedManagerId = req.params.id;

  try {
    const deletedManager = await CustomerQuatationInfo.findByIdAndDelete(deletedManagerId);

    if (!deletedManager) {
      return res.status(404).json({message: 'quatationinfo not found'});
    }

    res.status(200).json({ message: 'quatationinfo deleted successfully'});
  } catch (error) {
    console.error('Error deleting Event by ID:', error);
    res.status(500).json({ message: 'Internal server error'});
  }
});

// DELETE BYE REQUIREMENT ID 
router.delete('/customerquotationinfo/customer/:customerId/requirements/:requirementId', async (req, res) => {
  const { customerId, requirementId } = req.params;

  try {
      const quotation = await CustomerQuatationInfo.findOneAndUpdate(
          { customer_Id: customerId },
          { $pull: { requirements: { _id: requirementId } } },
          { new: true }
      );

      if (!quotation) {
          return res.status(404).json({ message: 'Quotation not found' });
      }

      res.json(quotation);
  } catch (error) {
      console.error('Error deleting requirement', error);
      res.status(500).json({ message: 'Server error' });
  }
});

















router.delete("/advanceexpence/:id" , async(req, res) => {
  const expenceId = req.params.id
  try{
    const deletedExpence = await AdvanceExpence.findByIdAndDelete(expenceId)
    if(!deletedExpence){
      return res.status(404).json({message : "Expence Id not found"})
    }
    res.status(201).json({message : "Expence Deleted Successfully"})

  }catch(e){
    res.status(500).json({message : "Internal server error"})
  }
})

// delete route for the expence 
router.delete("/expence/:id" , async(req, res) => {
  const expenceId = req.params.id
  try{
    const deletedExpence = await ExpenceForm.findByIdAndDelete(expenceId)
    if(!deletedExpence){
      return res.status(404).json({message : "Expence Id not found"})
    }
    res.status(201).json({message : "Expence Deleted Successfully"})

  }catch(e){
    res.status(500).json({message : "Internal server error"})
  }
})
// delete route for venue 
router.delete("/venue/:id" , async(req, res) => {

  const venueId = req.params.id
  try{

    const deletedVenue = await venue.findByIdAndDelete(venueId)
    res.status(201).json({message : "Venue Deleted successfully"})

  }catch(e){
    res.status(500).json({message : "Internal server error"})
  }
})
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

router.delete('/quotationinfo/:id', async (req, res) => {
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

// Route to delete a requirement by ID
router.delete('/quotationinfo/customer/:customerId/requirements/:requirementId', async (req, res) => {
  const { customerId, requirementId } = req.params;

  try {
      const quotation = await QuatationInfo.findOneAndUpdate(
          { customer_Id: customerId },
          { $pull: { requirements: { _id: requirementId } } },
          { new: true }
      );

      if (!quotation) {
          return res.status(404).json({ message: 'Quotation not found' });
      }

      res.json(quotation);
  } catch (error) {
      console.error('Error deleting requirement', error);
      res.status(500).json({ message: 'Server error' });
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
