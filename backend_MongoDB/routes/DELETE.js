const express = require("express");
const router = express.Router();

const { FindTable } = require("../utils/utils");

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
