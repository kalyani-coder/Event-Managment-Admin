const {
  Enquiry,
  Quotation,
  AdvPayment,
  Event,
  Order,
  EventExpense,
  Manager,
  Executive,
  Vendor,
  ManagerDetails,
  ExecutiveDetails,
  StaffSalary,
  StaffSalaryDetails,
  VendorPayment,
  VendorPaymentHistory,
  InventoryStock,
  Accountant,
  ExecutiveTask,
  ManagerLogin,
  AddVendor,

} = require("../models/newModels");

// const Accountants = require("../models/accountant");
// const Enquiries = require("../models/enquiry");

// const Executives = require("../models/executive");

// const Vendors = require("../models/vendor");

// const Managers = require("../models/manager");
// const Events = require("../models/event");

const FindTable = ({ table }) => {
  if (table.toLowerCase() === "enquiry") {
    return Enquiry;
  } else if (table.toLowerCase() === "quotation") {
    return Quotation;
  } else if (table.toLowerCase() === "advpayment") {
    return AdvPayment;
  } else if (table.toLowerCase() === "event") {
    return Event;
  } else if (table.toLowerCase() === "order") {
    return Order;
  } else if (table.toLowerCase() === "eventexpense") {
    return EventExpense;
  } else if (table.toLowerCase() === "manager") {
    return Manager;
  } else if (table.toLowerCase() === "executive") {
    return Executive;
  } else if (table.toLowerCase() === "vendor") {
    return Vendor;
  } else if (table.toLowerCase() === "managerdetails") {
    return ManagerDetails;
  } else if (table.toLowerCase() === "executivedetails") {
    return ExecutiveDetails;
  } else if (table.toLowerCase() === "staffsalary") {
    return StaffSalary;
  } else if (table.toLowerCase() === "staffsalarydetails") {
    return StaffSalaryDetails;
  } else if (table.toLowerCase() === "vendorpayment") {
    return VendorPayment;
  } else if (table.toLowerCase() === "vendorpaymenthistory") {
    return VendorPaymentHistory;
  } else if (table.toLowerCase() == "inventorystock") {
    return InventoryStock;
  } else if (table.toLowerCase() == "accountant") {
    return Accountant;
  } else if (table.toLowerCase() == "executivetask") {
    return ExecutiveTask;
  } else if (table.toLowerCase() == "managerlogin") {
    return ManagerLogin;
  } else if (table.toLowerCase() == "addvendor") {
  } else {
    return null;
  }
};

