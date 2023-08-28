const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  accountHolderName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  bankName: { type: String, required: true },
  branchName: { type: String, required: true },
  executiveAddress: { type: String, required: true },
  executiveCity: { type: String, required: true },
  executiveEmail: { type: String, required: true },
  executivePhone: { type: String, required: true },
  executiveState: { type: String, required: true },
  firstName: { type: String, required: true },
  ifscCode: { type: String, required: true },
  lastName: { type: String, required: true },
  profilePicture: { type: String, required: false },
});

module.exports = mongoose.model("Executives", Schema);
