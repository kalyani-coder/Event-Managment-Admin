const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  vendorCategory: { type: String, },
  vendorCompanyName: { type: String, },
  vendorContactPerson: { type: String, },
  vendorEmail: { type: String, },
  vendorPhone: { type: String, },
  vendorAddress: { type: String, },
  vendorCity: { type: String, },
  vendorState: { type: String, },
  gstNumber: { type: String, },
  panNumber: { type: String, },
  profilePicture: { type: String,  },
});

module.exports = mongoose.model("Vendors", Schema);
