const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  accountHolderName: { type: String, },
  accountNumber: { type: String, },
  bankName: { type: String, },
  branchName: { type: String, },
  executiveAddress: { type: String, },
  executiveCity: { type: String, },
  executiveEmail: { type: String, },
  executivePhone: { type: String, },
  executiveState: { type: String, },
  firstName: { type: String, },
  ifscCode: { type: String, },
  lastName: { type: String, },
  profilePicture: { type: String,  },
});

module.exports = mongoose.model("Executives", Schema);
