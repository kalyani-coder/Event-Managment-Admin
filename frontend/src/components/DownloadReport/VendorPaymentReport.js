import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Sidebar from "../Sidebar/Sidebar";
import DatePicker from 'react-datepicker';

const VendorPaymentReport = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('');
  const [vendors, setVendors] = useState([]);
  const [paidAmountFilter, setPaidAmountFilter] = useState('');
  const [remainingAmountFilter, setRemainingAmountFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const fetchPaymentData = async () => {
    try {
      const response = await fetch('//localhost:5000/api/vendorpayment');
      const paymentData = await response.json();
      setPayments(paymentData);
      setFilteredPayments(paymentData); // Initially, display all payments

      // Extract vendors from payment data
      const uniqueVendors = [...new Set(paymentData.map(payment => payment.vendor))];
      setVendors(uniqueVendors);
    } catch (error) {
      console.error('Error fetching payment data:', error);
    }
  };

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    filterPayments(e.target.value, selectedVendor, paidAmountFilter, remainingAmountFilter, nameFilter);
  };

  // Function to handle vendor selection change
  const handleVendorSelectChange = (e) => {
    setSelectedVendor(e.target.value);
    filterPayments(searchQuery, e.target.value, paidAmountFilter, remainingAmountFilter, nameFilter);
  };

  // Function to handle paid amount filter change
  const handlePaidAmountFilterChange = (e) => {
    setPaidAmountFilter(e.target.value);
    filterPayments(searchQuery, selectedVendor, e.target.value, remainingAmountFilter, nameFilter);
  };

  // Function to handle remaining amount filter change
  const handleRemainingAmountFilterChange = (e) => {
    setRemainingAmountFilter(e.target.value);
    filterPayments(searchQuery, selectedVendor, paidAmountFilter, e.target.value, nameFilter);
  };

  // Function to handle name filter change
  const handleNameFilterChange = (e) => {
    setNameFilter(e.target.value);
    filterPayments(searchQuery, selectedVendor, paidAmountFilter, remainingAmountFilter, e.target.value);
  };

// Function to handle date filter change
const handleDateChange = (date) => {
  setSelectedDate(date);
  filterPayments(searchQuery, selectedVendor, paidAmountFilter, remainingAmountFilter, nameFilter, date);
};

// Function to filter payments based on search query, selected vendor, paid amount filter, remaining amount filter, name filter, and date
const filterPayments = (query, vendor, paidAmtFilter, remAmtFilter, name, date) => {
  const filtered = payments.filter((payment) => {
    return (
      payment.fname && // Check if payment.fname is defined
      payment.fname.toLowerCase().includes(query.toLowerCase()) &&
      (vendor === '' || payment.vendor === vendor) &&
      (paidAmtFilter === '' || parseFloat(payment.paid_amt) >= parseFloat(paidAmtFilter)) &&
      (remAmtFilter === '' || parseFloat(payment.rem_amt) <= parseFloat(remAmtFilter)) &&
      (name === '' || payment.fname.toLowerCase() === name.toLowerCase()) &&
      (!date || new Date(payment.date).toDateString() === date.toDateString())
    );
  });
  setFilteredPayments(filtered);
};
const clearFilters = () => {
  setSearchQuery('');
  setSelectedVendor('');
  setPaidAmountFilter('');
  setRemainingAmountFilter('');
  setNameFilter('');
  setSelectedDate(null);
  setFilteredPayments(payments); // Reset to show all payments
};

  const exportToExcel = () => {
    const filteredData = filteredPayments.map(payment => {
      return {
        'First Name': payment.fname,
        'Last Name': payment.lname,
        'Event Name': payment.event_name,
        'Paid Amount': payment.paid_amt,
        'Remaining Amount': payment.rem_amt,
        'Date': payment.date,
        'Description': payment.description,
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
      { wch: 15 }  // event_date
    ];
    ws['!cols'] = wscols;

    XLSX.utils.book_append_sheet(wb, ws, 'Payments');
    XLSX.writeFile(wb, 'payment_report.xlsx');
  };

  return (
    <>
      <Sidebar />
      <div className="container mt-5">
        <h2>Vendor Payment Report</h2>
        <div className="d-flex justify-content-between mb-3">
          {/* <input
            type="text"
            className="form-control mr-2 mb-3"
            placeholder="Search  Event Name, Date, Description"
            value={searchQuery}
            onChange={handleSearchInputChange}
            style={{ width: "70%", float: "left" }}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button" onClick={filterPayments}>Search</button>
          </div> */}
          <select className="form-control mr-2 mb-2" value={nameFilter} onChange={handleNameFilterChange}
          style={{ width: "30%" }}>
            <option value="">Filter By All Vendors</option>
            {payments.map((payment, index) => (
              <option key={index} value={payment.fname}>{payment.fname}</option>
            ))}
          </select>
          <button className="btn btn-primary mb-3" onClick={clearFilters}>Clear Filters</button>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            placeholderText="Select Date"
            className="form-control mb-3"
          />
        </div>
        <p>Total number of payments: {filteredPayments.length}</p>
        <button className="btn btn-primary mb-3" onClick={exportToExcel}>Export to Excel</button>
        <table className="table table-hover table-sm border border-dark table-responsive-md" style={{backgroundColor: 'white'}}>
          <thead className="thead-light">
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
    </>
  );
};

export default VendorPaymentReport;
