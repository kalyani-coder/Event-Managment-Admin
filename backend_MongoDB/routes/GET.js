const express = require("express");
const router = express.Router();
const { Attendance } = require("../models/newModels");

const { FindTable } = require("../utils/utils");

router.get("/attendance/:day", (req, res) => {
  const { day } = req.params;
  if (day === "today") {
    res.status(400).send("Bad Request");
    return;
  }
  const Table = Attendance;
  if (Table) {
    try {
      result = Table.find({ day });
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(400).send("Unable to fetch table");
    }
  } else {
    res.status(400).send("Bad Request");
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
  const { table } = req.params;
  if (table === "attendance") {
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
  if (table === "attendance") {
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
