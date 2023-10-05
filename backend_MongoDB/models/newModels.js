const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnquirySchema = new Schema({
  enquiry_id: Number,
  event_name: String,
  event_date: String,
  guest_quantity: Number,
  event_venue: String,
  event_requirement: String,
});

const QuotationSchema = new Schema({
  quotation_id: Number,
  enquiry_id: { type: Number, ref: "Enquiry" },
  customer_name: String,
  email: String,
  contact: Number,
  address: String,
  event_type: String,
  amount: Number,
  tax: Number,
  charges: Number,
  total_amount: Number,
});

const AdvPaymentSchema = new Schema({
  id: Number,
  enquiry_id: { type: Number, ref: "Enquiry" },
  event_name: String,
  client_name: String,
  amount: Number,
  adv_payment: Number,
  payment_date: String,
  rem_payment: Number,
  details: String,
});

const EventSchema = new Schema({
  event_id: Number,
  quotation_id: { type: Number, ref: "Quotation" },
  fname: String,
  company_name: String,
  email: String,
  contact: Number,
  event_type: String,
  event_date: String,
  venue: String,
  subvenue: String,
  guest_number: Number,
  budget: Number,
});

const OrderSchema = new Schema({
  order_id: Number,
  event_id: { type: Number, ref: "Event" },
  customer_name: String,
  contact: Number,
  email: String,
  date: String,
  venue: String,
  adv_payment: Number,
  rem_payment: Number,
  total_amt: String,
  status: String,
});

const EventExpenseSchema = new Schema({
  expense_id: Number,
  event_id: { type: Number, ref: "Event" },
  new_purchase: String,
  to_vendor: String,
  event_name: String,
  amount: Number,
  date: String,
  payment_details: String,
});

const ManagerSchema = new Schema({
  manager_id: Number,
  fname: String,
  lname: String,
  email: String,
  contact: Number,
  profile_image: String,
  pan_no: String,
  state: String,
  city: String,
  address: String,
  blood_group: String,
});

const ExecutiveSchema = new Schema({
  executive_id: Number,
  fname: String,
  lname: String,
  email: String,
  contact: Number,
  profile_image: String,
  pan_no: String,
  city: String,
  state: String,
  address: String,
  blood_group: String,
});

const VendorSchema = new Schema({
  vendor_id: Number,
  company_name: String,
  contact_person_name: String,
  gmail: String,
  contact: Number,
  profile_image: String,
  gst_no: Number,
  pan_no: String,
  address: String,
});

const ManagerDetailsSchema = new Schema({
  manager_id: { type: Number, ref: "Manager" },
  fname: String,
  lname: String,
  email: String,
  contact: Number,
  profile_image: String,
  address: String,
  city: String,
  state: String,
  holder_name: String,
  account_number: Number,
  IFSC_code: String,
  bank_name: String,
  branch_name: String,
});

const ExecutiveDetailsSchema = new Schema({
  executive_id: { type: Number, ref: "Executive" },
  fname: String,
  lname: String,
  email: String,
  contact: Number,
  profile_image: String,
  address: String,
  city: String,
  state: String,
  holder_name: String,
  account_number: Number,
  IFSC_code: String,
  bank_name: String,
  branch_name: String,
});

const StaffSalarySchema = new Schema({
  staff_id: Number,
  fname: String,
  lname: String,
  salary: Number,
  date: String,
  month: String,
  adv_payment: Number,
  rem_payment: Number,
  incentive: Number,
  deduct_amount: Number,
});

const StaffSalaryDetailsSchema = new Schema({
  staff_id: { type: Number, ref: "StaffSalary" },
  name: String,
  salary: Number,
  date: String,
  month: String,
});

const VendorPaymentSchema = new Schema({
  vendor_id: { type: Number, ref: "Vendor" },
  id: Number,
  event_id: { type: Number, ref: "Event" },
  fname: String,
  lname: String,
  event_name: String,
  paid_amt: Number,
  rem_amt: Number,
  date: String,
  description: String,
});

const VendorPaymentHistorySchema = new Schema({
  vendor_id: { type: Number, ref: "Vendor" },
  name: String,
  amt_paid: Number,
  rem_amt: Number,
  event_name: String,
  date: String,
  total_amount: Number,
});

const InventoryStockSchema = new Schema({
  addstocks: String,
  quantity: Number,
});

const AccountantDetailsSchema = new Schema({
  Accountant_id: { type: Number, ref: "Executive" },
  fname: String,
  lname: String,
  email: String,
  contact: Number,
  profile_image: String,
  address: String,
  city: String,
  state: String,
  holder_name: String,
  account_number: Number,
  IFSC_code: String,
  bank_name: String,
  branch_name: String,
});

module.exports = {
  Enquiry: mongoose.model("Enquiry", EnquirySchema),
  Quotation: mongoose.model("Quotation", QuotationSchema),
  AdvPayment: mongoose.model("AdvPayment", AdvPaymentSchema),
  Event: mongoose.model("Event", EventSchema),
  Order: mongoose.model("Order", OrderSchema),
  EventExpense: mongoose.model("EventExpense", EventExpenseSchema),
  Manager: mongoose.model("Manager", ManagerSchema),
  Executive: mongoose.model("Executive", ExecutiveSchema),
  Vendor: mongoose.model("Vendor", VendorSchema),
  ManagerDetails: mongoose.model("ManagerDetails", ManagerDetailsSchema),
  ExecutiveDetails: mongoose.model("ExecutiveDetails", ExecutiveDetailsSchema),
  StaffSalary: mongoose.model("StaffSalary", StaffSalarySchema),
  StaffSalaryDetails: mongoose.model(
    "StaffSalaryDetails",
    StaffSalaryDetailsSchema
  ),
  VendorPayment: mongoose.model("VendorPayment", VendorPaymentSchema),
  VendorPaymentHistory: mongoose.model(
    "VendorPaymentHistory",
    VendorPaymentHistorySchema
  ),
  InventoryStock: mongoose.model("InventoryStock", InventoryStockSchema),
  Accountant: mongoose.model("Accountant", AccountantDetailsSchema),
};
