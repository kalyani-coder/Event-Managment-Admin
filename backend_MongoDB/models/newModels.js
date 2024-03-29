const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnquirySchema = new Schema({
  enquiry_id: Number,
  event_name: String,
  event_date: String,
  guest_quantity: Number,
  event_venue: String,
  event_requirement: String,
  customer_name: String,
  email: String,
  contact: Number,
  address: String,
  status : {
    type : String,
    default : ""
  },
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
  payment_method: String,
  cash_reciever: String,
  check_reciever: String,
  utr_no: String,
  cheque_no: String,
  date: String,
  time: String,
  UPI_id: String,
  transaction_id: String,
});

const EventSchema = new Schema({
  eventName: String,
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
  event_id: { type: String, ref: "Event" },
  customer_name: String,
  contact: Number,
  email: String,
  date: String,
  venue: String,
  adv_payment: Number,
  rem_payment: Number,
  total_amt: Number,
  status: String,
  completed: Boolean,
});

const Attendance = new Schema({
  day: String,
  employees: [
    {
      name: String,
      id: String,
      present: Boolean,
    },
  ],
});

const ExecutiveTask = new Schema({
  Task: String,
  exe_id: String,
  Date: String,
  Time: String,
  Status: String,
  EventId: String,
});

const EventExpenseSchema = new Schema({
  event_id: { type: String, ref: "Event" },
  new_purchase: String,
  to_vendor: String,
  event_name: String,
  amount: Number,
  date: String,
  payment_details: String,
  expense_type: String,
  manager: String,
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
  // profile_image: String,
  address: String,
  city: String,
  state: String,
  holder_name: String,
  account_number: Number,
  IFSC_code: String,
  bank_name: String,
  branch_name: String,
});

const ManagerLoginSchema = new Schema({
  manager_id: String,
  email: String,
  password: String,
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
  time :String,
  month: String,
  adv_payment: Number,
  rem_payment: Number,
  incentive: Number,
  deduct_amount: Number,

  adv_taken :Number,
  balance_amount :Number,
  type_Of_Salary : String,
  salary_person_name : String,
  salary_person_id : String,



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
  salary: Number,
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

const AddVendor = new Schema({
  Vendor_Name : {
      type : String,
      required : true
  }
})

const QuatationInfo = new Schema({
  title : String,
  particular : String,
  description :String,
  vendor_Name : String,
  vendor_Stock : String,
  unit : String,
  quantity : Number,
  rateper_Days :Number,
  days :Number,
  amount : String,
  name : String,
  transport : String 
})

const InventoryStocks = new Schema({
  Category : {
    type : String,
    required : true
  },
  Stock_Name : {
    type  : String,
    required : true
  },
  Stock_Quantity :{
    type : Number,
    required : true

  },
  Price : {
    type : Number,
    required : true
  },
  Vendor_Id : String,
  Vendor_Name : String,

})

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

const AddEventMaster = new Schema({
  eventName : {type: String, required: true,}
})

module.exports = {
  ExecutiveTask: mongoose.model("ExecutiveTask", ExecutiveTask),
  AddVendor : mongoose.model("AddVendor" , AddVendor),
  AddEventMaster : mongoose.model("Addevent" , AddEventMaster),
  QuatationInfo  : mongoose.model("quatationinfo" , QuatationInfo),
  InventoryStocks : mongoose.model('inventory-stocks' , InventoryStocks),
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
  Attendance: mongoose.model("Attendance", Attendance),
  InventoryStock: mongoose.model("InventoryStock", InventoryStockSchema),
  Accountant: mongoose.model("Accountant", AccountantDetailsSchema),
  ManagerLogin: mongoose.model("ManagerLogin", ManagerLoginSchema),
  // ExecutiveTask: mongoose.model("ExecutiveTask", ExecutiveTask),
};
