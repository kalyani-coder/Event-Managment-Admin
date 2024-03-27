import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Sidebar from "../Sidebar/Sidebar"


const VendorPaymentReport = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const fetchPaymentData = async () => {
    try {
      const response = await fetch('https://eventmanagement-admin-hocm.onrender.com/api/vendorpayment');
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
    filterPayments(e.target.value);
  };

  // Function to filter payments based on search query
  const filterPayments = (query) => {
    const filtered = payments.filter((payment) => {
      return (
        payment.fname.toLowerCase().includes(query.toLowerCase()) ||
        payment.lname.toLowerCase().includes(query.toLowerCase()) ||
        payment.event_name.toLowerCase().includes(query.toLowerCase()) ||
        payment.date.toLowerCase().includes(query.toLowerCase()) ||
        payment.description.toLowerCase().includes(query.toLowerCase())
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
        'Salary': payment.salary
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
            <th scope="col">Salary</th>
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
              <td>{payment.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default VendorPaymentReport;
