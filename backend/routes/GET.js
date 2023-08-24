const express = require("express");
const router = express.Router();
const connection = require("../database");

router.get("/:table", (req, res) => {
  const { table } = req.params;
  connection.query(`SELECT * FROM ??`, [table], (error, results) => {
    if (error) {
      res.status(401).json({ message: "Bad request...", error });
      return;
    }
    res.json(results);
  });
});

router.get("/:table/:id", (req, res) => {
  const { table, id } = req.params;
  connection.query(
    `SELECT * FROM ?? WHERE id = ?`,
    [table, id],
    (error, results) => {
      if (error) {
        res.status(401).json({ message: "Bad request..." });
        return;
      }
      res.json(results);
    }
  );
});

module.exports = router;
