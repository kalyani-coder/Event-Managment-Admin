import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Header from "../Sidebar/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link} from 'react-router-dom';

const VendorPaymentReport = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("");
  const [vendors, setVendors] = useState([]);
  const [paidAmountFilter, setPaidAmountFilter] = useState("");
  const [remainingAmountFilter, setRemainingAmountFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [selectedEvent, setSelectedEvent] = useState("");

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const fetchPaymentData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/vendorpayment"
      );
      const paymentData = await response.json();
      setPayments(paymentData);
      setFilteredPayments(paymentData); // Initially, display all payments

      // Extract vendors from payment data
      const uniqueVendors = [
        ...new Set(paymentData.map((payment) => payment.vendor)),
      ];
      setVendors(uniqueVendors);
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    filterPayments(
      e.target.value,
      selectedVendor,
      paidAmountFilter,
      remainingAmountFilter,
      nameFilter,
      selectedDate,
      selectedEvent
    );
  };

  // Function to handle vendor selection change
  const handleVendorSelectChange = (e) => {
    setSelectedVendor(e.target.value);
    filterPayments(
      searchQuery,
      e.target.value,
      paidAmountFilter,
      remainingAmountFilter,
      nameFilter,
      selectedDate,
      selectedEvent
    );
  };

  // Function to handle paid amount filter change
  const handlePaidAmountFilterChange = (e) => {
    setPaidAmountFilter(e.target.value);
    filterPayments(
      searchQuery,
      selectedVendor,
      e.target.value,
      remainingAmountFilter,
      nameFilter,
      selectedDate,
      selectedEvent
    );
  };

  // Function to handle remaining amount filter change
  const handleRemainingAmountFilterChange = (e) => {
    setRemainingAmountFilter(e.target.value);
    filterPayments(
      searchQuery,
      selectedVendor,
      paidAmountFilter,
      e.target.value,
      nameFilter,
      selectedDate,
      selectedEvent
    );
  };

  // Function to handle name filter change
  const handleNameFilterChange = (value) => {
    setNameFilter(value);
    filterPayments(
      searchQuery,
      selectedVendor,
      paidAmountFilter,
      remainingAmountFilter,
      value,
      selectedDate,
      selectedEvent
    );
  };

  // Function to handle date filter change
  const handleDateChange = (date) => {
    setSelectedDate(date);
    filterPayments(
      searchQuery,
      selectedVendor,
      paidAmountFilter,
      remainingAmountFilter,
      nameFilter,
      date,
      selectedEvent
    );
  };

  // Function to handle date range filter
  const handleDateRangeFilter = () => {
    const filtered = payments.filter((payment) => {
      const paymentDate = new Date(payment.date);
      const startDate = dateRange.startDate
        ? new Date(dateRange.startDate)
        : null;
      const endDate = dateRange.endDate ? new Date(dateRange.endDate) : null;

      return (
        (!startDate || paymentDate >= startDate) &&
        (!endDate || paymentDate <= endDate)
      );
    });

    setFilteredPayments(filtered);
  };

  // Function to handle event filter
  const handleEventFilter = (eventName) => {
    setSelectedEvent(eventName);
    filterPayments(
      searchQuery,
      selectedVendor,
      paidAmountFilter,
      remainingAmountFilter,
      nameFilter,
      selectedDate,
      eventName
    );
  };

  // Function to clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedVendor("");
    setPaidAmountFilter("");
    setRemainingAmountFilter("");
    setNameFilter("");
    setSelectedDate(null);
    setFilteredPayments(payments); // Reset to show all payments
    setDateRange({ startDate: "", endDate: "" });
    setSelectedEvent("");
  };

  // Function to filter payments based on search query, selected vendor, paid amount filter, remaining amount filter, name filter, date, and event
  const filterPayments = (
    query,
    vendor,
    paidAmtFilter,
    remAmtFilter,
    name,
    date,
    eventName
  ) => {
    const filtered = payments.filter((payment) => {
      return (
        payment.fname && // Check if payment.fname is defined
        payment.fname.toLowerCase().includes(query.toLowerCase()) &&
        (vendor === "" || payment.vendor === vendor) &&
        (paidAmtFilter === "" ||
          parseFloat(payment.paid_amt) >= parseFloat(paidAmtFilter)) &&
        (remAmtFilter === "" ||
          parseFloat(payment.rem_amt) <= parseFloat(remAmtFilter)) &&
        (name === "" || payment.fname.toLowerCase() === name.toLowerCase()) &&
        (!date ||
          new Date(payment.date).toDateString() === date.toDateString()) &&
        (eventName === "" || payment.event_name === eventName)
      );
    });
    setFilteredPayments(filtered);
  };

  // Function to export data to Excel
  const exportToExcel = () => {
    const filteredData = filteredPayments.map((payment) => {
      return {
        "First Name": payment.fname,
        "Last Name": payment.lname,
        "Event Name": payment.event_name,
        "Paid Amount": payment.paid_amt,
        "Remaining Amount": payment.rem_amt,
        Date: payment.date,
        Description: payment.description,
      };
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredData);

    // Set column widths
    const wscols = [
      { wch: 15 }, // eventName
      { wch: 15 }, // fname
      { wch: 15 }, // company_name
      { wch: 15 }, // email
      { wch: 12 }, // contact
      { wch: 15 }, // event_type
      { wch: 15 }, // venue
      { wch: 12 }, // subvenue
      { wch: 12 }, // guest_number
      { wch: 15 }, // budget
      { wch: 15 }, // event_date
    ];
    ws["!cols"] = wscols;

    XLSX.utils.book_append_sheet(wb, ws, "Payments");
    XLSX.writeFile(wb, "payment_report.xlsx");
  };

  return (
    <>
      <Header />
      <div
        className="w-full h-screen
        flex items-center justify-center main-container-for-Addaccount overflow-y-auto "
      >
        <div className="md:h-[80vh] h-[80vh] md:mt-0 w-[80%]  ">
        <Link to={'/eventreport'}>
              <button className="btn btn-primary mr-4 mb-4">Event Report</button>
            </Link>
            <Link to={'/enquiryreport'}>
              <button className="btn btn-primary mr-4 mb-4">Enquiry Report</button>
            </Link>
            <Link to={'/customerreport'}>
              <button className="btn btn-primary mr-4 mb-4">Customer Report</button>
            </Link>
            <Link to={'/managerreport'}>
              <button className="btn btn-primary mr-4 mb-4">Manager Report</button>
            </Link>
            <Link to={'/paymentreport'}>
              <button className="btn btn-primary mr-4 mb-4">Payment Report</button>
            </Link>
            <Link to={'/vendorpaymentreport'}>
              <button className="btn btn-primary mr-4 mb-4">Vendor Report</button>
            </Link>
            <Link to={'/bankwisereport'}>
            <button className="btn btn-primary mr-4 mb-4">Bankwise Report</button>
          </Link>
          <h2 className="text-[30px] ">Vendor Payment Report</h2>
          <div className=" flex items-center justify-between w-full  p-2 flex-wrap gap-2">
            {" "}
            <div className="d-flex flex-grow-1 mr-2">
              <div className="dropdown">
                <button
                  className="btn btn-primary dropdown-toggle"
                  type="button"
                  id="vendorDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Filter By Vendor
                </button>
                <div className="dropdown-menu" aria-labelledby="vendorDropdown">
                  <button
                    className="dropdown-item"
                    onClick={() => handleNameFilterChange("")}
                  >
                    All Vendors
                  </button>
                  {payments.map((payment, index) => (
                    <button
                      key={index}
                      className="dropdown-item"
                      onClick={() => handleNameFilterChange(payment.fname)}
                    >
                      {payment.fname}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="d-flex flex-grow-1 mr-2">
              <div className="dropdown ml-2">
                <button
                  className="btn btn-primary dropdown-toggle"
                  type="button"
                  id="eventDropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Filter By Event
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="eventDropdownMenuButton"
                >
                  {payments.map((payment, index) => (
                    <button
                      key={index}
                      className="dropdown-item"
                      onClick={() => handleEventFilter(payment.event_name)}
                    >
                      {payment.event_name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid md:flex items-center">
              <label className="mr-1">Start Date:</label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) =>
                  setDateRange({ ...dateRange, startDate: e.target.value })
                }
                style={{
                  padding: "10px",
                  marginRight: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                }}
              />
            </div>
            <div className="grid md:flex items-center">
              <label style={{ marginRight: "10px" }}>End Date:</label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) =>
                  setDateRange({ ...dateRange, endDate: e.target.value })
                }
                style={{
                  padding: "10px",
                  marginRight: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                  // Set a fixed width to ensure consistency with the dropdown button
                }}
              />
            </div>
            <div className=" grid md:flex mt-1 gap-1">
              <button
                onClick={handleDateRangeFilter}
                className="btn btn-success"
              >
                Apply
              </button>
              <button className="btn btn-danger " onClick={clearFilters}>
                Clear
              </button>
            </div>
          </div>
          <div>
            <p>Total number of payments: {filteredPayments.length}</p>
            <button className="btn btn-primary mb-3" onClick={exportToExcel}>
              Export to Excel
            </button>
          </div>
          <div className="overflow-y-auto h-[50vh]  md:mt-0 w-full">
            <table className="table table-bordered bg-white">
              <thead className="sticky top-0 bg-white">
                <tr>
                  <th scope="col">Sr. No.</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Event Name</th>
                  <th scope="col">Remaining Amount</th>
                  <th scope="col">Total Amount</th>
                  <th scope="col">Date</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{payment.fname}</td>
                    <td>{payment.event_name}</td>
                    <td>{payment.rem_amt}</td>
                    <td>{payment.paid_amt}</td>
                    <td>{payment.date}</td>
                    <td>{payment.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorPaymentReport;
