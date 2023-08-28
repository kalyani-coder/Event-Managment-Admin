const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  accountHolderName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  accountantAddress: { type: String, required: true },
  accountantCity: { type: String, required: true },
  accountantEmail: { type: String, required: true },
  accountantPhone: { type: String, required: true },
  accountantState: { type: String, required: true },
  bankName: { type: String, required: true },
  branchName: { type: String, required: true },
  firstName: { type: String, required: true },
  ifscCode: { type: String, required: true },
  lastName: { type: String, required: true },
  profilePicture: { type: String, required: false },
});

module.exports = mongoose.model("Accountants", Schema);