const FilterBodyByTable = ({ req, table }) => {
  try {
    if (table == "enquiry") {
      const {
        enquiry_id,
        event_name,
        event_date,
        guest_quantity,
        event_venue,
        event_requirement,
        customer_name,
        email,
        contact,
        address,
        status,
        hot_input_value,
        assign_manager_name,
        assign_manager_Id,
      } = req.body;
      return {
        enquiry_id,
        event_name,
        event_date,
        guest_quantity,
        event_venue,
        event_requirement,
        customer_name,
        email,
        contact,
        address,
        status,
        hot_input_value,
        assign_manager_Id,
        assign_manager_name,
      };
    } else if (table === "executivetask") {
      const { Task, exe_id, Date, Time, Status, EventId } = req.body;
      return {
        Task,
        exe_id,
        Date,
        Time,
        Status,
        EventId,
      };
    } else if (table == "quotation") {
      const {
        quotation_id,
        enquiry_id,
        customer_name,
        email,
        contact,
        address,
        event_type,
        amount,
        tax,
        charges,
        total_amount,
      } = req.body;
      return {
        quotation_id,
        enquiry_id,
        customer_name,
        email,
        contact,
        address,
        event_type,
        amount,
        tax,
        charges,
        total_amount,
      };
    } else if (table == "advpayment") {
      const {
        id,
        clientId,
        managerId,
        client_name,
        contact,
        event_name,
        event_date,
        venue,
        guest_number,
        event_Requirement,
        amount,
        adv_payment,
        rem_payment,
        payment_method,
        cheque_number,
        cash_whome_to_submit,
        transaction_id,
        payment_date,
        payment_time,
        Bank_Name,
        bank_Account_Number,


      } = req.body;
      return {
        id,
        clientId,
        managerId,
        client_name,
        contact,
        event_name,
        event_date,
        venue,
        guest_number,
        event_Requirement,
        amount,
        adv_payment,
        rem_payment,
        payment_method,
        cheque_number,
        cash_whome_to_submit,
        transaction_id,
        payment_date,
        payment_time,
        Bank_Name,
        bank_Account_Number,


      };
    } else if (table == "event") {
      const {
        eventName,
        event_id,
        quotation_id,
        fname,
        company_name,
        email,
        contact,
        event_type,
        event_date,
        venue,
        subvenue,
        guest_number,
        budget,
        address,
        status,
        managerId,
        managerName,
      } = req.body;
      return {
        eventName,
        event_id,
        quotation_id,
        fname,
        company_name,
        email,
        contact,
        event_type,
        event_date,
        venue,
        subvenue,
        guest_number,
        budget,
        address,
        status,
        managerId,
        managerName,
      };
    } else if (table == "order") {
      const {
        order_id,
        event_id,
        event_name,
        customer_name,
        contact,
        email,
        date,
        venue,
        status,
        assign_manager_name,
        assign_manager_Id,
        event_Type,
        guest_Number,

      } = req.body;
      return {
        order_id,
        event_id,
        event_name,
        customer_name,
        contact,
        email,
        date,
        venue,
        status,
        assign_manager_name,
        assign_manager_Id,
        event_Type,
        guest_Number,

      };
    } else if (table == "eventexpense") {
      const {
        expense_id,
        event_id,
        new_purchase,
        to_vendor,
        event_name,
        amount,
        date,
        payment_details,
      } = req.body;
      return {
        expense_id,
        event_id,
        new_purchase,
        to_vendor,
        event_name,
        amount,
        date,
        payment_details,
      };
    } else if (table == "manager") {
      const {
        manager_id,
        fname,
        lname,
        email,
        contact,
        // profile_image,
        pan_no,
        state,
        city,
        address,
        blood_group,
      } = req.body;
      return {
        manager_id,
        fname,
        lname,
        email,
        contact,
        // profile_image,
        pan_no,
        state,
        city,
        address,
        blood_group,
      };
    } else if (table == "executive") {
      const {
        executive_id,
        fname,
        lname,
        email,
        contact,
        profile_image,
        pan_no,
        city,
        state,
        address,
        blood_group,
        holder_name,
        account_number,
        IFSC_code,
        bank_name,
        branch_name,
      } = req.body;
      return {
        executive_id,
        fname,
        lname,
        email,
        contact,
        profile_image,
        pan_no,
        city,
        state,
        address,
        blood_group,
        holder_name,
        account_number,
        IFSC_code,
        bank_name,
        branch_name,
      };
    } else if (table == "vendor") {
      const {
        vendor_id,
        company_name,
        contact_person_name,
        gmail,
        contact,
        profile_image,
        gst_no,
        pan_no,
        address,
      } = req.body;
      return {
        vendor_id,
        company_name,
        contact_person_name,
        gmail,
        contact,
        profile_image,
        gst_no,
        pan_no,
        address,
      };
    } else if (table == "managerdetails") {
      const {
        manager_id,
        fname,
        lname,
        email,
        contact,
        profile_image,
        address,
        city,
        state,
        holder_name,
        account_number,
        IFSC_code,
        bank_name,
        branch_name,
      } = req.body;
      return {
        manager_id,
        fname,
        lname,
        email,
        contact,
        profile_image,
        address,
        city,
        state,
        holder_name,
        account_number,
        IFSC_code,
        bank_name,
        branch_name,
      };
    } else if (table == "executivedetails") {
      const {
        executive_id,
        fname,
        lname,
        email,
        contact,
        profile_image,
        address,
        city,
        state,
        holder_name,
        account_number,
        IFSC_code,
        bank_name,
        branch_name,
      } = req.body;
      return {
        executive_id,
        fname,
        lname,
        email,
        contact,
        profile_image,
        address,
        city,
        state,
        holder_name,
        account_number,
        IFSC_code,
        bank_name,
        branch_name,
      };
    } else if (table == "staffsalary") {
      const {
        staff_id,
        fname,
        lname,
        salary,
        date,
        time,
        month,
        adv_payment,
        rem_payment,
        incentive,
        deduct_amount,
        adv_taken,
        balance_amount,
        type_Of_Salary,
        salary_person_name,
        salary_person_id,
      } = req.body;
      return {
        staff_id,
        fname,
        lname,
        salary,
        date,
        time,
        month,
        adv_payment,
        rem_payment,
        incentive,
        deduct_amount,
        adv_taken,
        balance_amount,
        type_Of_Salary,
        salary_person_name,
        salary_person_id,
      };
    } else if (table == "staffsalarydetails") {
      const { staff_id, name, salary, date, month } = req.body;
      return { staff_id, name, salary, date, month };
    } else if (table == "vendorpayment") {
      const {
        vendor_id,
        id,
        event_id,
        fname,
        lname,
        event_name,
        vendor_name,
        paid_amt,
        rem_amt,
        date,
        salary,
        description,
        advance_payment,
        time,
        bankAccount_Name,
      } = req.body;
      return {
        vendor_id,
        id,
        event_id,
        fname,
        lname,
        event_name,
        vendor_name,
        paid_amt,
        rem_amt,
        date,
        salary,
        description,
        advance_payment,
        time,
        bankAccount_Name,
      };
    } else if (table == "vendorpaymenthistory") {
      const {
        vendor_id,
        name,
        amt_paid,
        rem_amt,
        event_name,
        date,
        total_amount,
      } = req.body;
      return {
        vendor_id,
        name,
        amt_paid,
        rem_amt,
        event_name,
        date,
        total_amount,
      };
    } else if (table == "inventorystock") {
      const { addstocks, quantity } = req.body;
      return {
        addstocks,
        quantity,
      };
    } else if (table == "accountant") {
      const {
        accountant_id,
        fname,
        lname,
        email,
        contact,
        profile_image,
        address,
        city,
        state,
        holder_name,
        account_number,
        IFSC_code,
        bank_name,
        branch_name,
      } = req.body;
      return {
        accountant_id,
        fname,
        lname,
        email,
        contact,
        profile_image,
        address,
        city,
        state,
        holder_name,
        account_number,
        IFSC_code,
        bank_name,
        branch_name,
      };
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

module.exports = { FindTable, FilterBodyByTable };
