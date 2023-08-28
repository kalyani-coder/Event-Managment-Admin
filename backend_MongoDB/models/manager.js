const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  managerEmail: { type: String, required: true },
  managerPhone: { type: String, required: true },
  managerAddress: { type: String, required: true },
  managerCity: { type: String, required: true },
  managerState: { type: String, required: true },
  accountHolderName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  ifscCode: { type: String, required: true },
  bankName: { type: String, required: true },
  branchName: { type: String, required: true },
  profilePicture: { type: String, required: false }
});

module.exports = mongoose.model("Managers", Schema);
