const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  firstName: { type: String, },
  lastName: { type: String, },
  managerEmail: { type: String, },
  managerPhone: { type: String, },
  managerAddress: { type: String, },
  managerCity: { type: String, },
  managerState: { type: String, },
  accountHolderName: { type: String, },
  accountNumber: { type: String, },
  ifscCode: { type: String, },
  bankName: { type: String, },
  branchName: { type: String, },
  profilePicture: { type: String,  }
});

module.exports = mongoose.model("Managers", Schema);
