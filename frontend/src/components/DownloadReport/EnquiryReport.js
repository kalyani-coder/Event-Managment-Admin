import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Sidebar from "../Sidebar/Sidebar"


const EnquiryReport = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchEnquiryData();
  }, []);

  const fetchEnquiryData = async () => {
    try {
      const response = await fetch(
        "https://eventmanagement-admin-hocm.onrender.com/api/enquiry"
      );
      const enquiryData = await response.json();
      setEnquiries(enquiryData);
      setFilteredEnquiries(enquiryData); // Initially, display all enquiries
    } catch (error) {
      console.error("Error fetching enquiry data:", error);
    }
  };

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    filterEnquiries(value);
  };

  // Function to filter enquiries based on search query
  const filterEnquiries = (query) => {
    const filtered = enquiries.filter((enquiry) => {
      return (
        enquiry.event_name.toLowerCase().includes(query.toLowerCase()) ||
        enquiry.event_date.includes(query) ||
        enquiry.customer_name.toLowerCase().includes(query.toLowerCase())  ||
        enquiry.event_requirement.toLowerCase().includes(query.toLowerCase() )
      );
    });
    setFilteredEnquiries(filtered);
  };

  const exportToExcel = () => {
    // Create a new array with only the required fields
    const filteredData = filteredEnquiries.map((enquiry) => {
      return {
        EventName: enquiry.event_name,
        EventDate: enquiry.event_date,
        Guest_Quantity: enquiry.guest_quantity,
        Event_Venue: enquiry.event_venue,
        Event_Requirement: enquiry.event_requirement,
        CustomerName: enquiry.customer_name,
        Email: enquiry.email,
        Contact: enquiry.contact,
        Address: enquiry.address
      };
    });

    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredData);

    // Set column widths
    const wscols = [
      { wch: 20 }, // event_name
      { wch: 15 }, // event_date
      { wch: 15 }, // event_date
      { wch: 15 }, // event_date
      { wch: 15 }, // customer_name
      { wch: 20 }, // email
      { wch: 10 }, // contact
      { wch: 15 }  // address
    ];
    ws["!cols"] = wscols;

    // Append the worksheet to the workbook and save
    XLSX.utils.book_append_sheet(wb, ws, "Enquiries");
    XLSX.writeFile(wb, "enquiry_report.xlsx");
  };

  return (
    <>
    <Sidebar />
    <div className="container mt-5">
      <h2>Enqiry Report</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control mr-2" // Added margin to the right
          placeholder="Search by Event Name, Event Date, Event Requirement Customer Name"
          value={searchQuery}
          onChange={handleSearchInputChange}
          style={{ width: "50%", float: "left" }}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => filterEnquiries(searchQuery)}
          >
            Search
          </button>
        </div>
      </div>
      <p>Total number of enquiries: {filteredEnquiries.length}</p>
      <button className="btn btn-primary mb-3" onClick={exportToExcel}>
        Export to Excel
      </button>
      <table className="table table-hover table-sm border border-secondary">
        <thead className="thead-light">
          <tr>
            <th scope="col">Sr. No.</th>
            <th scope="col">Event Name</th>
            <th scope="col">Event Date</th>
            <th scope="col">Guest Quntity</th>
            <th scope="col">Event Venue</th>
            <th scope="col">Event Requirement</th>
            <th scope="col">Customer Name</th>
            {/* <th scope="col">Email</th> */}
            <th scope="col">Contact</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        <tbody>
          {filteredEnquiries.map((enquiry, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{enquiry.event_name}</td>
              <td>{enquiry.event_date}</td>
              <td>{enquiry.guest_quantity}</td>
              <td>{enquiry.event_venue}</td>
              <td>{enquiry.event_requirement}</td>
              <td>{enquiry.customer_name}</td>
              {/* <td>{enquiry.email}</td> */}
              <td>{enquiry.contact}</td>
              <td>{enquiry.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default EnquiryReport;
