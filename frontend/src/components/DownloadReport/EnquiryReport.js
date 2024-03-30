import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Sidebar from "../Sidebar/Sidebar";
import { FaSortAmountDown, FaSortAmountUp, FaFilter, FaSearch } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EnquiryReport = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedVenue, setSelectedVenue] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

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
      setFilteredEnquiries(enquiryData);
    } catch (error) {
      console.error("Error fetching enquiry data:", error);
    }
  };

  const handleSearchButtonClick = () => {
    filterEnquiries();
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    sortEnquiries(newSortOrder);
  };

  const filterEnquiries = () => {
    let filtered = enquiries.filter((enquiry) => {
      return (!selectedVenue || enquiry.event_venue === selectedVenue) &&
             (!selectedDate || new Date(enquiry.event_date).toDateString() === selectedDate.toDateString());
    });
    if (searchQuery) {
      filtered = filtered.filter(enquiry =>
        enquiry.event_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enquiry.event_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enquiry.event_requirement.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enquiry.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredEnquiries(filtered);
  };

  const sortEnquiries = (order) => {
    const sorted = [...filteredEnquiries].sort((a, b) => {
      if (order === "asc") {
        return new Date(a.event_date) - new Date(b.event_date);
      } else {
        return new Date(b.event_date) - new Date(a.event_date);
      }
    });
    setFilteredEnquiries(sorted);
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredEnquiries);

    const wscols = [
      { wch: 20 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 20 },
      { wch: 10 },
      { wch: 15 },
    ];
    ws["!cols"] = wscols;

    XLSX.utils.book_append_sheet(wb, ws, "Enquiries");
    XLSX.writeFile(wb, "enquiry_report.xlsx");
  };

  const handleVenueFilterChange = (venue) => {
    setSelectedVenue(venue);
    filterEnquiries();
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const venueOptions = [...new Set(enquiries.map((enquiry) => enquiry.event_venue))];
  
  return (
    <>
      <Sidebar />
      <div className="container mt-5">
        <h2>Enquiry Report</h2>
        <div className="mb-3 mt-3">
          <input
            type="text"
            className="form-control mr-2"
            placeholder="Search by Event Name, Event Date, Event Requirement, Customer Name"
            value={searchQuery}
            onChange={handleSearchInputChange}
            style={{ width: "50%", float: "left" }}
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary mr-2"
              type="button"
              onClick={handleSearchButtonClick}
            >
              <FaSearch /> Search
            </button>
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle mr-2"
                type="button"
                id="venueFilterDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={filterEnquiries}
              >
                <FaFilter /> Venue
              </button>
              <div className="dropdown-menu" aria-labelledby="venueFilterDropdown">
                {venueOptions.map((option, index) => (
                  <button
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleVenueFilterChange(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <DatePicker 
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd-MM-yyyy"
                placeholderText="Select Date"
                className="form-control mr-2"
              />
            </div>
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
              <th scope="col" onClick={toggleSortOrder}>
                Event Date{" "}
                {sortOrder === "asc" ? (
                  <FaSortAmountDown />
                ) : (
                  <FaSortAmountUp />
                )}
              </th>
              <th scope="col">Guest Quantity</th>
              <th scope="col">Event Venue</th>
              <th scope="col">Event Requirement</th>
              <th scope="col">Customer Name</th>
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
