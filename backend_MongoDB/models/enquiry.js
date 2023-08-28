const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  title: { type: String, required: true },
  eventName: { type: String, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  contactNumber: { type: String, required: true },
  customerAddress: { type: String, required: true },
  eventDate: { type: String, required: true },
  numberOfGuests: { type: String, required: true },
  eventVenue: { type: String, required: true },
  eventRequirement: { type: String, required: true }
});

module.exports = mongoose.model("Enquiries", Schema);
