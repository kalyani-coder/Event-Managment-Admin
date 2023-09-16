const express = require("express");
const router = express.Router();

const { FindTable } = require("../utils/utils");

router.get("/:table", async (req, res) => {
  const { table } = req.params;
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

module.exports = router;
