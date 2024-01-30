const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  title: { type: String, },
  eventName: { type: String, },
  customerName: { type: String, },
  customerEmail: { type: String, },
  contactNumber: { type: String, },
  customerAddress: { type: String, },
  eventDate: { type: String, },
  numberOfGuests: { type: String, },
  eventVenue: { type: String, },
  eventRequirement: { type: String, }
});

module.exports = mongoose.model("Enquiries", Schema);
