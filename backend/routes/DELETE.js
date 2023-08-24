const express = require("express");
const router = express.Router();
const connection = require("../database");

router.delete("/:table/:id", (req, res) => {
  const { table, id } = req.params;
  connection.query(
    `DELETE FROM ?? WHERE id = ?`,
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
