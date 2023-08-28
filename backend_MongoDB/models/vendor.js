const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  vendorCategory: { type: String, required: true },
  vendorCompanyName: { type: String, required: true },
  vendorContactPerson: { type: String, required: true },
  vendorEmail: { type: String, required: true },
  vendorPhone: { type: String, required: true },
  vendorAddress: { type: String, required: true },
  vendorCity: { type: String, required: true },
  vendorState: { type: String, required: true },
  gstNumber: { type: String, required: true },
  panNumber: { type: String, required: true },
  profilePicture: { type: String, required: false },
});

module.exports = mongoose.model("Vendors", Schema);
