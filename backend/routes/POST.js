const express = require("express");
const router = express.Router();
const connection = require("../database");

const determineReq = (req, table) => {
  if (table === "managers") {
    const {
      firstName,
      lastName,
      managerEmail,
      managerPhone,
      managerAddress,
      managerCity,
      managerState,
      accountHolderName,
      accountNumber,
      ifscCode,
      bankName,
      branchName,
      profilePicture,
    } = req.body;
    return {
      firstName,
      lastName,
      managerEmail,
      managerPhone,
      managerAddress,
      managerCity,
      managerState,
      accountHolderName,
      accountNumber,
      ifscCode,
      bankName,
      branchName,
      profilePicture,
    };
  } else {
    return null;
  }
};

router.post("/:table", (req, res) => {
  const { table } = req.params;
  const body = determineReq(req, table);
  if (body) {
    connection.query(
      `INSERT INTO ?? SET ?`,
      [table, body],
      (error, results) => {
        if (error) {
          res
            .status(401)
            .json({ message: "Unable to insert", body: body, error: error });
          return;
        }
        res.json(results);
      }
    );
  } else {
    res.status(401).json({ message: "Bad request..." });
  }
});

router.post("/:table/:id", (req, res) => {
  const { table, id } = req.params;
  const body = determineReq(req, table);
  if (body) {
    connection.query(
      `UPDATE ?? SET ? WHERE id = ?`,
      [table, body, id],
      (error, results) => {
        if (error) {
          res
            .status(401)
            .json({ message: "Unable to update", body: body, error: error });
          return;
        }
        res.json(results);
      }
    );
  } else {
    res.status(401).json({ message: "Bad request..." });
  }
});

module.exports = router;
