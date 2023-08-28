const express = require("express");
const router = express.Router();

const { FindTable } = require("../utils/utils");
const { FilterBodyByTable } = require("../utils/utils");

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
