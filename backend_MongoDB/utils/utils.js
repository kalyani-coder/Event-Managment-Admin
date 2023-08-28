const Accountants = require("../models/accountant");
const Enquiries = require("../models/enquiry");
const Executives = require("../models/executive");
const Vendors = require("../models/vendor");
const Managers = require("../models/manager");

const FindTable = ({ table }) => {
  if (table.toLowerCase() === "accountants") {
    return Accountants;
  } else if (table.toLowerCase() === "enquiries") {
    return Enquiries;
  } else if (table.toLowerCase() === "executives") {
    return Executives;
  } else if (table.toLowerCase() === "vendors") {
    return Vendors;
  } else if (table.toLowerCase() === "managers") {
    return Managers;
  } else {
    return null;
  }
};

const FilterBodyByTable = ({ req, table }) => {
  if (table === "accountants") {
    const {
      accountHolderName,
      accountNumber,
      accountantAddress,
      accountantCity,
      accountantEmail,
      accountantPhone,
      accountantState,
      bankName,
      branchName,
      firstName,
      ifscCode,
      lastName,
      profilePicture,
    } = req.body;
    return {
      accountHolderName,
      accountNumber,
      accountantAddress,
      accountantCity,
      accountantEmail,
      accountantPhone,
      accountantState,
      bankName,
      branchName,
      firstName,
      ifscCode,
      lastName,
      profilePicture,
    };
  } else if (table === "enquiries") {
    const {
      title,
      eventName,
      customerName,
      customerEmail,
      contactNumber,
      customerAddress,
      eventDate,
      numberOfGuests,
      eventVenue,
      eventRequirement,
    } = req.body;
    return {
      title,
      eventName,
      customerName,
      customerEmail,
      contactNumber,
      customerAddress,
      eventDate,
      numberOfGuests,
      eventVenue,
      eventRequirement,
    };
  } else if (table === "executives") {
    const {
      accountHolderName,
      accountNumber,
      bankName,
      branchName,
      executiveAddress,
      executiveCity,
      executiveEmail,
      executivePhone,
      executiveState,
      firstName,
      ifscCode,
      lastName,
      profilePicture,
    } = req.body;
    return {
      accountHolderName,
      accountNumber,
      bankName,
      branchName,
      executiveAddress,
      executiveCity,
      executiveEmail,
      executivePhone,
      executiveState,
      firstName,
      ifscCode,
      lastName,
      profilePicture,
    };
  } else if (table === "vendors") {
    const {
      vendorCategory,
      vendorCompanyName,
      vendorContactPerson,
      vendorEmail,
      vendorPhone,
      vendorAddress,
      vendorCity,
      vendorState,
      gstNumber,
      panNumber,
      profilePicture,
    } = req.body;
    return {
      vendorCategory,
      vendorCompanyName,
      vendorContactPerson,
      vendorEmail,
      vendorPhone,
      vendorAddress,
      vendorCity,
      vendorState,
      gstNumber,
      panNumber,
      profilePicture,
    };
  } else if (table === "managers") {
    const {
      firstName,
      lastName,
      managerEmail,
      managerPhone,
      managerAddress,
      managerCity,
      managerState,
      accountHolderName,
      accountNumber,
      ifscCode,
      bankName,
      branchName,
      profilePicture,
    } = req.body;
    return {
      firstName,
      lastName,
      managerEmail,
      managerPhone,
      managerAddress,
      managerCity,
      managerState,
      accountHolderName,
      accountNumber,
      ifscCode,
      bankName,
      branchName,
      profilePicture,
    };
  } else {
    return null;
  }
};

module.exports = { FindTable, FilterBodyByTable };
