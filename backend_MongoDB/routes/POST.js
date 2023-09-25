const express = require("express");
const router = express.Router();

const { FindTable } = require("../utils/utils");
const { FilterBodyByTable } = require("../utils/utils");

const { InventoryStock } = require("../models/newModels");
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
  const Table = FindTable({ table });
  const reqBody = FilterBodyByTable({ req, table });
  if (Table && reqBody) {
    try {
      newEntry = new Table(reqBody);
      newEntry.save();
      res.status(200).json({
        newEntry: { ...reqBody },
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
  if (table === "inventorystock") {
    res.status(400).send("Bad Request");
    return;
  }
  const Table = FindTable({ table });
  const reqBody = FilterBodyByTable({ req, table });
  if (Table && reqBody) {
    try {
      await Table.findByIdAndUpdate(id, reqBody);
      res.status(200).json({
        newEntry: { ...reqBody },
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
