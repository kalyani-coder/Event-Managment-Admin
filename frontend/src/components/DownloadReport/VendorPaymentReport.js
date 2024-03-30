import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Sidebar from "../Sidebar/Sidebar"

const VendorPaymentReport = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('');

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const fetchPaymentData = async () => {
    try {
      const response = await fetch('//localhost:5000/api/vendorpayment');
      const paymentData = await response.json();
      setPayments(paymentData);
      setFilteredPayments(paymentData); // Initially, display all payments
    } catch (error) {
      console.error('Error fetching payment data:', error);
    }
  };

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    filterPayments(e.target.value, selectedVendor);
  };

  // Function to handle vendor selection change
  const handleVendorSelectChange = (e) => {
    setSelectedVendor(e.target.value);
    filterPayments(searchQuery, e.target.value);
  };

  // Function to filter payments based on search query and selected vendor
  const filterPayments = (query, vendor) => {
    const filtered = payments.filter((payment) => {
      return (
        payment.fname.toLowerCase().includes(query.toLowerCase()) &&
        (vendor === '' || payment.vendor === vendor)
      );
    });
    setFilteredPayments(filtered);
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
      <div className="mb-3">
        <input
          type="text"
          className="form-control mr-2"
          placeholder="Search First Name, Last Name, Event Name, Date, Description"
          value={searchQuery}
          onChange={handleSearchInputChange}
          style={{"width":"35%", float:"left"}}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="button" onClick={filterPayments}>Search</button>
        </div>
      </div>
      <p>Total number of payments: {filteredPayments.length}</p>
      <button className="btn btn-primary mb-3" onClick={exportToExcel}>Export to Excel</button>
      <table className="table table-hover table-sm border border-secondary">
        <thead className="thead-light">
          <tr>
            <th scope="col">Sr. No.</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Event Name</th>
            <th scope="col">Paid Amount</th>
            <th scope="col">Remaining Amount</th>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
           
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{payment.fname}</td>
              <td>{payment.lname}</td>
              <td>{payment.event_name}</td>
              <td>{payment.paid_amt}</td>
              <td>{payment.rem_amt}</td>
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
